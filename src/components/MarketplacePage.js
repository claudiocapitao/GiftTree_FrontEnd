import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import TreeCard from "./TreeCard.js";
import PageNavBar from "./PageNavBar";
import { CardColumns, Col, Row } from "react-bootstrap";
import MarketplaceFilter from "./MarketplaceFilter";

export default function MarketplacePage() {
    const history = useHistory();
    const handleClickCheckout = () => history.push('/checkout');

    const [loading, setLoading] = React.useState(true);
    const [cachedTrees, setCachedTrees] = useState([]);
    const [trees, setTrees] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:8080/trees")
            .then((response) => response.json())
            .then((data) => {
                setCachedTrees(data);
                setLoading(false);
                setTrees(data);
                console.log(data);
            })
            .catch((e) => {
                setLoading(false);
            });
    }, []);

    function performFilteredQuery(query) {
        fetch(`http://localhost:8080/trees?${query}`)
            .then((res) => res.json())
            .then((trees) => {
                setTrees(trees);
                console.log(trees);
            });
    }

    function displayTrees(trees) {
        return (
            <CardColumns>
                {trees.map((tree) => {
                    return (
                        <TreeCard
                            key={tree.TREE_NAME}
                            tree_id={tree.TREE_ID}
                            treeName={tree.TREE_NAME}
                            treeSpecies={tree.TREE_SPECIES}
                            country={tree.COUNTRY}
                            co2Emissions={tree.CO2_EMISSIONS}
                            price={tree.PRICE}
                            imageLink={tree.IMAGE_URL}
                        />
                    );
                })}
            </CardColumns>
        );
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <PageNavBar />
            <h2>Buy a tree, make someone smile and help the world :)</h2>
            <Row>
                <Col xs={2}>
                    <MarketplaceFilter
                        cachedTrees={cachedTrees}
                        performFilteredQuery={performFilteredQuery}
                    />
                </Col>

                <Col xs={10}>
                    {!trees.length ? (
                        <div>No available trees for your search criteria</div>
                    ) : (
                            displayTrees(trees)
                        )}
                </Col>
            </Row>
            <Button
                className="CardButton"
                onClick={handleClickCheckout}>
                Checkout
            </Button>
        </div>
    );
}