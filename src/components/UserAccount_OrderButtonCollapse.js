import React, { useState, useEffect } from 'react';
import { Button, Collapse, Image, Container, Col, Row } from 'react-bootstrap';
import Stage05 from '../Images/Stage05.png';
import Stage04 from '../Images/Stage04.png';
import Stage03 from '../Images/Stage03.png';
import Stage02 from '../Images/Stage02.png';
import Stage01 from '../Images/Stage01.png';

const moment = require('moment');

export default function UserAccountOrderButtonCollapse(props) {

    let [open, setOpen] = useState(false);
    let [growthStage, setGrowthStage] = useState('')
    const transformDate = moment(new Date(props.buying_date)).format("YYYY-MM-DD")

    // Create logic process toreturn the proper stage image depending of the age of the tree

    return (
        <div key={props.id} style={{ margin: '10px' }}>
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                style={{ width: "100%", textAlign: 'left' }}>
                Order ID: #{props.order_id}{' '}
                <b>Tree name: {props.tree_name}</b>{' '}
            </Button>
            <Collapse className='colapseTreeData' in={open}>
                <div id="example-collapse-text">
                    <Container className='colapseTreeDatads' fluid>
                        <Row className='colapseTreeDatsdfsdfa'>
                            <Col>
                                <Image src={props.tree_img_link} style={{ margin: '10px' }} fluid />
                            </Col>
                            <Col>
                                <p style={{ textAlign: 'center', margin: '10px' }}><b>Growth stage</b></p>
                                <Image src={Stage05} style={{ margin: '10px' }} fluid /></Col>
                            <Col>
                                <div style={{ textAlign: 'left', margin: '10px' }}>
                                    <p><b>Tree name: </b>{props.tree_name}</p>
                                    <p><b>Tree species: </b><i>{props.tree_species}</i></p>
                                    <p><b>Country: </b>{props.country}</p>
                                    <p><b>CO2 absorbed: </b>{props.co2_emissions} kg/year</p>
                                    <p><b>Price: </b>{props.price}</p>
                                    <p><b>Purchase date: </b> {transformDate}</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Collapse>
        </div >
    );

}