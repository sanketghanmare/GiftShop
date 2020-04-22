import React from 'react';
import store from '../store';
import {setDeleteGiftFromCart} from "./Creator";
import {Pagination} from "semantic-ui-react";
import ModalView from "./ModelView";

class MyCart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            total: '',
            GiftBasketList: [],
            currentPage: 1,
            ModalIsOpen: false,
            ModalNumber: '',
        }
    }

    componentDidMount() {
        console.log('in component');
        this.setTotal();

    }

    toggleModal() {
        this.setTotal();
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

    getMyCartState() {
        return this.state;
    }

    setTotal() {
        console.log("setting total");
        let map = store.getState().shoppingCart;
        console.log("this is the gift basket");
        console.log(map);
        let GiftBasketList = Array.from(map, ([, value]) => ({value}));
        console.log("In gift basket");
        console.log(GiftBasketList);

        let total = Math.round(GiftBasketList.reduce(function (sum, gift) {
            console.log(gift);
            return sum = sum + gift.value.quantity * gift.value.gift.price
        }, 0));

        this.setState({
                          total: total,
                          GiftBasketList: GiftBasketList
                      })

    }

    render() {
        let GiftList = this.state.GiftBasketList;
        const itemPerPage = 2;
        const page = this.state.currentPage;
        const totalPages = Math.ceil(GiftList.length / itemPerPage);
        GiftList = GiftList.slice((page - 1) * itemPerPage, (page - 1) * itemPerPage + itemPerPage);
        if (GiftList.length > 0) {
            return (
                <div>
                    <div>
                        <div>
                            <div className="ui two column very relaxed stackable grid">
                                <div className="middle aligned column">
                                    <table className="tableDisplay">
                                        <thead key='head'>
                                        <tr>
                                            <th className="left floated">

                                                <h2 className="ui left floated header">Gift
                                                    Basket</h2>
                                                <h3 className="ui right floated header">Price</h3>

                                            </th>
                                            <th>

                                            </th>


                                        </tr>

                                        </thead>
                                        <div className="ui clearing divider"/>
                                        <tbody>

                                        {GiftList.map((gift, index) => (
                                            <tr>
                                                <td>
                                                    <div className="ui raised card">

                                                        <div className="content">
                                                            <div
                                                                className="ui two column very relaxed stackable grid">
                                                                <div
                                                                    className="middle aligned column">
                                                                    <img src={gift.value.imageData}
                                                                         alt="noimage"
                                                                         width='100px'
                                                                         height='100px'/>
                                                                </div>
                                                                <div
                                                                    className="middle aligned column">
                                                                    <div className="ui form">

                                                                        <div className="one field">
                                                                            <div className="field">
                                                                                <h3 className="ui header">
                                                                                    <label>{gift.value.gift.name}</label>
                                                                                </h3>
                                                                            </div>
                                                                        </div>

                                                                        <div className="one field">
                                                                            <div className="field">
                                                                                <h5 className="ui header">
                                                                                    <label>Quantity
                                                                                        : {gift.value.quantity} </label>
                                                                                </h5>
                                                                            </div>
                                                                        </div>

                                                                        <div className="one field">
                                                                            <div className="field">
                                                                                <h5 className="ui header">
                                                                                    <label>Price
                                                                                        : {gift.value.gift.price
                                                                                           * gift.value.quantity}</label>
                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="extra content">
                                                            <div className="right floated author">
                                                                <button onClick={async () => {
                                                                    await setDeleteGiftFromCart(
                                                                        gift.value._id)
                                                                        .then(() => this.setTotal())

                                                                }}><i
                                                                    className="red trash alternate icon"/>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="ui clearing divider"/>
                                                </td>

                                            </tr>
                                        ))}
                                        <div className="ui clearing divider"/>

                                        <tr>
                                            <div>
                                                <h2 className="ui left floated header">Total
                                                    Price</h2>
                                                <h2 className="ui right floated header">{this.state.total}</h2>
                                            </div>

                                        </tr>

                                        </tbody>
                                    </table>


                                </div>

                                <div className="middle aligned column">
                                    <div className="ui raised card">

                                        <div className="content">
                                            <div>
                                                <h2 className="ui left floated header">Total
                                                    Price</h2>
                                                <h2 className="ui right floated header">{this.state.total}</h2>
                                            </div>

                                            <div className="extra content">
                                                <button className="ui green submit button"
                                                        onClick={() => {
                                                            this.setModalNumber(11);
                                                            this.toggleModal();
                                                        }}>Checkout
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="ui vertical divider">
                                <i className="orange gift icon"/>
                            </div>
                            <div className="ui clearing divider">
                            </div>
                        </div>
                        <div>
                            <div align="center">
                                <Pagination
                                    onPageChange={(e, {activePage}) => {
                                        this.setState({currentPage: activePage})
                                    }}
                                    activePage={page}
                                    siblingRange={1}
                                    totalPages={totalPages}
                                />
                            </div>
                        </div>
                    </div>
                    <ModalView getModalIsOpen={this.getModalIsOpen.bind(this)}
                               getModalNumber={this.getModalNumber.bind(this)}
                               toggleModal={this.toggleModal.bind(this)}
                               setModalNumber={this.setModalNumber.bind(this)}
                               getMyCartState={this.getMyCartState.bind(this)}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <dialog open>
                        <p>No Items in the Cart!</p>
                    </dialog>
                </div>
            )
        }
    }

}

export default MyCart;
