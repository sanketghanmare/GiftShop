import React from "react";
import {Redirect} from "react-router-dom";
import './app.css'
import {Dropdown, Menu} from "semantic-ui-react";

class Register extends React.Component{

  state = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        street1 : '',
        street2: '',
        city : '',
        State: '',
        zip : '',
        cardType: '',
        cardNumber: '',
        cvc: '',
        confirmPassword : '',
        redirect: ''
  }

  handleSubmit(evt){
    evt.preventDefault();
    console.log("submitting")
    console.log(this.state)

    if(this.state.username.length === 0 || this.state.firstName.length === 0 || this.state.lastName.length ===0
    || this.state.street1.length === 0 || this.state.length === 0 || this.state.city.length === 0
    || this.state.State.length === 0) {
        alert("Please Provide Required Information!!");
    }

    if(this.state.password === this.state.confirmPassword) {
      fetch("/register", {
        method: 'POST',
        body: JSON.stringify({
                               username: this.state.username,
                               password: this.state.password,
                               firstName: this.state.firstName,
                               lastName: this.state.lastName,
                               street1: this.state.street1,
                               street2: this.state.street2,
                               city: this.state.city,
                               State: this.state.State,
                               zip: this.state.zip,
                               cardNumber: this.state.cardNumber,
                               cvc: this.state.cvc,
                               role : 'Buyer',
                               subscriptions : []
                             }),
        headers: {
          'content-type': 'application/json'
        }
      }).then(response => response.json())
          .then(res => console.log(res))
      this.setState({redirect:'/'})
    }
    else
      alert("Passwords do not match")
  }


  render(){
    console.log(this.state);
    if(this.state.redirect)
        return <Redirect to={this.state.redirect}/>
    return(
        <div className="register">
          <div className="ui orange segment">
            <h4 className="ui header">Buyer Registration</h4>
          </div>

        <form className="ui form">
          <div className="field">
              <h4 className="ui dividing header">Name*</h4>
            <div className="two fields">
              <div className="six wide field">
                <input type="text" name="first-name" placeholder="First Name" onChange={(e) => this.setState({firstName: e.target.value})}/>
              </div>
              <div className="six wide field">
              <input type="text" name="last-name" placeholder="Last Name" onChange={(e) => this.setState({lastName: e.target.value})}/>
              </div>
            </div>
            <div className="three fields">
              <div className="four wide field">
                <input type="text" name="username" placeholder="Username" onChange={(e) => this.setState({username: e.target.value})}/>
              </div>
              <div className="four wide field">
                <input type="password" name="password" placeholder="Password" minLength="8" onChange={(e) => this.setState({password: e.target.value})}/>
              </div>

              <div className="four wide field">
                <input type="password" name="confirmPassword" placeholder="Confirm Password" minLength="16" onChange={(e) => this.setState({confirmPassword : e.target.value})}/>
              </div>
            </div>
            <div>
                </div>
          </div>

          <div className="field">
            <h4 className="ui dividing header">Shipping Address*</h4>
            <div className="two fields">
              <div className="six wide field">
                <input type="text" name="street1" placeholder="Street 1" onChange={(e) => this.setState({street1: e.target.value})}/>
              </div>
              <div className="six wide field">
                <input type="text" name="street2" placeholder="Street 2" onChange={(e) => this.setState({street2: e.target.value})}/>
              </div>
            </div>

            <div className="three fields">
              <div className="four wide field">
            <input type="text" name="city" placeholder="City" onChange={(e) => this.setState({city: e.target.value})}/>
              </div>
              <div className="four wide field">
            <input type="text" name="state" placeholder="State" onChange={(e) => this.setState({State: e.target.value})}/>
              </div>
              <div className="four wide field">
              <input type="text" name="ZipCode" placeholder="ZipCode" onChange={(e) => this.setState({zip: e.target.value})}/>
              </div>
            </div>

          </div>
          <div className="field">
            <h4 className="ui dividing header">Billing Information</h4>
            <div className="six wide field">
              <label>Card Type</label>

                <select className="ui dropdown" placeholder="Card Type" onChange={ e =>this.setState({cardType: e.target.value})}>
                    <option value="Visa" >Visa</option>
                    <option value="American Express">American Express</option>
                    <option value="Discover">Discover</option>
                </select>
            </div>


              <div className="two fields">
                <div className="four wide field">
                  <label>Card Number</label>
                  <input type="text" name="card[number]" maxLength="16"
                         placeholder="Card #" onChange={(e) => this.setState({cardNumber: e.target.value})}/>
                </div>
                <div className="two wide field">
                  <label>CVC</label>
                  <input type="text" name="card[cvc]" maxLength="3" placeholder="CVC" onChange={(e) => this.setState({cvc: e.target.value})}/>
                </div>
              </div>

          </div>
          <button className="ui blue button" type="submit" onClick={this.handleSubmit.bind(this)}>Submit</button>

        </form>
        </div>
    );
  }
}

export default Register;