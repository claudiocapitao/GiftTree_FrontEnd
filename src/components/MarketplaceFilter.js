import React, { Fragment, useState, useEffect } from "react";
import { FormControl, InputGroup, Row, Button, Col } from "react-bootstrap";
import { Range } from "rc-slider";
import FilterDropdown from "./FilterDropdown";
import "rc-slider/assets/index.css";

function getRange(type, trees) {
    if (!trees.length) return;
    if (type === "min") {
        let min = trees[0].PRICE;
        for (let i = 1; i < trees.length; i++) {
            const x = trees[i];
            if (x.PRICE < min) min = x.PRICE;
        }
        return min;
    }
    if (type === "max") {
        let max = trees[0].PRICE;
        for (let i = 1; i < trees.length; i++) {
            const x = trees[i];
            if (x.PRICE > max) max = x.PRICE;
        }
        return max;
    }
}

const defaultFilterState = {
    CO2_EMISSIONS: null,
    COUNTRY: null,
    TREE_SPECIES: null,
};

export default function MarketplaceFilter({
    performFilteredQuery,
    cachedTrees,
}) {
    const [searchValue, setSearchValue] = useState("");
    const [range, setRange] = useState([
        getRange("min", cachedTrees),
        getRange("max", cachedTrees),
    ]);
    const [filters, setFilters] = useState(defaultFilterState);

    function updateFilters(key, value) {
        setFilters({ ...filters, [key]: value });
    }

    function resetFilters() {
        setSearchValue("");
        setFilters(defaultFilterState);
        setRange([getRange("min", cachedTrees), getRange("max", cachedTrees)]);

        performFilteredQuery("");
    }

    function handleSearchValue(val) {
        setSearchValue(val);
    }

    function createFilterQuery() {
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
        if (query) {
            query += "&";
        }

        query +=
            "PRICE[min]" + "=" + range[0] + "&" + "PRICE[max]" + "=" + range[1];

        if (searchValue.length) {
            if (query) {
                query += "&";
            }
            query += "search=" + searchValue;
        }

        performFilteredQuery(query);
    }

    return (
        <Fragment>
            <Col sm={12}>
                <InputGroup className="mb-3">
                    <FormControl
                        onChange={(e) => {
                            handleSearchValue(e.target.value);
                        }}
                        value={searchValue}
                        placeholder="Search tree..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button
                            onClick={createFilterQuery}
                            variant="outline-secondary"
                        >
                            Search
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Col>
            <Col sm={12} justify="flex-start">
                <FilterDropdown
                    title="Tree Species"
                    data={cachedTrees}
                    type={"TREE_SPECIES"}
                    selected={filters["TREE_SPECIES"]}
                    updateFilters={updateFilters}
                />
            </Col>

            <Col sm={12} justify="flex-start">
                <FilterDropdown
                    title="Country"
                    data={cachedTrees}
                    type={"COUNTRY"}
                    selected={filters["COUNTRY"]}
                    updateFilters={updateFilters}
                />
            </Col>

            <Col sm={12} justify="flex-start">
                <FilterDropdown
                    title="CO2 Emissions"
                    data={cachedTrees}
                    type={"CO2_EMISSIONS"}
                    selected={filters["CO2_EMISSIONS"]}
                    updateFilters={updateFilters}
                />
            </Col>

            <Range
                onChange={(e) => {
                    setRange(e);
                }}
                defaultValue={[range[0], range[1]]}
                min={getRange("min", cachedTrees)}
                max={getRange("max", cachedTrees)}
                value={[range[0], range[1]]}
                allowCross={false}
                step={10}
            />
            <Row>
                <Col>
                    <InputGroup size="sm">
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
                </Col>

                <Col>
                    <InputGroup size="sm">
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
                </Col>
            </Row>

            <Button variant="light" onClick={resetFilters}>
                Reset
            </Button>
            <Button variant="primary" onClick={createFilterQuery}>
                Apply
            </Button>
        </Fragment>
    );
}