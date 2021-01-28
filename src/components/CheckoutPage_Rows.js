import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions/app.actions'

function CheckoutPageRows(props) {
    const items = [...(props.applicationState.appReducer.shoppingCart)];

    const [quantityOfTrees, setQuantityOfTrees] = useState(0)

    useEffect(() => {
        items.map((item) => {
            if (item.tree_id == props.tree_id) {
                setQuantityOfTrees(item.quantity);
            }
        })
    }, [props.applicationState.appReducer.shoppingCart])

    const plusItem = () => {
        let counter = true;

        items.map((item) => {
            if (item.tree_id === props.tree_id) {
                counter = false;
                item.quantity += 1;
                items[0].totalItemsInShoppingCart += 1;
                props.actions.storeShoppingCart(items)
                console.log(props.applicationState.appReducer.shoppingCart)
            }
        })

        if (counter) {
            items[0].totalItemsInShoppingCart += 1;
            items.push({ tree_id: props.tree_id, tree_name: props.treeName, tree_price: props.price, quantity: 1 })
            props.actions.storeShoppingCart(items)
            console.log(props.applicationState.appReducer.shoppingCart)
        }
    }

    const minusItem = () => {
        let counter = true;

        items.map((item) => {
            if (item.tree_id === props.tree_id && item.quantity >= 1) {
                counter = false;
                item.quantity -= 1;
                items[0].totalItemsInShoppingCart -= 1;
                props.actions.storeShoppingCart(items)
                console.log(props.applicationState.appReducer.shoppingCart)
            }
        })
    }

    return (
        <tbody>
            <tr>
                <td>{props.tree_name}</td>
                <td>{props.tree_price}</td>
                <td>
                    <Button className="CardButton" onClick={minusItem}>
                        -
                    </Button>{' '}
                    {quantityOfTrees}{' '}
                    <Button className="CardButton" onClick={plusItem}>
                        +
                    </Button>
                </td>
                <td>{props.tree_price * props.quantity}</td>
            </tr>
        </tbody>
    )
}

const mapStateToProps = state => ({ applicationState: state });
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPageRows);