import React, { useState, useEffect } from "react";
import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import "./TreeCard.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./actions/app.actions";

function TreeCard(props) {
    const items = [...props.applicationState.appReducer.shoppingCart];

    const [quantityOfTrees, setQuantityOfTrees] = useState(0);

    useEffect(() => {
        items.map((item) => {
            if (item.tree_id == props.tree_id) {
                setQuantityOfTrees(item.quantity);
            }
        });
    }, [props.applicationState.appReducer.shoppingCart]);

    const plusItem = () => {
        /* props.actions.storeShoppingCart([])
        console.log(props.applicationState.appReducer.shoppingCart) */

        let counter = true;

        items.map((item) => {
            if (item.tree_id === props.tree_id) {
                counter = false;
                item.quantity += 1;
                items[0].totalItemsInShoppingCart += 1;
                props.actions.storeShoppingCart(items);
                console.log(props.applicationState.appReducer.shoppingCart);
            }
        });

        if (counter) {
            items[0].totalItemsInShoppingCart += 1;
            items.push({
                tree_id: props.tree_id,
                tree_name: props.treeName,
                tree_price: props.price,
                quantity: 1,
            });
            props.actions.storeShoppingCart(items);
            console.log(props.applicationState.appReducer.shoppingCart);
        }
    };

    const minusItem = () => {
        let counter = true;

        items.map((item) => {
            if (item.tree_id === props.tree_id && item.quantity >= 1) {
                counter = false;
                item.quantity -= 1;
                items[0].totalItemsInShoppingCart -= 1;
                props.actions.storeShoppingCart(items);
                console.log(props.applicationState.appReducer.shoppingCart);
            }
        });
    };

    return (
        <Card key={props.treeName}>
            <div
                style={{
                    overflow: "hidden",
                    maxHeight: "175px",
                }}
            >
                <Card.Img
                    variant={props.treeName}
                    src={props.imageLink}
                    style={{ width: "100%" }}
                />
            </div>
            <Card.Body>
                <Card.Title
                    style={{ fontSize: "100%", margin: "0", padding: "0" }}
                >
                    <b>{props.treeName}</b>
                </Card.Title>
                <Card.Text>Description...</Card.Text>
            </Card.Body>
            <ListGroup>
                <ListGroupItem>
                    Species: <i>{props.treeSpecies}</i>
                </ListGroupItem>
                <ListGroupItem>Country: {props.country}</ListGroupItem>
                <ListGroupItem>
                    CO2 Emissions: {props.co2Emissions} kg/year
                </ListGroupItem>
                <ListGroupItem>Price: {props.price} €</ListGroupItem>
            </ListGroup>

            <div style={{ margin: "15px", textAlign: "center" }}>
                <span
                    style={{
                        padding: "16px",
                        fontSize: "24px",
                        cursor: "pointer",
                    }}
                    onClick={minusItem}
                >
                    <strong>-</strong>
                </span>
                {quantityOfTrees}
                <span
                    onClick={plusItem}
                    style={{
                        padding: "16px",
                        fontSize: "20px",
                        cursor: "pointer",
                    }}
                >
                    <strong>+</strong>
                </span>
            </div>
        </Card>
    );
}

const mapStateToProps = (state) => ({ applicationState: state });
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(TreeCard);
