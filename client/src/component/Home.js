
import React from "react";
import { Button, Divider, Dropdown, Icon, Image, Input, Item, Header, Label,
    Menu, Segment, Sidebar} from 'semantic-ui-react';
import './app.css';
import GiftListComponent from "./GiftListComponent";
import {BrowserRouter, NavLink, Route} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./Register";
import Buyer from "./Buyer";
import HomeSidebar from "./HomeSidebar";
/*import bg1 from '../images/giftD_2.jpg'
import bg3 from '../images/gifts.jpeg'
import bg4 from '../images/bg3.jpg'
import bg7 from '../images/bg7.jpg'
import bg8 from '../images/bg8.jpg'
import bg9 from '../images/giftcover.jpg'*/

//import bg4 from '../images/gift_h.jpg'
import background from "../images/cat.jpeg";
class Home extends React.Component {
    constructor() {
        super();
        this.state = { Modalvisible: true}
        //const [visible, setVisible] = useBooleanKnob({ name: 'visible' })
    }



    handleHideClick = () => this.setState({ visible: false })
    handleShowClick = () => this.setState({ visible: true })
    handleSidebarHide = () => this.setState({ visible: false })

    redirect(){
        switch (this.state.redirect) {

        }
    }
    render() {

        //const { visible } = this.state
        //console.log(this.state.redirect)
        return (

            <div>

                <img src={background}
                     className="img-fluid"

                     alt='image'/>

            </div>

        );
    }


}


export default Home;