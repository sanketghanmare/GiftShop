import React from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "semantic-ui-react";
import {OnSubmitLogin} from "./Creator";
import AddGift from "./AddGift";
import AddCategory from "./AddCategory";
import EditGift from "./EditGift"
import DeleteGift from "./DeleteGift";
import DisplayUser from "./DisplayUser";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import GiftDetails from "./GiftDetails"
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
import Checkout from "./Checkout";
import AddSeller from "./AddSeller";
import UpdateOrderStatus from "./UpdateOrderStatus";

class ModalView extends React.Component{

  constructor(props){
    super(props)

  }

  // DeleteGift(){
  //   return(
  //       <div className="ui form">
  //         <label>Do you really want to delete?</label>
  //       </div>
  //   )
  // }
  //
  // AddGift(){
  //   return(<div className="ui form">
  //     <div className="field">
  //       <label>Name</label>
  //       <div className="ui left icon input">
  //         <input type="text" placeholder="Giftname"/>
  //         <i className="user icon"></i>
  //       </div>
  //     </div>
  //     <div className="field">
  //       <label>DeliveryInDays</label>
  //       <div className="ui left icon input">
  //         <input type="text" />
  //         <i className="lock icon"></i>
  //       </div>
  //     </div>
  //     <div className="field">
  //       <label>AvailableQuantity</label>
  //       <div className="ui left icon input">
  //         <input type="text" />
  //         <i className="lock icon"></i>
  //       </div>
  //     </div>
  //     <div className="field">
  //       <div className="ui right icon input">
  //         <input type="file" name = "imageData" id="imageData" />
  //         <i className="file image large icon"/>
  //       </div>
  //     </div>
  //
  //   </div>)
  // }
  //
  // EditGift(){
  //   return(<div className="ui form">
  //     <div className="field">
  //       <label>Name</label>
  //       <div className="ui left icon input">
  //         <input type="text" placeholder="Giftname"/>
  //         <i className="user icon"></i>
  //       </div>
  //     </div>
  //     <div className="field">
  //       <label>DeliveryInDays</label>
  //       <div className="ui left icon input">
  //         <input type="text" />
  //         <i className="lock icon"></i>
  //       </div>
  //     </div>
  //     <div className="field">
  //       <label>AvailableQuantity</label>
  //       <div className="ui left icon input">
  //         <input type="text" />
  //         <i className="lock icon"></i>
  //       </div>
  //     </div>
  //     <div className="field">
  //       <div className="ui right icon input">
  //         <input type="file" name = "imageData" id="imageData" />
  //         <i className="file image large icon"/>
  //       </div>
  //     </div>
  //
  //   </div>)
  // }

  render() {
    console.log(this.props)
    console.log(this.props.getModalIsOpen())
    console.log(this.props.getModalNumber())
    let body; //=(()=><div></div>)
    if (this.props.getModalIsOpen()){

      switch(this.props.getModalNumber()){
        case 1:body=<AddGift toggleModal = {this.props.toggleModal.bind(this)}/>
          break;
        case 2:body= <EditGift getView={this.props.getView.bind(this)}
            getEditGift={this.props.getEditGift.bind(this)}    toggleModal = {this.props.toggleModal.bind(this)}/>
          break;
        case 3:console.log("I am delete")
          body= <DeleteGift getDeleteGift={this.props.getDeleteGift.bind(this)}
              toggleModal = {this.props.toggleModal.bind(this)}/>
          break;
        default:console.log("I am here")
        case 4:
          body=<DisplayUser getSelectedUser={this.props.getSelectedUser.bind(this)}
                           toggleModal = {this.props.toggleModal.bind(this)}/>
          break;

        case 5 :
          body=<EditUser
              getSelectedUser={this.props.getSelectedUser.bind(this)}
                         toggleModal = {this.props.toggleModal.bind(this)}/>
                         break;

        case 6:
          body = <DeleteUser getSelectedUser={this.props.getSelectedUser.bind(this)}
                             getSelectedUserRole={this.props.getSelectedUserRole.bind(this)}
                             toggleModal = {this.props.toggleModal.bind(this)}/>
           break;
        case 7:
          body =<GiftDetails getSelectedGift={this.props.getSelectedGift}
              toggleModal = {this.props.toggleModal.bind(this)}
              getGift = {this.props.getGift}
              getImageData = {this.props.getImageData}
              getIsNotification = {this.props.getIsNotification} 
              getSellerName = {this.props.getSellerName}
              getNotificationId = {this.props.getNotificationId} 
              setNotifications = {this.props.setNotifications}              
              />
          break;

        case 8 :
          body = <AddCategory toggleModal = {this.props.toggleModal.bind(this)}/>
              break;

        case 9 :
          body = <EditCategory getSelectedCategory = {this.props.getSelectedCategory.bind(this)}
                               toggleModal = {this.props.toggleModal.bind(this)}/>
          break;

        case 10:
          body = <DeleteCategory getSelectedCategory = {this.props.getSelectedCategory.bind(this)}
                                 toggleModal = {this.props.toggleModal.bind(this)}/>
          break;

        case 11:
          body = <Checkout toggleModal = {this.props.toggleModal.bind(this)}
          getMyCartState = {this.props.getMyCartState.bind(this)}
          />
          break;

        case 12:
          body = <AddSeller toggleModal = {this.props.toggleModal.bind(this)}/>
          break;
        case 13:
          body = <UpdateOrderStatus toggleModal = {this.props.toggleModal.bind(this)}
                                    getSelectedOrder = {this.props.getSelectedOrder.bind(this)}
          />
          break;
      }

    }

      return (
          <Modal show={this.props.getModalIsOpen()}>
            {body}
            {/*<AddGift toggleModal = {this.props.toggleModal.bind(this)}/>*/}
            {/*<Modal.Header>*/}
            {/*  <Modal.Title>Add Gift</Modal.Title>*/}
            {/*</Modal.Header>*/}
            {/*<Modal.Body>*/}
            {/*  {body}*/}
            {/*</Modal.Body>*/}
            {/*<Modal.Footer>*/}
            {/*  <Button className="ui blue submit button" variant="secondary">*/}
            {/*    Confirm*/}
            {/*  </Button>*/}
            {/*  <Button className="ui blue submit button" variant="primary" onClick = {()=>this.props.toggleModal()}>*/}
            {/*    Cancel*/}
            {/*  </Button>*/}
            {/*</Modal.Footer>*/}
          </Modal>
      )

    }




}

export default ModalView;