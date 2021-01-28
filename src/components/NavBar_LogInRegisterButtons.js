import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions/app.actions'

function LogInRegisterButtons(props) {
    const history = useHistory();
    const handleClickLogIn = () => history.push('/login');
    const handleClickRegister = () => history.push('/register');
    const handleClickCheckout = () => history.push('/checkout');

    let nItems = props.applicationState.appReducer.shoppingCart[0].totalItemsInShoppingCart

    return (
        <div>
            <Button className="LogInRegisterButtons" variant="login" onClick={handleClickCheckout}>Checkout {nItems} items</Button>
            <Button className="LogInRegisterButtons" variant="login" onClick={handleClickLogIn}>Log in</Button>
            <Button className="LogInRegisterButtons" variant="register" onClick={handleClickRegister}>Register</Button>
        </div>
    )
}

const mapStateToProps = state => ({ applicationState: state });
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(LogInRegisterButtons);
