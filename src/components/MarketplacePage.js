
import React, { useState } from 'react';
import treesJSON from './TreesJSON.js';
import TreeCard from './TreeCard.js';
import { CardDeck, CardGroup, CardColumns } from 'react-bootstrap';
import PageNavBar from './PageNavBar';

export default function MarketplacePage() {

    const treesArray = JSON.parse(treesJSON);
    var [trees, setTrees] = useState(treesArray);


    function treess(mytrees) {
        return (<CardColumns>
            {mytrees.map((tree) => {
                return <TreeCard key={tree.treeName} treeName={tree.treeName} treeSpecies={tree.treeSpecies} country={tree.country} co2Emitions={tree.co2Emitions} price={tree.price} imageLink={tree.imageLink} />
            })} </CardColumns>)
    }

    return (
        <div>
            <PageNavBar />
            <h2>Buy a tree, make someone smile and help the world :)</h2>
            {treess(trees)}
        </div>
    )

}