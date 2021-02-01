import React, { useState, useEffect, useInterval } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import TreeCard from "./TreeCard.js";
import PageNavBar from "./PageNavBar";
import { CardColumns, Col, Row } from "react-bootstrap";
import MarketplaceFilter from "./MarketplaceFilter";
import styles from "./styles/MarketplacePage.module.css";

export default function MarketplacePage() {
    const history = useHistory();
    const handleClickCheckout = () => history.push("/checkout");

    const [loading, setLoading] = React.useState(true);
    const [cachedTrees, setCachedTrees] = useState([]);
    const [trees, setTrees] = useState([]);

    const [bSize, setBSize] = useState("sm");

    useEffect(() => {
        const interval = setInterval(() => {
            setBSize(new Date().getTime() % 2 === 0 ? "#23aa76" : "green");
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setLoading(true);
        fetch(process.env.REACT_APP_API_ENDPOINT + "/trees")
            .then((response) => response.json())
            .then((data) => {
                setCachedTrees(data);
                setLoading(false);
                setTrees(data);
            })
            .catch((e) => {
                setLoading(false);
            });
    }, []);

    function performFilteredQuery(query) {
        fetch(process.env.REACT_APP_API_ENDPOINT + `/trees?${query}`)
            .then((res) => res.json())
            .then((trees) => setTrees(trees));
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
                            imageLink={tree.TREE_IMG_LINK}
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
        <div className={`${styles.page}`}>
            <PageNavBar />
            <h2 className={`${styles.header}`}>
                Gift a tree to your dearest and help the world :)
            </h2>
            <div className={`${styles.elements}`}>
                <Row>
                    <Col xs={2}>
                        <MarketplaceFilter
                            cachedTrees={cachedTrees}
                            performFilteredQuery={performFilteredQuery}
                        />
                    </Col>
                    <Col
                        style={{ maxWidth: "1000px", margin: "0 auto" }}
                        xs={10}
                    >
                        {!trees.length ? (
                            <div>
                                No available trees for your search criteria
                            </div>
                        ) : (
                            displayTrees(trees)
                        )}
                    </Col>
                </Row>

                <div style={{ margin: "100px" }}>
                    <Button
                        style={{
                            background: `${bSize}`,
                            transition: "all 0.8s",
                        }}
                        size="lg"
                        variant="success"
                        className={`${styles.button}`}
                        onClick={handleClickCheckout}
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
}
