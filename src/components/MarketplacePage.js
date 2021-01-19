import React, { useState, useEffect } from "react";
import TreeCard from "./TreeCard.js";
import {
    CardColumns,
    Col,
    FormControl,
    InputGroup,
    Row,
    Button,
} from "react-bootstrap";
import PageNavBar from "./PageNavBar";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import FilterDropdown from "./FilterDropdown.js";

//TODO: extract filters to a new component

function getRange(type, trees) {
    if (!trees.length) return;
    if (type === "min") {
        let min = trees[0].PRICE;
        for (let i = 1; i < trees.length; i++) {
            const copac = trees[i];
            if (copac.PRICE < min) min = copac.PRICE;
        }
        return min;
    } else {
        let max = trees[0].PRICE;
        for (let i = 1; i < trees.length; i++) {
            const copac = trees[i];
            if (copac.PRICE > max) max = copac.PRICE;
        }
        return max;
    }
}

export default function MarketplacePage() {
    const [loading, setLoading] = React.useState(true);
    var [cachedTrees, setCachedTrees] = useState([]);
    var [trees, setTrees] = useState([]);
    const [range, setRange] = useState([
        getRange("min", trees),
        getRange("max", trees),
    ]);
    var [filters, setFilters] = useState({
        CO2_EMISSIONS: null,
        COUNTRY: null,
        TREE_SPECIES: null,
    });

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

    function processFilters() {
        let query = "";
        let propsAdded = 0;
        Object.keys(filters).forEach((key, idx) => {
            if (filters[key]) {
                if (propsAdded > 0) {
                    query += "&";
                }
                propsAdded += 1;
                query += key + "=" + filters[key];
            }
        });
        ///api/trees?COUNTRY=Australia&PRICE[min]=10&PRICE[max]=100
        query +=
            "PRICE[min]" + "=" + range[0] + "&" + "PRICE[max]" + "=" + range[1];

        fetch(process.env.REACT_APP_API_ENDPOINT + `/trees?${query}`)
            .then((res) => res.json())
            .then((trees) => setTrees(trees));
    }

    function updateFilters(key, value) {
        setFilters({ ...filters, [key]: value });
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
                            imageLink={tree.IMAGE_URL}
                        />
                    );
                })}
            </CardColumns>
        );
    }

    if (loading) {
        return <p>loading..</p>;
    }

    return (
        <div>
            <PageNavBar />
            <h2>Buy a tree, make someone smile and help the world :)</h2>
            <Row>
                <Col xs={2}>
                    <FilterDropdown
                        title="Tree Species"
                        data={cachedTrees}
                        type={"TREE_SPECIES"}
                        updateFilters={updateFilters}
                    />
                    <FilterDropdown
                        title="Country"
                        data={cachedTrees}
                        type={"COUNTRY"}
                        updateFilters={updateFilters}
                    />
                    <FilterDropdown
                        title="CO2 Emissions"
                        data={cachedTrees}
                        type={"CO2_EMISSIONS"}
                        updateFilters={updateFilters}
                    />
                    <Range
                        onChange={(e) => {
                            setRange(e);
                        }}
                        defaultValue={[range[0], range[1]]}
                        min={getRange("min", trees)}
                        max={getRange("max", trees)}
                        allowCross={false}
                    />
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">
                                Min
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            readOnly={true}
                            value={range[0]}
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                        />
                    </InputGroup>
                    -
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">
                                Max
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            readOnly={true}
                            value={range[1]}
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                        />
                    </InputGroup>
                    <Button variant="primary" onClick={processFilters}>
                        Apply
                    </Button>
                </Col>
                <Col xs={10}>{displayTrees(trees)}</Col>
            </Row>
        </div>
    );
}
