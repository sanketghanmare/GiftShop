import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "semantic-ui-react";
import {deleteCategory} from "./Creator";

class DeleteCategory extends React.Component{

    toggleModal(){
        this.props.toggleModal();
    }

    getSelectedUser(){
        return this.props.getSelectedUser();
    }

    getSelectedCategory(){
        return this.props.getSelectedCategory();
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
                            <label>Do you really want to delete the category?</label>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button className="ui blue submit button" variant="secondary" onClick={async () => {await deleteCategory(this.getSelectedCategory())
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
export default DeleteCategory;