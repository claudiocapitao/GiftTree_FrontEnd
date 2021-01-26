import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function LogInRegisterButtons() {
    const history = useHistory();
    const handleClickLogIn = () => history.push('/login');
    const handleClickRegister = () => history.push('/register');

    return (
        <div>
            <Button className="LogInRegisterButtons" variant="login" onClick={handleClickLogIn}>Log in</Button>
            <Button className="LogInRegisterButtons" variant="register" onClick={handleClickRegister}>Register</Button>
        </div>
    )
}


