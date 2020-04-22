import {Button} from "semantic-ui-react";
import React from "react";
import Modal from "react-bootstrap/Modal";
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {OnSubmitLogin} from './Creator';
import background from "../images/cat.jpeg";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: true,
            redirect: null,
            error: '',
            role: ''
        }
    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen});
        const path = "/";
        this.redirect(path);
    }

    redirect(path) {
        console.log(path);
        console.log("setting state");
        this.setState({redirect: path, isModalOpen: false});

    }

    componentWillUnmount() {
        console.log(" Login is unmounted")
    }

    setError(msg) {
        this.setState({error: msg})
    }

    handleOnChange(env) {
        this.props.dispatch({
                                type: "CHANGE_LOGIN",
                                data: env
                            }
        )
    }

    render() {
        // console.log(this.props);
        console.log("in login");
        console.log(this.state);
        if (this.state.redirect) {
            console.log("redirecting to from login");
            return <Redirect to={this.state.redirect}/>
        } else {

            return (

                <div>
                    <img src={background}
                         className="img-fluid"
                         alt='image'/>
                    <Modal show={this.state.isModalOpen}>
                        <Modal.Header>
                            <Modal.Title>Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="ui form">
                                <div className="field">
                                    <label>Username</label>
                                    <div className="ui left icon input">
                                        <input type="text" placeholder="Username"
                                               onChange={evnt => this.handleOnChange(
                                                   {username: evnt.target.value})}/>
                                        <i className="user icon"/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label>Password</label>
                                    <div className="ui left icon input">
                                        <input type="password"
                                               onChange={evnt => this.handleOnChange(
                                                   {password: evnt.target.value})}/>
                                        <i className="lock icon"/>
                                    </div>

                                </div>

                                <div className="field">
                                    <label>Role</label>
                                    <select className="ui dropdown"
                                            onChange={evnt => this.handleOnChange(
                                                {role: evnt.target.value})}>
                                        <option value="">Select option</option>
                                        <option value="Buyer">Buyer</option>
                                        <option value="Seller">Seller</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>

                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="ui blue submit button" variant="secondary"
                                    onClick={() => OnSubmitLogin(this)}>
                                Submit
                            </Button>
                            <Button className="ui blue submit button" variant="primary"
                                    onClick={() => this.toggleModal()}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }
    }
}

function state2props(state) {
    console.log("state2props");
    return state.login;
}

export default connect(state2props)(Login);