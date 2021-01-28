import React, { useState, useEffect } from 'react';
import { Button, Collapse, Image, Container, Col, Row, ProgressBar } from 'react-bootstrap';
import Stage05 from '../Images/Stage_05.png';
import Stage04 from '../Images/Stage_04.png';
import Stage03 from '../Images/Stage_03.png';
import Stage02 from '../Images/Stage_02.png';
import Stage01 from '../Images/Stage_01.png';

export default function UserAccountOrderButtonCollapse(props) {

    let [open, setOpen] = useState(false);
    const [treeStage, setTreeStage] = useState('')

    // Create logic process toreturn the proper stage image depending of the age of the tree
    // (new Date(Date.now())).toJSON() /->/ converst current time to JSON

    const timestampPurchaseDate = Date.parse(props.buying_date)
    const timestampNow = Date.now()

    const differenceDays = (timestampNow - timestampPurchaseDate) / 1000 / 60 / 60 / 24 //100 millisecons, 60 sec, 60 min, 24 hours

    const numberOfYears = differenceDays / 365
    const numberOfDays = differenceDays % 365
    const parseNumberOfYears = parseInt(numberOfYears, 10)
    const parseNumberOfDays = parseInt(numberOfDays, 10)

    const treeAge = `${parseNumberOfYears} years and ${parseNumberOfDays} days`

    // Calculate current percentage of growth

    const accumulatedGrowthTillNow = props.growth_rate * differenceDays / 365

    let growthPercentage = 0
    if (accumulatedGrowthTillNow <= props.size_max) {
        growthPercentage = parseInt((accumulatedGrowthTillNow / props.size_max * 100), 10)
    } else {
        growthPercentage = 100
    }

    useEffect(() => {
        if (growthPercentage < 20) {
            setTreeStage(Stage01)
        } else if (growthPercentage < 40) {
            setTreeStage(Stage02)
        } else if (growthPercentage < 60) {
            setTreeStage(Stage03)
        } else if (growthPercentage < 80) {
            setTreeStage(Stage04)
        } else if (growthPercentage <= 100) {
            setTreeStage(Stage05)
        }
    }, [])

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
                                <Image src={props.tree_img_link} style={{ margin: '5px' }} fluid />
                            </Col>
                            <Col>
                                <p style={{ textAlign: 'center', margin: '5px' }}><b>Growth stage</b></p>{' '}
                                <Image src={treeStage} style={{ margin: '5px' }} fluid />{' '}
                                <ProgressBar variant='success' animated now={growthPercentage} label={`${growthPercentage}%`} />
                            </Col>
                            <Col>
                                <div style={{ textAlign: 'left', margin: '5px' }}>
                                    <p><b>Tree name: </b>{props.tree_name}</p>
                                    <p><b>Tree species: </b><i>{props.tree_species}</i></p>
                                    <p><b>Country: </b>{props.country}</p>
                                    <p><b>CO2 absorbed: </b>{props.co2_emissions} kg/year</p>
                                    <p><b>Price: </b>{props.price}</p>
                                    <p><b>Purchase date: </b> {(props.buying_date).substr(0, 10)}</p>
                                    <p><b>Age: </b> {treeAge}</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Collapse>
        </div >
    );

}