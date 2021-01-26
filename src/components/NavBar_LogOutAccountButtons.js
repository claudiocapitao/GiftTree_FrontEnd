import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions/app.actions'

function LogOutAccountButtons(props) {
    const history = useHistory();
    const handleClickLogOut = () => history.push('/');
    const handleClickAccount = () => history.push('/useraccount');

    const logOut = () => {
        props.actions.storeUserData('')
        handleClickLogOut()
    }

    return (
        <div>
            <Button className="LogOutAccountButtons" variant="logout" onClick={logOut}>Log out</Button>
            <Button className="LogOutAccountButtons" variant="account" onClick={handleClickAccount}>Account</Button>
        </div>
    )
}

const mapStateToProps = state => ({ applicationState: state });
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(LogOutAccountButtons);