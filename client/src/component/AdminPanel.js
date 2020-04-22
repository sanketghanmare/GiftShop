import React from 'react';
import ModalView from "./ModelView";
import store from "../store";
import {getAllGifts, getAllUsers, getCategories} from "./Creator";
import {useLocation} from "react-router-dom";
import {Pagination} from "semantic-ui-react";

class AdminPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ModalIsOpen: false,
            ModalNumber: '',
            selectedUser: '',
            selectedCategory: '',
            selectedGift: '',
            page: 1,
            view: '',
            selectedRole: ''
        }
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

    setSelectedGift(giftid) {
        this.setState({selectedGift: giftid})
    }

    getSelectedGift() {
        return this.state.selectedGift
    }

    setCurrentPageNumber(number) {
        this.setState({page: number})
    }

    toggleModal() {
        console.log("toggling")
        this.setState({ModalIsOpen: !(this.state.ModalIsOpen)})
    }

    getModalIsOpen() {
        return this.state.ModalIsOpen;

    }

    setSelectedUserRole(role) {
        this.setState({selectedRole: role})
    }

    getSelectedUserRole() {
        return this.state.selectedRole
    }

    setSelectedCategory(categoryId) {
        this.setState({selectedCategory: categoryId})
    }

    getSelectedCategory() {
        return this.state.selectedCategory;
    }

    getModalNumber() {
        return this.state.ModalNumber;
    }

    setModalNumber(number) {
        this.setState({ModalNumber: number})
    }

    setSelectedUser(userId) {
        this.setState({selectedUser: userId})
    }

    getSelectedUser() {
        return this.state.selectedUser;
    }

    render() {

        return (

            <div>
                <UserList toggleModal={this.toggleModal.bind(this)}
                          setModalNumber={this.setModalNumber.bind(this)}
                          setSelectedUser={this.setSelectedUser.bind(this)}
                          setSelectedUserRole={this.setSelectedUserRole.bind(this)}
                          getSelectedUserRole={this.getSelectedUserRole.bind(this)}
                          setCurrentPageNumber={this.setCurrentPageNumber.bind(this)}
                          getCurrentPageNumber={this.getCurrentPageNumber.bind(this)}
                />
                <GiftList
                    setSelectedGift={this.setSelectedGift.bind(this)}
                    getSelectedGift={this.getSelectedGift.bind(this)}
                    setCurrentPageNumber={this.setCurrentPageNumber.bind(this)}
                    getCurrentPageNumber={this.getCurrentPageNumber.bind(this)}
                    toggleModal={this.toggleModal.bind(this)}
                    setModalNumber={this.setModalNumber.bind(this)}
                    setView={this.setView.bind(this)}
                />
                <CategoryList toggleModal={this.toggleModal.bind(this)}
                              setModalNumber={this.setModalNumber.bind(this)}
                              setSelectedCategory={this.setSelectedCategory.bind(this)}
                              setCurrentPageNumber={this.setCurrentPageNumber.bind(this)}
                              getCurrentPageNumber={this.getCurrentPageNumber.bind(this)}
                />
                <ModalView getModalNumber={this.getModalNumber.bind(this)}
                           getModalIsOpen={this.getModalIsOpen.bind(this)}
                           getSelectedUser={this.getSelectedUser.bind(this)}
                           toggleModal={this.toggleModal.bind(this)}
                           getSelectedCategory={this.getSelectedCategory.bind(this)}
                           getEditGift={this.getSelectedGift.bind(this)}
                           getDeleteGift={this.getSelectedGift.bind(this)}
                           getView={this.getView.bind(this)}
                           getSelectedUserRole={this.getSelectedUserRole.bind(this)}
                />
            </div>
        )
    }
}

