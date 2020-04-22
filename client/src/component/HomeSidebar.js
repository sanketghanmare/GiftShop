import React from "react";
import {Menu, Segment, Sidebar} from "semantic-ui-react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import {Switch} from "react-bootstrap";
import MyProfile from "./MyProfile";
import {Route} from "react-router-dom";
import WelcomeBuyer from './WelcomeBuyer';
import Seller from './Seller';
import WelcomeSeller from "./WelcomeSeller";
import MyProducts from './MyProducts';
import WelcomeAdmin  from "./WelcomeAdmin";
import AdminPanel from "./AdminPanel";
import MyCart from "./MyCart";
import BuyerHistory from "./BuyerHistory";
import BuyerNotification from "./BuyerNotification";
import BuyerSubscription from "./BuyerSubscription";
import BuyerOrder from "./BuyerOrder";
import SellerOrder from "./SellerOrder";


class HomeSidebar extends React.Component {

  constructor(props){
    super(props)
    console.log("rendering sidebar")
    console.log(props)
  }


    render() {
        return(
            <div>
              <Sidebar.Pushable className="sidebarcomp">
              <Sidebar
                  as = {Menu}
                  icon='labeled'
                  inverted
                  vertical
                  visible
                  width='thin'
              >{this.props.items}
              </Sidebar>
                <Sidebar.Pusher className="fp-panel-main" >
                    <Switch >
                      <Route exact path = '/buyer' component ={()=><WelcomeBuyer/>}/>
                      <Route exact path= '/buyer/cart' component={()=> <MyCart/>}/>
                      <Route exact path= '/buyer/history' component={()=> <BuyerHistory/>}/>
                      <Route exact path= '/buyer/mynotification' component={() => <BuyerNotification/>}/>
                      <Route exact path = '/buyer/mysubscription' component={()=> <BuyerSubscription/>}/>
                      <Route exact path ='/seller' component ={()=><WelcomeSeller/>}/>
                      <Route exact path='/seller/myproducts' component ={() => <MyProducts/>}/>
                      <Route exact path='/admin' component ={()=><WelcomeAdmin/>} />
                      <Route exact path='/admin/usernames' component ={()=><AdminPanel/>}/>
                      <Route exact path='/admin/gifts' component ={()=><AdminPanel/>}/>
                      <Route exact path='/admin/category' component ={()=><AdminPanel/>}/>
                      <Route exact path= '/buyer/profile' component={()=><MyProfile/>}/>
                      <Route exact path='/buyer/myorders' component={()=><BuyerOrder/>}/>
                      <Route exact path='/seller/order' component={()=><SellerOrder/>}/>
                    </Switch>

                </Sidebar.Pusher>
              </Sidebar.Pushable>

            </div>

        );

    }

}

export default HomeSidebar;