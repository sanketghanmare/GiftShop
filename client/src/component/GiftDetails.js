import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Checkbox} from "semantic-ui-react";
import {addToGiftBasket, deleteNotification, subscribe} from "./Creator";
import {connect} from "react-redux";
import store from "../store";

class GiftDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state= {
      quantity: ''
    }
  }

  toggleModal() {
    this.props.toggleModal();
  }


  componentDidMount() {

      console.log(this.props)
      if (this.props.getIsNotification()) {
          console.log("this is a notification gift")
          let gift = this.props.getGift()
          let imageData = this.props.getImageData()
          let sellerName = this.props.getSellerName()
          this.setState({
                            _id: gift._id,
                            name: gift.name,
                            deliveryInDays: gift.deliveryInDays,
                            availableQuantity: gift.availableQuantity,
                            imageName: gift.imageName,
                            Seller: sellerName,
                            imageData: imageData,
                            price: gift.price
                        })
          console.log(this.props.getGift());
        }
            else {
                  let allgifts = this.props.gifts;
                  console.log(this.props)
                  console.log(this.props.getSelectedGift())
                  console.log(allgifts)
                  let SelectedGift = this.props.getSelectedGift()

                  for (let j = 0; j < allgifts.size; j++) {
                      console.log(allgifts.get(j));
                      if (allgifts.get(j)._id === SelectedGift) {
                          console.log(allgifts.get(j).Seller.firstName + " " + allgifts.get(
                              j).Seller.lastName)
                          this.setState({
                                            _id: allgifts.get(j)._id,
                                            name: allgifts.get(j).name,
                                            deliveryInDays: allgifts.get(j).deliveryInDays,
                                            availableQuantity: allgifts.get(j).availableQuantity,
                                            imageName: allgifts.get(j).imageName,
                                            sellerId : allgifts.get(j).Seller._id,
                                            Seller: allgifts.get(j).Seller.firstName + " "
                                                    + allgifts.get(j).Seller.lastName,
                                            imageData: allgifts.get(j).imageData,
                                            price: allgifts.get(j).price
                                        })
                          break;
                      }
                  }
              }

          }


   async handleNotificationDelete(){
      if(this.props.getIsNotification()){
            console.log(this.props.getNotificationId())
            await deleteNotification(this.props.getNotificationId())
            await this.props.setNotifications()
      }
    }

  render() {
    console.log(this.state)
    return (
        <div>
          <Modal.Header>
            <Modal.Title>Gift Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="ui two column very relaxed stackable grid">
              <div className="middle aligned column" >
                <img src={this.state.imageData} alt="no image"  width='200px' height='200px'/>
              </div>
              <div className="middle aligned column">
            <div className="ui form">

                <div className="one field">
                  <div className="field">
                    <h3 className="ui header">
                    <label>GiftName : {this.state.name} </label>
                    </h3>
                  </div>
                </div>

                <div className="one fields">
                  <div className="field">
                    <h3 className="ui header">
                    <label>Availability : {this.state.availableQuantity} </label>
                    </h3>
                  </div>
                </div>
                <div className="one field">
                  <div className="field">
                    <h3 className="ui header">
                    <label>Delivery In Days : {this.state.deliveryInDays}</label>
                    </h3>
                  </div>
                </div>
                <div className="one fields">
                <div className="field">
                  <h3 className="ui header">
                  <label>Price : {this.state.price} </label>
                  </h3>
                </div>
                </div>
              <div className="one fields">
                <div className="field">
                  <h3 className="ui header">
                    <label>Sold By : {this.state.Seller} </label>
                  </h3>
                </div>
              </div>
              <div className="one fields">
                <div className="field">
                  <h3 className="ui header">
                    <label>Quantity :  </label>
                    <input type="text" placeholder="" value={this.state.quantity} onChange={(e) => this.setState({quantity: e.target.value})}/>
                  </h3>
                </div>
              </div>


              </div>
              </div>

            </div>

              <div className="ui vertical divider"><i className="orange gift icon"/></div>




          </Modal.Body>
          <Modal.Footer>
            <Button className="ui green submit button" variant="secondary"
                    onClick={ async()=> {await addToGiftBasket(this.state)
                        await this.handleNotificationDelete()
                    await alert("added to shopping list");
                    await this.toggleModal()}}>
              Add to Gift Basket
            </Button>
            <Button className="ui green submit button" variant="secondary"
                    onClick={ async()=> {await subscribe(this.state.sellerId); await this.toggleModal()}}
                    disabled={this.props.getIsNotification()}>
              Subscribe
            </Button>
            <Button className="ui red cancel button" variant="secondary"
                    onClick={ async()=>await this.toggleModal()}>
              Cancel
            </Button>


          </Modal.Footer>
        </div>
    )


  }
}


function mapStateToProps(state){
  return state;
}
export default connect (mapStateToProps)(GiftDetails);



