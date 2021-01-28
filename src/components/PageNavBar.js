import React, { useState, useEffect } from 'react';
import { Nav, Container, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions/app.actions'

import LogInRegisterButtons from './NavBar_LogInRegisterButtons';
import LogOutAccountButtons from './NavBar_LogOutAccountButtons';


function PageNavBar(props) {
    const history = useHistory();
    const handleClickHome = () => history.push('/');
    const handleClickAbout = () => history.push('/about');
    const handleClickMarketplace = () => history.push('/marketplace');

    const [flipButtons, setFlipButtons] = useState(false)

    console.log(props.applicationState)
    console.log(props.applicationState.appReducer.loggedIn)

    const loggedIn = props.applicationState.appReducer.loggedIn

    useEffect(() => {
        if (loggedIn) {
            setFlipButtons(<LogOutAccountButtons />)
        } else {
            setFlipButtons(<LogInRegisterButtons />)
        }
    }, [loggedIn])

    return (

        <Container>
            <Row>
                <Col>
                    <Nav>
                        <Nav.Link onClick={handleClickHome}>Home</Nav.Link>{' '}
                        <Nav.Link onClick={handleClickAbout}>About</Nav.Link>{' '}
                        <Nav.Link onClick={handleClickMarketplace}>Marketplace</Nav.Link>{' '}
                    </Nav>
                </Col>
                <Col>
                    {flipButtons}
                </Col>
            </Row>

        </Container>
    )
}

const mapStateToProps = state => ({ applicationState: state });
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(PageNavBar);