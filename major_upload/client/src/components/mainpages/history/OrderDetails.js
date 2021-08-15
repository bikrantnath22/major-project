import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'

function OrderDetails() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [orderDetails, setOrderDetails] = useState([])

    const params = useParams()

    useEffect(() => {
        if (params.id) {
            history.forEach(item => {
                if (item._id === params.id) setOrderDetails(item)
            })
        }
    }, [params.id, history])


    if (orderDetails.length === 0) return null;

    return (
        <div className="history-page">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Postal Code</th>
                        <th>Country Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderDetails.address.recipient_name}</td>
                        <td>{orderDetails.address.line1 + " - " + orderDetails.address.city}</td>
                        <td>{orderDetails.address.postal_code}</td>
                        <td>{orderDetails.address.country_code}</td>
                    </tr>
                </tbody>
            </table>

            <table style={{ margin: "30px 0px" }}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Hotel</th>
                        <th>Room Name</th>
                        <th>Total Room</th>
                        <th>Price</th>
                        <th>StartDate</th>
                        <th>EndDate</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cart.map(item => (
                           
                                item.date ?
                                    (<tr key={item._id}>
                                        <td>{item.images && <img src={item.images.url} alt="" />}</td>
                                        <td>{item.hotelName}</td>
                                        <td>{item.title}</td>
                                        <td>{item.quantity}</td>
                                        <td>$ {item.price * item.quantity}</td>

                                        <td>{item.date.split(',')[0]}</td>
                                        <td>{item.date.split(',')[1]}</td>



                                    </tr>)
                                    : (
                                        <tr key={item._id}>
                                            <td>{item.images && <img src={item.images.url} alt="" />}</td>
                                            <td>{item.hotelName}</td>
                                            <td>{item.title}</td>
                                            <td>{item.quantity}</td>
                                            <td>$ {item.price * item.quantity}</td>
                                            <td>{item.createDate}</td>
                                            <td>{item.outDate}</td>

                                        </tr>
                                    )
                           
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default OrderDetails