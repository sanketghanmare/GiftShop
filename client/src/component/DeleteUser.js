import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "semantic-ui-react";
import {deleteUser} from "./Creator";

class DeleteUser extends React.Component{

  toggleModal(){
    this.props.toggleModal();
  }

  getSelectedUser(){
    return this.props.getSelectedUser();
  }

  render() {
    //console.log(this.props.getDeleteGift())

    return (
        <div>
          <Modal.Header >
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="ui form">
              <div className="field">
                <label>Do you really want to delete?</label>
              </div>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button className="ui blue submit button" variant="secondary" onClick={async ()=>{await deleteUser( this.getSelectedUser(), this.props.getSelectedUserRole())
              await this.toggleModal()
            }}>
              Confirm
            </Button>
            <Button className="ui blue submit button" variant="primary" onClick = {()=>this.toggleModal()}>
              Cancel
            </Button>
          </Modal.Footer>
        </div>
    );
  }
}
export default DeleteUser;