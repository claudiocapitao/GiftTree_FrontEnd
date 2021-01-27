import React, { useState, useEffect } from "react";
import TreeCard from "./TreeCard.js";
import PageNavBar from "./PageNavBar";
import { CardColumns, Col, Row } from "react-bootstrap";
import MarketplaceFilter from "./MarketplaceFilter";

export default function MarketplacePage() {
    const [loading, setLoading] = React.useState(true);
    const [cachedTrees, setCachedTrees] = useState([]);
    const [trees, setTrees] = useState([]);

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
        </div>
    );
}
