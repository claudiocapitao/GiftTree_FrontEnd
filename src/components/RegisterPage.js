import PageNavBar from './PageNavBar';
import React, { useState, useEffect } from 'react';
import { Button, Alert, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
export default function RegisterPage() {
    const history = useHistory();
    const handleClickSubmit = () => history.push('/useraccount');

    const [user_name, setUserName] = useState('');
    const [user_first_name, setFistName] = useState('');
    const [user_last_name, setLasttName] = useState('');
    const [user_email, setEmail] = useState('');
    const [user_password, setPassword] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [userNameExists, setUserNameExists] = useState(false);
    const [emailExists, setEmailExists] = useState(false);


    const makeRequest = async () => {

        const user = {
            user_name,
            user_first_name,
            user_last_name,
            user_password,
            user_email
        }

        const response = await fetch('http://localhost:8080/newuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const userexists = await response.json();
        console.log(userexists);
        console.log(userexists.user_exists);
        console.log(userexists.email_exists);

        if (!userexists.user_exists && !userexists.email_exists) {
            setShow(true)
        }

        await setUserNameExists(userexists.user_exists);
        await setEmailExists(userexists.email_exists);

        console.log(userNameExists);
        console.log(emailExists)
    }

    return (
        <div>
            <PageNavBar />

            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Succcess</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Yey, Account was created :)</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <Form>
                <h2>Register: Fill the following form</h2>


                <div className="form-group">
                    <label>User name</label>
                    <Alert show={userNameExists} variant='danger'>
                        User name already exists!
                    </Alert>
                    <input type="text" onChange={(e) => { setUserName(e.target.value) }} className="form-control" placeholder="User name" />
                </div>
                <div className="form-group">
                    <label>First name</label>
                    <input type="text" onChange={(e) => { setFistName(e.target.value) }} className="form-control" placeholder="First name" />
                </div>
                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" onChange={(e) => { setLasttName(e.target.value) }} className="form-control" placeholder="Last name" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <Alert show={emailExists} variant='danger'>
                        Email already exists!
                    </Alert>
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} className="form-control" placeholder="Enter password" />
                </div>
                <Button className="SubmitButton" variant="primary" /* type="submit" */ onClick={makeRequest}>
                    Submit
                </Button>
            </Form>
        </div >
    )
}