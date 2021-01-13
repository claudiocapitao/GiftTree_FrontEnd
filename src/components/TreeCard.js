import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import './TreeCard.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

export default function TreeCard(props) {

    const history = useHistory();
    const handleClickMarketplace = () => history.push("/useraccount")


    return (

        <Card className="card" key={props.treeName} border="secundary" style={{ width: '15rem' }}>

            <Card.Img variant={props.treeName} src={props.imageLink} style={{ width: "100%" }} />

            <Card.Body>
                <Card.Title style={{ fontSize: "100%", margin: "0", padding: "0" }}><b>{props.treeName}</b></Card.Title>
                <Card.Text>Description...</Card.Text>
            </Card.Body>

            <ListGroup>
                <ListGroupItem>Species: <i>{props.treeSpecies}</i></ListGroupItem>
                <ListGroupItem>Country: {props.country}</ListGroupItem>
                <ListGroupItem>CO2 Emitions: {props.co2Emitions} kg/year</ListGroupItem>
            </ListGroup>

            <Button className="CardButton" variant={props.treeName} onClick={handleClickMarketplace}>Buy for {props.price} €</Button>
        </Card>

    )

}


