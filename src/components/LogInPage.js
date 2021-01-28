import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import PageNavBar from './PageNavBar';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions/app.actions'

function LogInPage(props) {
    const [user_email, setUserEmail] = useState('');
    const [user_password, seUserPassword] = useState('')

    const history = useHistory();
    const handleClickAccount = () => history.push('/useraccount');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const validateEmailPass = async () => {
        const url = `http://localhost:8080/login/?user_email=${user_email}&user_password=${user_password}`;
        const response = await fetch(url);
        const resEmailPass = await response.json(); // should get object {email: true/false, pass: true:false}

        console.log(resEmailPass)

        if (resEmailPass.canUserLogIn) {
            await props.actions.storeUserData(resEmailPass.user_id)
            await handleClickAccount();
        } else {
            setShow(true)
        }
    }

    return (
        <div>
            <PageNavBar />
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Fail in Log In :(</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Wrong email or password</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <h2>Log  In: Type your credentials</h2 >
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => { setUserEmail(e.target.value) }} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => { seUserPassword(e.target.value) }} />
                </Form.Group>
                <Button className="SubmitButton" variant="primary" type="button" onClick={validateEmailPass}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

const mapStateToProps = state => ({ applicationState: state });
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);