function CategoryList(param) {
    console.log(param, "categories")
    let location = useLocation();
    let {toggleModal} = param;
    let {setSelectedCategory} = param;
    let {setModalNumber} = param;
    let {setCurrentPageNumber} = param;
    let {getCurrentPageNumber} = param;

    //let page = 1;
    function setPageNumber(e, {activePage}) {

        console.log(activePage)
        setCurrentPageNumber(activePage)
    }

    if (location.pathname === '/admin/category') {
        let categoryList = store.getState().categories;
        console.log(categoryList, "from the store")
        if (categoryList === 0) {
            getCategories();
            categoryList = store.getState().categories
        }

        let categories = [];
        for (let i = 0; i < categoryList.size; i++) {
            categories.push(categoryList.get(i))
        }
        const itemPerPage = 7;
        const page = getCurrentPageNumber();
        console.log("Page ", page)
        const totalPages = Math.ceil(categories.length / itemPerPage);
        categories =
            categories.slice((page - 1) * itemPerPage, (page - 1) * itemPerPage + itemPerPage)
        console.log("on page ", page, " ", categories);
        return (
            <div>
                <table className="ui orange table">
                    <thead key='head'>
                    <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        <th>Category Type</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody key='body'>
                    {categories.map((category, index) =>
                                        <tr key={index + 3}>
                                            <td>{(itemPerPage * (page - 1)) + index + 1}</td>
                                            <td>{category.categoryName}</td>
                                            <td>{category.catType}</td>
                                            <td>
                                                <button key={index + 6}
                                                        onClick={() => {
                                                            setModalNumber(9);
                                                            setSelectedCategory(
                                                                category.categoryName);
                                                            toggleModal()
                                                        }}>
                                                    <i className="blue pencil alternate icon"/>
                                                </button>
                                                &nbsp;&nbsp;
                                                <button key={index + 7}
                                                        onClick={() => {
                                                            setModalNumber(10);
                                                            setSelectedCategory(
                                                                category.categoryName);
                                                            toggleModal()
                                                        }}>
                                                    <i className="red trash alternate icon"/>
                                                </button>
                                            </td>
                                        </tr>
                    )}
                    </tbody>
                </table>
                <button className="ui button" onClick={() => {
                    toggleModal();
                    setModalNumber(8)
                }}>
                    <i className="green plus icon"/>
                    Add Category
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
    } else {
        return <div></div>
    }
}

function GiftList(param) {
    let location = useLocation();

    let {setSelectedGift} = param;
    let {getSelectedGift} = param;
    let {toggleModal} = param;
    let {setModalNumber} = param;

    let {setCurrentPageNumber} = param;
    let {getCurrentPageNumber} = param;

    let {setView} = param;

    let {set} = param;
    let {} = param;

    function setPageNumber(e, {activePage}) {
        console.log(activePage);
        setCurrentPageNumber(activePage)
    }

    if (location.pathname === '/admin/gifts') {

        let giftList = store.getState().gifts;
        if (giftList.size === 0) {
            getAllGifts();
            giftList = store.getState().gifts
        }
        let gifts = [];
        for (let i = 0; i < giftList.size; i++) {
            gifts.push(giftList.get(i))
        }

        const itemPerPage = 7;
        const page = getCurrentPageNumber();
        console.log("Page ", page);
        const totalPages = Math.ceil(gifts.length / itemPerPage);
        gifts = gifts.slice((page - 1) * itemPerPage, (page - 1) * itemPerPage + itemPerPage)
        console.log("on page ", page, " ", gifts);

        console.log(gifts);
        return (
            <div>
                <table className="ui orange table">
                    <thead key='head'>
                    <tr>
                        <th>#</th>
                        <th>Gift Name</th>
                        <th>Seller Id</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody key='body'>
                    {gifts.map((gift, index) =>
                                   <tr key={index + 3}>
                                       <td>{index + 1}</td>
                                       <td>{gift.name}</td>
                                       <td>{gift.Seller}</td>
                                       <td>
                                           <button key={index + 8}><i className="eye icon"
                                                                      onClick={() => {
                                                                          toggleModal();
                                                                          setSelectedGift(gift._id);
                                                                          setModalNumber(2);
                                                                          setView("View Gift")
                                                                      }}/></button>
                                           &nbsp;&nbsp;
                                           <button key={index + 9}><i
                                               className="blue pencil alternate icon"
                                               onClick={() => {
                                                   toggleModal();
                                                   setSelectedGift(gift._id);
                                                   setModalNumber(2);
                                                   setView("Edit Gift")
                                               }}/></button>
                                           &nbsp;&nbsp;
                                           <button key={index + 10}><i
                                               className="red trash alternate icon" onClick={() => {
                                               toggleModal();
                                               setSelectedGift(gift._id);
                                               setModalNumber(3)
                                           }}/></button>
                                       </td>
                                   </tr>
                    )}
                    </tbody>
                </table>
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
    } else {
        return <div></div>
    }
}

function UserList(param) {
    let {toggleModal} = param;
    let {setSelectedUser} = param;
    let {setModalNumber} = param;
    let {setSelectedUserRole} = param;
    let {getSelectedUserRole} = param;
    let {setCurrentPageNumber} = param;
    let {getCurrentPageNumber} = param;

    let location = useLocation();
    console.log("in UserList");
    if (location.pathname === '/admin/usernames') {
        console.log(location);
        let userList = store.getState().users;
        if (userList.size === 0) {
            getAllUsers();
            userList = store.getState().users;
        }

        function setPageNumber(e, {activePage}) {
            console.log(activePage);
            setCurrentPageNumber(activePage)
        }

        let users = [];
        for (let i = 0; i < userList.size; i++) {
            users.push(userList.get(i))
        }
        console.log(users);
        const itemPerPage = 7;
        const page = getCurrentPageNumber();
        const totalPages = Math.ceil(users.length / itemPerPage);
        users = users.slice((page - 1) * itemPerPage, (page - 1) * itemPerPage + itemPerPage)
        console.log("on page ", page, " ", users);

        return (
            <div>
                <table className="ui orange table">
                    <thead key='head'>
                    <tr>
                        <th>#</th>
                        <th>UserName</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>

                    </thead>
                    <tbody key='body'>
                    {users.map((user, index) =>
                                   <tr key={index + 2}>
                                       <td>{index + 1}</td>
                                       <td>{user.username}</td>
                                       <td>{user.role}</td>
                                       <td>
                                           <button key={index + 3} onClick={() => {
                                               toggleModal();
                                               setSelectedUser(user._id);
                                               setModalNumber(4)
                                           }}><i className="eye icon"/></button>
                                           &nbsp;&nbsp;
                                           <button key={index + 4} onClick={() => {
                                               toggleModal();
                                               setSelectedUser(user._id);
                                               setModalNumber(5)
                                           }}><i className="blue pencil alternate icon"/></button>
                                           &nbsp;&nbsp;
                                           <button key={index + 5} onClick={() => {
                                               toggleModal();
                                               setSelectedUser(user._id);
                                               setSelectedUserRole(user.role);
                                               setModalNumber(6)
                                           }}><i className="red trash alternate icon"/></button>
                                       </td>
                                   </tr>
                    )}
                    </tbody>
                </table>
                <button className="ui button" onClick={() => {
                    toggleModal();
                    setModalNumber(12)
                }}>
                    <i className="green plus icon"/>Add New User
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
    } else {
        return (<div></div>)
    }
}

export default AdminPanel;