import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "semantic-ui-react";
import {addSeller, editUser} from "./Creator";

class AddSeller extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            firstName : '',
            lastName : '',
            username : '',
            password : '',
            street1 : '',
            city : '',
            State : '',
            zip : '',
            subscribers : [],
            role : 'Seller'
        }
    }

    componentDidMount() {

    }

    toggleModal() {
        this.props.toggleModal();
    }


    render() {
        console.log(this.state)
        return(
        <div>
            <Modal.Header>
                <Modal.Title>Add Seller</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="ui form">
                    <div className="field">
                        <h4 className="ui dividing header">Name*</h4>
                        <div className="two fields">
                            <div className="six wide field">
                                <input type="text" placeholder="first-name" value={this.state.firstName} onChange={(e) => this.setState({firstName: e.target.value})}/>
                            </div>
                            <div className="six wide field">
                                <input type="text" placeholder="last-name" value={this.state.lastName} onChange={(e) => this.setState({lastName: e.target.value})}/>
                            </div>
                        </div>

                        <div className="two fields">
                            <div className="six wide field">
                                <input type="text" placeholder="username" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}/>
                            </div>
                            <div className="six wide field">
                                <input type="password" name="password" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}/>
                            </div>
                        </div>

                        <div className="two fields">
                            <div className="eight wide field">
                                <select className="ui selection dropdown" placeholder="Role" onChange={(e) => this.setState({role : e.target.value})}>
                                    <option>Seller</option>
                                    <option>Admin</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <h4 className="ui dividing header">Address*</h4>
                        <div className="two fields">
                            <div className="six wide field">
                                <input type="text" placeholder="street1" value={this.state.street1} onChange={(e) => this.setState({street1: e.target.value})}/>
                            </div>
                            <div className="six wide field">
                                <input type="text" placeholder="city" value={this.state.city} onChange={(e) => this.setState({city: e.target.value})}/>
                            </div>
                        </div>

                        <div className="two fields">
                            <div className="six wide field">
                                <input type="text" placeholder="State" value={this.state.State} onChange={(e) => this.setState({State: e.target.value})}/>
                            </div>
                            <div className="six wide field">
                                <input type="text" placeholder="Zip" value={this.state.zip} onChange={(e) => this.setState({zip: e.target.value})}/>
                            </div>
                        </div>
                    </div>

                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button className="ui blue submit button" variant="secondary"
                        onClick={async() => {await addSeller(this.state); await this.toggleModal()}}>
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

export default AddSeller