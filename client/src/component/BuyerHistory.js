import React from 'react';
import store from "../store";
import {getAllDeliveredOrdersForBuyer} from "./Creator";

class MyOrders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ModalIsOpen: false,
            ModalNumber: ''
        };
        console.log("In constructor of My orders");
        console.log(store.getState())
    }

    toggleModal() {
        console.log("toggling");
        this.setState({ModalIsOpen: !(this.state.ModalIsOpen)})
    }

    getModalIsOpen() {
        return this.state.ModalIsOpen;

    }

    getModalNumber() {
        return this.state.ModalNumber;
    }

    setModalNumber(number) {
        this.setState({ModalNumber: number})
    }

    render() {
        let productList = store.getState().orders;
        productList = store.getState().orders;
        console.log(productList);
        if (productList.size === 0) {
            getAllDeliveredOrdersForBuyer().then(r =>
                                                     console.log(
                                                         "After fetching all the orders:" + r));
            productList = store.getState().orders;
            console.log(productList);
        }
        let gifts = [];
        for (let i = 0; i < productList.size; i++) {
            if (productList.get(i).orderDetails[i].status === "Delivered") {
                gifts.push(productList.get(i))
            }

        }

        return (
            <div>
                {gifts.map((gift, index) =>

                               <table className="ui orange table">
                                   <thead key='head'>
                                   <tr>
                                       <th className="tableData">Gift Name</th>
                                       <th className="tableData">Price</th>
                                   </tr>
                                   </thead>
                                   <tbody key='body'>

                                   <tr key={index + 1}>
                                       <td className="tableData">{gift.orderDetails[index].gift.name}</td>
                                       <td className="tableData">{gift.orderDetails[index].gift.price}$</td>
                                   </tr>

                                   </tbody>
                               </table>
                )}
            </div>
        )
    }
}

function MyOrderHistory(params) {
    console.log(params);
    let productList = store.getState().orders;
    console.log(productList);
    if (productList.size === 0) {
        getAllDeliveredOrdersForBuyer().then(r =>
                                                 console.log("After fetching all the orders:" + r));
        productList = store.getState().orders;
        console.log(productList);
    }
    let gifts = [];
    for (let i = 0; i < productList.size; i++) {
        if (productList.get(i).orderDetails[i].status === "Delivered") {
            gifts.push(productList.get(i))
        }

    }
    return (
        <div>
            <table className="ui orange table">
                <thead key='head'>
                <tr>
                    <th className="tableData">Gift Name</th>
                    <th className="tableData">Price</th>
                </tr>
                </thead>
                <tbody key='body'>
                {gifts.map((gift, index) =>
                               <tr key={index + 1}>
                                   <td className="tableData">{gift.orderDetails[index].gift.name}</td>
                                   <td className="tableData">{gift.orderDetails[index].gift.price}$</td>
                               </tr>
                )}
                </tbody>
            </table>

        </div>
    )
}

export default MyOrders;