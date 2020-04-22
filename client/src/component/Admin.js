import React from 'react'
import HomeSidebar from "./HomeSidebar";
import {Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";

class Admin extends React.Component{

  getmenu(){
    return (
        <div>
          <Menu.Item as={Link} to='/admin/profile'>
            <i className='gift icon'></i>
            My Profile
          </Menu.Item>
          <Menu.Item as={Link} to='/admin/usernames'>
            <i className='address book icon' ></i>
            User Management
          </Menu.Item>
          <Menu.Item as={Link} to='/admin/gifts'>
            <i className='gift icon'></i>
            Gift Management
          </Menu.Item>
          <Menu.Item as={Link} to ='/admin/category'>
            <i className='archive icon'></i>
            Category Management
          </Menu.Item>
        </div>


    );
  }

  render(){
    return (
        <HomeSidebar  items = {this.getmenu()} />
    );
  }

}

export default Admin