import React from 'react'
import {getCategories, getMyGifts} from './Creator';
import store from '../store';
import './app.css'
import ModelView from './ModelView'
import {Pagination} from "semantic-ui-react";

class MyProducts extends React.Component {

    constructor(props) {
        super(props);
        //this.state = getMyGifts;
        this.state = {
            ModalIsOpen: false,
            ModalNumber: '',
            deleteGift: '',
            editGift: '',
            page: 1
        }
        console.log("In sconstrucot of My products")
        console.log(store.getState())
    }

    componentDidMount() {
        // getMyGifts();
        // getCategories();

    }

    getEditGift() {
        return this.state.editGift
    }

    getDeleteGift() {
        return this.state.deleteGift;
    }

    getView() {
        return this.state.view;
    }

    setView(view) {
        this.setState({view: view})
    }

    getCurrentPageNumber() {
        return this.state.page;
    }

    setCurrentPageNumber(number) {
        this.setState({page: number})
    }

    setDeleteGift(giftid) {
        console.log("in set delete")
        console.log(giftid);
        this.setState({deleteGift: giftid})
    }

    setEditGift(giftid) {
        this.setState({editGift: giftid})
    }

    toggleModal() {
        console.log("toggling")
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
        return (
            <div>
                <MyProductList getEditGift={this.getEditGift.bind(this)}
                               setEditGift={this.setEditGift.bind(this)}
                               getDeleteGift={this.getDeleteGift.bind(this)}
                               setDeleteGift={this.setDeleteGift.bind(this)}
                               toggleModal={this.toggleModal.bind(this)}
                               setModalNumber={this.setModalNumber.bind(this)}
                               setView={this.setView.bind(this)}
                               setCurrentPageNumber={this.setCurrentPageNumber.bind(this)}
                               getCurrentPageNumber={this.getCurrentPageNumber.bind(this)}

                />
                <ModelView getModalIsOpen={this.getModalIsOpen.bind(this)}
                           getModalNumber={this.getModalNumber.bind(this)}
                           toggleModal={this.toggleModal.bind(this)}
                           setModalNumber={this.setModalNumber.bind(this)}
                           getDeleteGift={this.getDeleteGift.bind(this)}
                           getEditGift={this.getEditGift.bind(this)}
                           getView={this.getView.bind(this)}
                />
            </div>

        )
    }
}

function MyProductList(params) {
// let MyProductList = connect(({ gifts }) => ({ gifts }))(({ gifts, dispatch }) => {
    console.log(params);
    let {toggleModal} = params;
    let {setModalNumber} = params;
    let {setDeleteGift} = params;
    let {getDeleteGift} = params;
    let {setView} = params;
    let {setEditGift} = params;
    let {setCurrentPageNumber} = params;
    let {getCurrentPageNumber} = params;
    let productList = store.getState().gifts;
    if (productList.size === 0) {
        getMyGifts();
        getCategories();
        productList = store.getState().gifts;
    }
    // let productList = store.getState().gifts;
    let gifts = [];
    console.log(productList);
    for (let i = 0; i < productList.size; i++) {
        gifts.push(productList.get(i))
    }

    function setPageNumber(e, {activePage}) {
        console.log(activePage);
        setCurrentPageNumber(activePage)
    }

    console.log(gifts);
    const itemPerPage = 3;
    const page = getCurrentPageNumber();
    console.log("Page ", page);
    const totalPages = Math.ceil(gifts.length / itemPerPage);
    gifts = gifts.slice((page - 1) * itemPerPage, (page - 1) * itemPerPage + itemPerPage)
    return (
        <div>
            <table className="ui orange table">
                <thead key='head'>
                <tr>
                    <th className="tableData">Gift Name</th>
                    <th className="tableData">Price</th>
                    <th className="tableData">Categories</th>
                    <th className="tableData">Delivery In Days</th>
                    <th className="tableData">Available Quantity</th>
                    <th className="tableData">Image</th>
                    <th className="tableData">edit/delete</th>
                </tr>
                </thead>
                <tbody key='body'>
                {gifts.map((gift, index) =>
                               <tr key={index + 1}>
                                   <td className="tableData">{gift.name}</td>
                                   <td className="tableData">{gift.price}$</td>
                                   <td className="tableData">{gift.category.join(", ")}</td>
                                   <td className="tableData">{gift.deliveryInDays}</td>
                                   <td className="tableData">{gift.availableQuantity}</td>
                                   <td className="tableData"><img src={gift.imageData}
                                                                  alt="no image" width='100px'
                                                                  height='100px'/></td>
                                   <td className="tableData">
                                       <button key={index + 2} onClick={() => {
                                           toggleModal();
                                           setEditGift(gift._id);
                                           setModalNumber(2);
                                           setView("Edit Gift")
                                       }}><i className="blue pencil alternate icon"/></button>
                                       &nbsp;&nbsp;
                                       <button key={index + 3} onClick={() => {
                                           setDeleteGift(gift._id);
                                           toggleModal();
                                           setModalNumber(3);
                                       }}><i className="red trash alternate icon"/></button>
                                   </td>
                               </tr>
                )}
                </tbody>
            </table>
            <button className="ui button" onClick={() => {
                toggleModal();
                setModalNumber(1)
            }}><i className="green plus icon"/>Add New Gift
            </button>
            <div align="center">
                <Pagination
                    onPageChange={setPageNumber}
                    activePage={page}
                    siblingRange={1}
                    totalPages={totalPages}
                />
            </div>
        </div>
    )

}

function mapStateToProps(state) {
    return state.gifts;
}

export default MyProducts;