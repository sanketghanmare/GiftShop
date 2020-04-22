import React from 'react'
import {deleteNotification, getNotifications} from "./Creator";
import store from "../store";
import ModalView from "./ModelView";
import {Pagination} from "semantic-ui-react";

class BuyerNotification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications : [],
            ModalIsOpen : false
        }
    }

    async componentDidMount() {
        await getNotifications();
        await this.setNotifications();
    }


    setNotifications() {
        let notifications = store.getState().notifications
        let allNotifications = []
        console.log(notifications)
        for(let j = 0; j < notifications.size; j++){
            allNotifications.push(notifications.get(j))
        }
        this.setState({notifications : allNotifications})
    }


    toggleModal(){
        console.log("toggling")
        this.setState({ModalIsOpen : !(this.state.ModalIsOpen)})
    }

    setIsNotification(){
        this.setState({isNotification : true})
    }

    getIsNotification(){
        return this.state.isNotification
    }

    setGift(gift){
        this.setState({newGift : gift})
    }

    getGift(){
        return this.state.newGift
    }

    setImageData(imageData) {
        this.setState({imageData: imageData})
    }

    getImageData() {
        return this.state.imageData;
    }

    getModalIsOpen(){
        return this.state.ModalIsOpen;
    }

    getModalNumber(){
        return this.state.ModalNumber;
    }

    setModalNumber(number){
        this.setState({ModalNumber:number})
    }


    setSelectedGift(giftId){
        this.setState({selectedGift:giftId})
    }

    getSelectedGift(){
        return this.state.selectedGift;
    }

    setSellerName(name){
        this.setState({sellerName : name})
    }
    
    getSellerName(){
        return this.state.sellerName;
    }
    
    setNotificationId(notificationId){
        this.setState({notificationId : notificationId})
    }

    getNotificationId() {
        return this.state.notificationId;
    }

    setCurrentPage(activePage){
        this.setState({currentPage : activePage})
    }


    render() {
        console.log(this.state)
        let notifications = this.state.notifications;

        const itemPerPage = 7;
        const page = this.state.currentPage;
        console.log("Page ", page)
        const totalPages = Math.ceil(notifications.length / itemPerPage);

        return(
            <div className="notifications">
                <div className="ui divider"/>
                <h3>Notifications</h3>
                <div className="ui divider"/>
                <div className="ui items">
                    <table>
                    {notifications.map ((notification,index) =>
                        <tr>
                            <td>
                         <div className="ui feed">
                                  <div className="event">
                                  <div className="label">
                                     <img src={notification.imageData} width="50px" height="50px"/>
                                  </div>
                                  <div className="content">
                                      {notification.sellerName} has added new gift : {notification.newGift.name}
                                  </div>


                               </div>

                         </div>
                            </td>
                        <td>
                            <div className="extra content">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button key={index+3} className="ui linkedin button"
                                        onClick={()=> {
                                            this.setModalNumber(7);
                                            this.toggleModal();
                                            this.setSelectedGift(notification.newGift._id);
                                            this.setIsNotification();
                                            this.setGift(notification.newGift);
                                            this.setImageData(notification.imageData)
                                            this.setSellerName(notification.sellerName)
                                            this.setNotificationId(notification._id)
                                        }}>
                                    View Gift
                                </button>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <button key={index+4} className="ui twitter button" onClick={async() => {
                                    await deleteNotification(notification._id)
                                    await this.setNotifications()
                                }
                                }>Discard</button>&nbsp;&nbsp;
                                {/*<button key={index+5} className="ui youtube button">Unsubscribe</button>*/}
                            </div>
                        </td>
                        </tr>
                    )}
                    </table>
                </div>
                <ModalView getModalNumber ={this.getModalNumber.bind(this)}
                           getModalIsOpen ={this.getModalIsOpen.bind(this)}
                           getImageData = {this.getImageData.bind(this)}
                           getGift = {this.getGift.bind(this)}
                           getNotificationId = {this.getNotificationId.bind(this)}
                           getIsNotification = {this.getIsNotification.bind(this)}
                           getSellerName = {this.getSellerName.bind(this)}
                           getSelectedGift={this.getSelectedGift.bind(this)}
                           setNotifications = {this.setNotifications.bind(this)}
                           toggleModal = {this.toggleModal.bind(this)}
                />


            </div>
        );
    }
}

export default BuyerNotification