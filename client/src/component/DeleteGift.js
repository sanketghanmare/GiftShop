import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "semantic-ui-react";
import {deleteGift} from "./Creator";

class DeleteGift extends React.Component{

  toggleModal(){
    this.props.toggleModal();
  }

  getDeleteGit(){
return this.props.getDeleteGift();
  }

  render() {
    console.log(this.props.getDeleteGift())

    return (
        <div>
          <Modal.Header >
            <Modal.Title>Delete Gift</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="ui form">
              <div className="field">
                <label>Do you really want to delete?</label>
            </div>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button className="ui blue submit button" variant="secondary" onClick={async ()=>{await deleteGift( this.getDeleteGit())
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
export default DeleteGift;