import React, { useState, useEffect } from 'react';
import PageNavBar from './PageNavBar';
import UserAccountOrderButtonCollapse from './UserAccount_OrderButtonCollapse';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions/app.actions'

function UserAccountPage(props) {
    const [orders, setOrders] = useState([]);
    const [user_id, setUserID] = useState(1);

    useEffect(() => {
        makeRequest()
    }, [])

    const makeRequest = async () => {
        const response = await fetch(`http://localhost:8080/userorders/?user_id=${props.applicationState.appReducer.user}`);
        const userOrders = await response.json();
        setOrders(userOrders);
    }

    return (
        <div>
            <PageNavBar />
            <h2>Past Orders: </h2>
            {
                orders.map((order) => {
                    if (orders)
                        return <UserAccountOrderButtonCollapse
                            key={order.id}
                            tree_name={order.tree_name}
                            tree_species={order.tree_species}
                            country={order.country}
                            growth_rate={order.growth_rate}
                            size_max={order.size_max}
                            co2_emissions={order.co2_emissions}
                            tree_img_link={order.tree_img_link}
                            order_id={order.order_id}
                            buying_date={order.buying_date}
                            price={order.price}
                            id={order.id} />
                })
            }
        </div>

    )

}

const mapStateToProps = state => ({ applicationState: state });
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(UserAccountPage);