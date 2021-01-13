import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function PageNavBar() {
    const history = useHistory();
    const handleClickHome = () => history.push('/');
    const handleClickAbout = () => history.push('/about');
    const handleClickMarketplace = () => history.push('/marketplace');

    const handleClickLogIn = () => history.push('/login');
    const handleClickRegister = () => history.push('/register');


    return (


        <table style={{ width: "100%" }}>
            <tbody>
                <tr>
                    <td style={{ width: "80%" }}>
                        <Nav className="mr-auto">
                            <Nav.Link onClick={handleClickHome}>Home</Nav.Link>{' '}
                            <Nav.Link onClick={handleClickAbout}>About</Nav.Link>{' '}
                            <Nav.Link onClick={handleClickMarketplace}>Marketplace</Nav.Link>{' '}
                        </Nav>
                    </td>
                    <td style={{ width: "20%" }} >
                        <Button style={{ alignSelf: 'stretch' }} className="LogInRegisterButtons" variant="login" onClick={handleClickLogIn}>LogIn</Button>{' '}
                        <Button style={{ alignSelf: 'stretch' }} className="LogInRegisterButtons" variant="register" onClick={handleClickRegister}>Register</Button>
                    </td>
                </tr>
            </tbody >
        </table >


    )
}