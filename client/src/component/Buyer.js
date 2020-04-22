import React from "react";
import {Dropdown, Icon, Menu, Sidebar,Item} from "semantic-ui-react";
import {BrowserRouter, Link, NavLink, Redirect, Route} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import {Segment,} from "semantic-ui-react";
import './app.css'
import HomeSidebar from "./HomeSidebar";
class Buyer extends React.Component {

    getmenu(){
        return (
            <div>
                <Menu.Item as={Link} to='/buyer/profile'>
                    <i className='address book icon' ></i>
                    My Profile
                </Menu.Item>
                <Menu.Item as={Link} to='/buyer/cart'>
                    <i className='shopping cart icon'></i>
                    My Gift Basket
                </Menu.Item>
              <Menu.Item as={Link} to='/buyer/myorders'>
                <i className='warehouse icon'></i>
                My Orders
              </Menu.Item>

                {/*<Menu.Item as={Link} to='/buyer/history'>*/}
                {/*    <i className='history icon'></i>*/}
                {/*    History*/}
                {/*</Menu.Item>*/}
              <Menu.Item as={Link} to='/buyer/mysubscription'>
                <i className='sitemap icon'></i>
                  My Subscriptions
              </Menu.Item>
              <Menu.Item as={Link} to='/buyer/mynotification'>
                  <i className='bell outline icon'></i>
                   My Notifications
              </Menu.Item>
            </div>


    );
    }


    render() {
        console.log("BUYER")
        return (
                <HomeSidebar  items = {this.getmenu()} />
        );



    }

}

export default Buyer;