import React from "react";
import {Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";
import HomeSidebar from "./HomeSidebar";

class Seller extends React.Component{


  getmenu(){
    return (
        <div>
          <Menu.Item as={Link} to='/seller/profile'>
            <i className='gift icon' ></i>
            My Profile
          </Menu.Item>
          <Menu.Item as={Link} to='/seller/myproducts'>
            <i className='gift icon' ></i>
            My Gifts
          </Menu.Item>
          <Menu.Item as={Link} to='/seller/order'>
            <i className='box icon'></i>
            My Orders
          </Menu.Item>
        </div>


    );
  }

  render() {
    console.log("Seller");
    return (
        <HomeSidebar  items = {this.getmenu()} />
    );



  }
}

export default Seller;