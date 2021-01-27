import React, { useState } from 'react'
import PageNavBar from './PageNavBar';
import { useHistory } from 'react-router-dom'
import { Table, Rows, Button, Modal } from 'react-bootstrap';
import CheckoutPageRows from './CheckoutPage_Rows'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions/app.actions'

function CheckoutPage(props) {

    const history = useHistory();
    const handleLogIn = () => history.push('/login');
    const handleRegister = () => history.push('/register');
    const handleUserAccount = () => history.push('/useraccount');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleToLogIn = () => {
        setShow(false)
        handleLogIn()
    };
    const handleRegistration = () => {
        setShow(false)
        handleRegister()
    };

    let shoppingCart = props.applicationState.appReducer.shoppingCart
    let userStatus = props.applicationState.appReducer.loggedIn
    let dataToSend = props.applicationState.appReducer

    const buyButton = async () => {
        if (userStatus) {
            const response = await fetch('http://localhost:8080/userorders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });
            const convertResponse = await response.json();

            console.log(convertResponse)
            props.actions.storeShoppingCart([{ totalItemsInShoppingCart: 0 }])
            handleUserAccount()
        } else {
            setShow(true)
        }
    }

    return (
        <div>
            <PageNavBar />
            <h1>Trees in your shopping cart</h1>

            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Problems :(</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You need to log in first before buying the trees</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleToLogIn}>Log in</Button>
                        <Button variant="secondary" onClick={handleRegistration}>Register</Button>
                    </Modal.Footer>
                </Modal>
            </div>


            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Tree name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Quantity</th>
                    </tr>
                </thead>

                {shoppingCart.map((item) => {
                    if (!!item.tree_id && !!item.quantity) {
                        return <CheckoutPageRows tree_id={item.tree_id}
                            tree_name={item.tree_name}
                            tree_price={item.tree_price}
                            quantity={item.quantity}
                        />
                    }
                })}

            </Table>
            <Button
                className="CardButton"
                onClick={buyButton}>
                Buy
            </Button>
        </div>
    )
}

const mapStateToProps = state => ({ applicationState: state });
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);