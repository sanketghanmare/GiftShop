import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Checkbox} from "semantic-ui-react";
import {editGifts, editUser} from "./Creator";
import {connect} from "react-redux";
import store from "../store";

class EditUser extends React.Component{

  constructor(props){
    super(props)
    let user = new Map();

    this.state = {
      _id: '',
      firstName: '',
      lastName: '',
      username: '',
      role: '',
      street1: '',
      street2: '',
      city: '',
      State: '',
      zip: '',
      isRoleChanged: false,
      roleSelected: new Map()
    }

    console.log(this.props);
  }

  componentDidMount() {
    console.log(this.props)
    for(let j = 0 ;j<this.props.users.size;j++) {
      if(this.props.users.get(j)._id=== this.props.getSelectedUser()) {
        let currentUser = this.props.users.get(j)
        let roleSelected = new Map();
        roleSelected.set('Buyer', false);
        roleSelected.set('Seller', false);
        roleSelected.set('Admin', false);
        roleSelected.set(currentUser.role, true)

        this.setState({
          _id : currentUser._id,
          firstName : currentUser.firstName,
          lastName : currentUser.lastName,
          username : currentUser.username,
          role : currentUser.role,
          street1 : currentUser.street1,
          street2 : currentUser.street2,
          city : currentUser.city,
          State : currentUser.State,
          zip : currentUser.zip,
          roleSelected : roleSelected,
          oldRole : currentUser.role
        })
        break;
      }
    }
  }

  toggleModal() {
    this.props.toggleModal();
  }


  render(){

    console.log(this.state);
    return (
        <div>
          <Modal.Header>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="ui form">
              <div className="field">
                <h4 className="ui dividing header">Name</h4>
                <div className="two fields">
                  <div className="six wide field">
                    <input type="text" name="first-name" value={this.state.firstName} onChange={(e) => this.setState({firstName: e.target.value})}/>
                  </div>
                  <div className="six wide field">
                    <input type="text" name="last-name" value={this.state.lastName} onChange={(e) => this.setState({lastName: e.target.value})}/>
                  </div>
                </div>
                <div className="two fields">
                  <div className="six wide field">
                    <input type="text" name="user-name" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}/>
                  </div>
                  <div className="six wide field">
                    <select className="ui selection dropdown" onChange={(e) => this.setState({role : e.target.value, isRoleChanged : true})}>
                      <option selected={this.state.roleSelected.get('Buyer')}>Buyer</option>
                      <option selected={this.state.roleSelected.get('Seller')}>Seller</option>
                      <option selected={this.state.roleSelected.get('Admin')}>Admin</option>
                    </select>
                    {/*<input type="text" name="role" value={this.state.role} onChange={(e) => this.setState({role: e.target.value})}/>*/}
                  </div>
                </div>
              </div>

              <div className="field">
                <h4 className="ui dividing header">Address</h4>
                <div className="two fields">
                  <div className="six wide field">
                    <input type="text" name="street1" value={this.state.street1} onChange={(e) => this.setState({street1: e.target.value})}/>
                  </div>
                  <div className="six wide field">
                    <input type="text" name="city" value={this.state.city} onChange={(e) => this.setState({city: e.target.value})}/>
                  </div>
                </div>

                <div className="two fields">
                  <div className="six wide field">
                    <label>State</label>
                    <input type="text" name="State" value={this.state.State} onChange={(e) => this.setState({State: e.target.value})}/>
                  </div>
                  <div className="six wide field">
                    <label>Zip</label>
                    <input type="text" name="Zip" value={this.state.zip} onChange={(e) => this.setState({zip: e.target.value})}/>
                  </div>
                </div>
              </div>

            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button className="ui blue submit button" variant="secondary"
                    onClick={async() => {await editUser(this.state._id, this.state); await this.toggleModal()}}>
              Save
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

function mapStateToProps(state) {
  return state;
}
export default connect (mapStateToProps)(EditUser);