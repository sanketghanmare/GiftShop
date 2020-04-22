import React from "react";
import store from '../store'
import {Pagination} from "semantic-ui-react";
import {getAllOrdersForBuyer} from "./Creator";

class BuyerOrder extends React.Component {

    constructor(props) {
        super(props)
        const icon = new Map();
        icon.set("Order Placed", "clipboard check icon")
        icon.set("Shipped", "shipping fast icon")
        this.state = {
            currentPage: 1,
            datafetched: false,
            icon: icon
        }
    }

    componentDidMount() {

        getAllOrdersForBuyer();

        this.timer = setInterval(() => getAllOrdersForBuyer(), 2000);
        this.timer1 = setInterval(() => this.update(), 2000)

    }

    update() {
        this.setState({datafetched: true})
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    getDate(dbdate) {
        let date = dbdate;
        return date.substr(0, 10);
    }

    render() {

        let map = store.getState().orders;
        let orderList = Array.from(map, ([, value]) => ({value}))
        console.log(orderList)
        const itemPerPage = 1;
        const page = this.state.currentPage;
        const totalPages = Math.ceil(orderList.length / itemPerPage);
        orderList =
            orderList.slice((page - 1) * itemPerPage, (page - 1) * itemPerPage + itemPerPage)
        if (orderList.length > 0) {
            return (
                <div>

                    {orderList.map((order, index) => (
                        <div className="ui raised segment order-seg">
                            <h3 className="ui orange header">
                                Order# : {order.value._id}
                            </h3>
                            <h4 className="ui dividing header">
                            </h4>
                            <div className="ui form">

                                <div className="four fields">

                                    <div className="field">
                                        <label>Gift</label>
                                    </div>

                                    <div className="field">
                                        <label>Quantity</label>
                                    </div>

                                    <div className="field">
                                        <label>Expected Delivery</label>
                                    </div>

                                    <div className="field">
                                        <label>Order Status</label>
                                    </div>

                                </div>
                                {order.value.orderDetails.map((orderdetails, index) => (

                                                                  <div className="field">
                                                                      <div className="four fields">
                                                                          <div className="field">
                                                                              <label>{orderdetails.gift.name}</label>
                                                                          </div>
                                                                          <div className="field">
                                                                              <label>
                                                                                  {orderdetails.quantity}
                                                                              </label>
                                                                          </div>
                                                                          <div className="field">
                                                                              <label>
                                                                                  {this.getDate(orderdetails.expectedDelivery)}
                                                                              </label>
                                                                          </div>
                                                                          <div className="field">
                                                                              <a className="item">
                                                                                  <i className={this.state.icon.get(
                                                                                      orderdetails.status)}/>
                                                                                  {orderdetails.status}
                                                                              </a>
                                                                          </div>

                                                                      </div>
                                                                  </div>

                                                              )
                                )}
                                <h4 className="ui dividing header">
                                </h4>
                                <h3 className="ui orange header">
                                    Total Price: ${order.value.totalAmount}
                                </h3>

                            </div>


                        </div>
                    ))}

                    <div>
                        <div align="center">
                            <Pagination
                                onPageChange={(e, {activePage}) => {
                                    this.setState({currentPage: activePage})
                                }}
                                activePage={page}
                                siblingRange={1}
                                totalPages={totalPages}
                            />
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <dialog open>
                        <p>All Gifts Are Delivered!</p>
                    </dialog>
                </div>)
        }

    }
}

export default BuyerOrder;