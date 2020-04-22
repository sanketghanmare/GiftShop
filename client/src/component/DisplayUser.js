import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Checkbox} from "semantic-ui-react";
import {addGifts, editGifts} from "./Creator";
import {connect} from "react-redux";
import store from "../store";

class DisplayUser extends React.Component{

  constructor(props){
    super(props)
    let gift = new Map();

    this.state = {
    }

    console.log(this.props);
  }

  componentDidMount() {
    let allusers = this.props.users
for(let i = 0 ;i<allusers.size;i++){
  if(allusers.get(i)._id === this.props.getSelectedUser()){
    this.setState({
      id:allusers.get(i)._id,
      firstName:allusers.get(i).firstName,
      lastName:allusers.get(i).lastName,
      username:allusers.get(i).username,
      role:allusers.get(i).role,
      street1:allusers.get(i).street1,
      city:allusers.get(i).city,
      State:allusers.get(i).State,
      zip:allusers.get(i).zip
    })
    break;
  }
}

  }

  toggleModal(){
    this.props.toggleModal();
  }


  render(){
    let selectedUser = this.props.selectedUser;
    console.log(this.state);
    return (
        <div>
          <Modal.Header>
            <Modal.Title>Display User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="ui form">
              <div className="field">
                <h4 className="ui dividing header">Name</h4>
                <div className="two fields">
                  <div className="six wide field">
                    <label>Firstname : {this.state.firstName} </label>
                  </div>
                  <div className="six wide field">
                    <label>Lastname : {this.state.lastName}</label>
                  </div>
                </div>
                <div className="two fields">
                  <div className="six wide field">
                    <label>Username : {this.state.username}</label>
                  </div>
                  <div className="six wide field">
                    <label>Role: {this.state.role}</label>
                  </div>
                </div>
            </div>

              <div className="field">
                <h4 className="ui dividing header">Address</h4>
                <div className="two fields">
                  <div className="six wide field">
                    <label>Street: {this.state.street1} </label>
                  </div>
                  <div className="six wide field">
                    <label>City : {this.state.city}</label>
                  </div>
                </div>

                <div className="two fields">
                  <div className="six wide field">
                    <label>State : {this.state.State}</label>
                  </div>
                  <div className="six wide field">
                    <label>Zip: {this.state.zip}</label>
                  </div>
                </div>
              </div>

            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button className="ui blue submit button" variant="secondary"
                    onClick={ async()=>await this.toggleModal()}>
              OK
            </Button>

          </Modal.Footer>
        </div>
    )
  }

}

function mapStateToProps(state) {
  return state;
}
export default connect (mapStateToProps)(DisplayUser);