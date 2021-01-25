import React, { useState, useEffect } from 'react';
import PageNavBar from './PageNavBar';
import UserAccountOrderButtonCollapse from './UserAccount_OrderButtonCollapse';

export default function UserAccountPage() {
    const [orders, setOrders] = useState([]);
    const [user_id, setUserID] = useState(1);

    useEffect(() => {
        makeRequest()
    }, [])

    const makeRequest = async () => {
        const response = await fetch(`http://localhost:8080/userorders/?user_id=${user_id}`);
        const userOrders = await response.json();
        setOrders(userOrders);
    }

    return (
        <div style={{ width: "80%" }}>
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
                            co2_emissions={order.co2_emissions}
                            tree_img_link={order.tree_img_link}
                            tree_growth_link={order.tree_img_link}
                            order_id={order.order_id}
                            buying_date={order.buying_date}
                            price={order.price}
                            id={order.id} />
                })
            }
        </div>

    )

}