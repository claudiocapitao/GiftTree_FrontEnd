import React from "react";
import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";

function displayDropdownItems(type, treesArray) {
    // Use a set to keep track of items in order to remove duplicates
    const uniqueSet = new Set();

    return treesArray.map((tree, idx) => {
        const val = tree[type];

        if (!uniqueSet.has(val)) {
            uniqueSet.add(val);
            return (
                <Dropdown.Item key={idx} eventKey={val}>
                    {val}
                </Dropdown.Item>
            );
        }
    });
}

export default function FilterDropdown({ title, type, data, updateFilters }) {
    return (
        <DropdownButton
            as={ButtonGroup}
            size="sm"
            variant="secondary"
            title={title}
            onSelect={(v) => updateFilters(type, v)}
        >
            {displayDropdownItems(type, data)}
        </DropdownButton>
    );
}
