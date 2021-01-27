import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";

export default function FilterDropdown({
    title,
    type,
    data,
    updateFilters,
    selected,
}) {
    function displayDropdownItems(type, treesArray) {
        // Use a set to keep track of items in order to remove duplicates
        const uniqueSet = new Set();

        return treesArray.map((tree, idx) => {
            const val = tree[type];

            if (!uniqueSet.has(val)) {
                uniqueSet.add(val);
                let active = val == selected ? true : false;
                return (
                    <Dropdown.Item key={idx} eventKey={val} active={active}>
                        {val}
                    </Dropdown.Item>
                );
            }
        });
    }

    return (
        <DropdownButton
            as={ButtonGroup}
            size="sm"
            variant="secondary"
            title={`${title}${selected ? ": " + selected : ""}`}
            onSelect={(v) => {
                updateFilters(type, v);
            }}
        >
            {displayDropdownItems(type, data)}
        </DropdownButton>
    );
}
