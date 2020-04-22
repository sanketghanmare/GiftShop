import React from 'react'
import Modal from "react-bootstrap/Modal";
import {Button} from "semantic-ui-react";
import {confirmCheckout, deleteGift} from "./Creator";
import store from '../store'

class Checkout extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      AddressEnable:'disabled field',
      NewAddress: '',
    }
  }

  toggleModal() {
    this.props.toggleModal();
  }

  toggleDeliverAddress(){
    console.log("delivery Adress toggle")
    if(this.state.AddressEnable === 'disabled field'){
      this.setState({AddressEnable:'enabled field'})
    }
    else{
      this.setState({AddressEnable: 'disabled field',
                        NewAddress:''})
    }

  }

  componentDidMount() {
    let userDetails = store.getState().userdetails.get(0)
    let address = userDetails.street1 + " " + userDetails.street2 + " " +
        userDetails.city + " " + userDetails.State + " " + userDetails.zip
       this.setState({NewAddress: address})
  }

  getNewAddress(){
    return this.state.NewAddress;
  }

  render() {
    return (

        <div>
          <Modal.Header>
            <Modal.Title >

                Checkout Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="ui form">
              <div className="field">
                <div className="two fields">
                  <div className="five wide field">
                <label>Default Address:</label>
                  </div>
                  <div className="five wide field">
                  <label>{store.getState().userdetails.get(0).street1}</label>
                  <label>{store.getState().userdetails.get(0).street2}</label>
                  <label>{store.getState().userdetails.get(0).State}</label>
                  <label>{store.getState().userdetails.get(0).city}</label>
                  <label>{store.getState().userdetails.get(0).zip}</label>
                  </div>
                </div>

                <div className="inline field">
                  <div className="ui toggle checkbox">
                    <input type="checkbox" onChange={()=>{this.toggleDeliverAddress()}}>
                    </input>
                      <label>New Delivery Address</label>
                  </div>
                </div>

                <div className={this.state.AddressEnable}>
                <div className="one fields">
                    <div className="five wide field">

                    <label>New Delivery Address:</label>
                    </div>
                  <div className="five wide field">


                    <textarea row="5" column="8" value = {this.state.NewAddress} onChange={(e)=>{this.setState({NewAddress:e.target.value})}}></textarea>

                    </div>
                  </div>
                </div>

                <div className="field">

                  <label>* Please Note only Cash On Delivery Option Available</label>

                </div>

              </div>
            </div>

          </Modal.Body>
          <Modal.Footer>

            <Button className="ui blue submit button" variant="secondary"
                    onClick={async () => {
                      await confirmCheckout( this.props.getMyCartState(),this.state.NewAddress)
                      await this.toggleModal()
                    }}>
              Confirm
            </Button>
            <Button className="ui blue submit button" variant="primary"
                    onClick={() => this.toggleModal()}>
              Cancel
            </Button>
          </Modal.Footer>
        </div>
    )
  }

}

export default Checkout