import React from "react";
import {BrowserRouter, NavLink, Route, useLocation} from "react-router-dom";
import {Dropdown, Icon, Menu, Sidebar, Segment} from "semantic-ui-react";
import Home from './Home'
import Login from './Login'
import Register from './Register'
import {Switch} from "react-bootstrap";
import store  from "../store";
import Buyer from "./Buyer";
import {connect} from "react-redux";
import {logout} from "./Creator";
import Seller from './Seller';
import MyProfile from "./MyProfile";
import AboutUs from './AboutUs'
import Admin from "./Admin";
import WelcomeBuyer from "./WelcomeBuyer";
import MyCart from "./MyCart";
import BuyerHistory from "./BuyerHistory";
import BuyerNotification from "./BuyerNotification";

class Page extends React.Component{
  constructor(props){
    super(props);
    this.state={login : false,
    home : '/'
    }

  }

  ontogglelogin(){
    this.setState({login: !(this.state.login)})

    //this.setState({})
  }

  getLogin(){
    return this.state.login;
  }
  rerender(){
    this.setState({path:'/'})
  }

  update(){
    console.log(this.props);
    return this.props;
  }
  render(){

    console.log("In render")
    console.log(this.props);
    return (

        <BrowserRouter>

            <Menu pointing attached inverted>
              <Menu.Menu>
                <Menu.Item>
                  <NavLink to={'/'+store.getState().login.role} >
                    <Icon className='large orange gift'/>Giftshop
                  </NavLink>
                </Menu.Item>
                <Menu.Item>
                  <NavLink to='/about' >About</NavLink>
                </Menu.Item>
              </Menu.Menu>
                <Session />
            </Menu>

              <NavigateTo togglelogin ={this.ontogglelogin.bind(this)} getlogin={this.getLogin.bind(this)}/>

        </BrowserRouter>

    )
  }

}



function NavigateTo(params){
  let {togglelogin} = params;
  let {getlogin} = params;
  let login = store.getState().login;
  let login_store = store.getState().login.authenticated;
  let location = useLocation();
  console.log(location);
  console.log(store.getState().login.authenticated);
  console.log(getlogin());
  if(login_store=== ''){
    login_store = false;
  }

  if( login_store !== getlogin()){
    togglelogin();
  }

      if(!login_store) {
        return(
        <div>
          <Switch >
            <Route exact path='/' component={() => <Home/>}/>
            <BrowserRouter exact path = '/about' component = {AboutUs}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
            <Route path='/logout' component={Home}/>
            <Route path='/about' component={()=><AboutUs/>}/>
          </Switch>
        </div>)
      }
      else {
        if(login.role === "Buyer"){
          console.log("Render Buyer");
          return(
          <div>
            <Switch>
              <Route exact path='/' component={() => <Buyer/>}/>
              <BrowserRouter exact path = '/about' component = {AboutUs}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/register' component={Register}/>
              <Route path='/logout' component={Home}/>
              <Route path='/about' component={()=><AboutUs/>}/>
              <Route path = '/Buyer' component ={()=><Buyer/>}/>

            </Switch>
          </div>)
        }

        else if(login.role === "Admin"){
          console.log("Render Amdin")
          return (
          <div>
            <Switch >
              <Route exact path='/' component={() => <Admin/>}/>
              <Route exact path = '/about' component = {()=><AboutUs/>}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/register' component={Register}/>
              <Route path='/Admin' component={() => <Admin/>}/>
              <Route path='/logout' component={Home}/>
            </Switch>
          </div>
          )
        }

        else if(login.role === 'Seller') {
          console.log("Render seller");
          // console.log(this.state)
          return(
              <div>
                <Switch >
                  <Route exact path='/' component={() => <Seller/>}/>
                  <Route exact path='/login' component={Login}/>
                  <Route exact path='/register' component={Register}/>
                  <Route path='/logout' component={Home}/>
                  <Route path='/Seller' component={() => <Seller/>}/>
                  <Route exact path = '/about' component = {()=><AboutUs/>}/>
                </Switch>
              </div>
          )
        }
      }


}


function Session(){

  let session =  store.getState();
  console.log("in session")
  console.log(session.login);

  if(session.login.authenticated) {

    // if (session.login.role === 'Buyer') {

      return (

          <Menu.Menu position='right'>
            <Menu.Item width='thin'>
              <NavLink to='/' onClick= {()=>{ (logout(store.getState().login)); }}>Logout</NavLink>

            </Menu.Item>
          </Menu.Menu>

      );
  }

    else{
    return (

        <Menu.Menu position='right'>
          <Menu.Item>
            <NavLink to='/login'>Login</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to='/register'>Register</NavLink>
          </Menu.Item>
        </Menu.Menu>

    );
  }



}
export default Page;
