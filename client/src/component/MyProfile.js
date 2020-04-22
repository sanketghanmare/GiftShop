import React from "react";
import {connect} from "react-redux";
import {editProfile, editUser} from "./Creator";
import store from '../store'

class MyProfile extends React.Component{

  constructor(props) {
    super(props)
    //let user = new Map();
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
      roleSelected: new Map(),
      isPasswordChanged : false
    }
  }

  componentDidMount() {
console.log("MyProdile",this.props)
    // for(let j = 0 ;j<this.props.users.size;j++) {
    //   if(this.props.users.get(j)._id=== this.props.getSelectedUser()) {
    //     let currentUser = this.props.users.get(j)
    //     let roleSelected = new Map();
    //     roleSelected.set('Buyer', false);
    //     roleSelected.set('Seller', false);
    //     roleSelected.set('Admin', false);
    //     roleSelected.set(currentUser.role, true)
    //
    //     this.setState({
    //       _id : currentUser._id,
    //       firstName : currentUser.firstName,
    //       lastName : currentUser.lastName,
    //       username : currentUser.username,
    //       role : currentUser.role,
    //       street1 : currentUser.street1,
    //       street2 : currentUser.street2,
    //       city : currentUser.city,
    //       State : currentUser.State,
    //       zip : currentUser.zip,
    //       roleSelected : roleSelected
    //     })
    //     break;
    //   }
    // }
    let currentUser = this.props.userdetails.get(0)
    console.log(currentUser.username);
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
            cvc:currentUser.cvc,
            cardNumber: currentUser.cardNumber
          })

  }


  render() {
    console.log(this.state)
    return (
        <div>
          <div className="ui yellow raised segment profile">
            <p>
          <div className="ui form">
            <div className="field">
              {/*<h4 className="ui dividing header">Name</h4>*/}
              <div className="two fields">
                <div className="six wide field">
                  <label>FirstName :</label>
                  <input type="text" name="first-name" value={this.state.firstName} onChange={(e) => this.setState({firstName: e.target.value})}/>
                </div>
                <div className="six wide field">
                  <label>LastName :</label>
                  <input type="text" name="last-name" value={this.state.lastName} onChange={(e) => this.setState({lastName: e.target.value})}/>
                </div>
              </div>
              <div className="two fields">
                <div className="six wide field">
                  <label>Username :</label>
                  <input type="text" name="user-name" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}/>
                </div>
                <div className="six wide field">
                  <label>Password :</label>
                  <input type="password" name="password" placeholder="Password" minLength="8" onChange={(e) => this.setState({password: e.target.value, isPasswordChanged : true})}/>
                  {/*<input type="text" name="role" value={this.state.role} onChange={(e) => this.setState({role: e.target.value})}/>*/}
                </div>
              </div>
            </div>

            <div className="field">
              {/*<h4 className="ui dividing header">Address</h4>*/}
              <div className="two fields">
                <div className="six wide field">
                  <label>Street1 :</label>
                  <input type="text" name="street1" value={this.state.street1} onChange={(e) => this.setState({street1: e.target.value})}/>
                </div>
                <div className="six wide field">
                  <label>City :</label>
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


                {/*<h4 className="ui dividing header">Billing Information</h4>*/}
                <div className="three fields">
                <div className="four wide field">
                  <label>Card Type</label>

                  <select className="ui dropdown" placeholder="Card Type" onChange={ e =>this.setState({cardType: e.target.value})}>
                    <option value="Visa" >Visa</option>
                    <option value="American Express">American Express</option>
                    <option value="Discover">Discover</option>
                  </select>
                </div>


                <div className="four wide field">
                  <label>Card Number</label>
                  <input type="text" name="card[number]" value={this.state.cardNumber} maxLength="16"
                         placeholder="Card #" onChange={(e) => this.setState({cardNumber: e.target.value})}/>
                </div>

                <div className="two wide field">
                  <label>CVC</label>
                  <input type="text" name="card[cvc]" value={this.state.cvc}  maxLength="3" placeholder="CVC" onChange={(e) => this.setState({cvc: e.target.value})}/>
                </div>
              </div>

              <h4 className="ui dividing header"></h4>
            </div>
            <button className="ui blue button" type="submit" onClick={async() => {await editProfile(this.state._id, this.state)
              await store.dispatch({type :"USER_DETAILS",data :this.state});  alert("Your Profile is Updated!!!!")}} >Submit</button>

            </div>
            </p>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(MyProfile)