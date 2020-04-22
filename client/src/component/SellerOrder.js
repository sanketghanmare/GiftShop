import React from 'react';
import store from '../store'
import {Button, Dropdown, Form, Pagination} from "semantic-ui-react";
import {
  changeOrderDetailStatus,
  getAllOrdersForBuyer,
  getAllOrdersForSeller
} from "./Creator";
import ModalView from "./ModelView";

class SellerOrder extends React.Component{


  constructor(props){

    const options = [
      {value: '1', text: ''},
      {value : 'Order Placed', text: 'Order Placed'},
      {value : 'Shipped', text: 'Shipped'},
      {value : 'Delivered', text: 'Delivered'},
    ]

    const defaultMap = new Map()
    defaultMap.set("Order Placed" , 'Order Placed')
    defaultMap.set("Shipped" , 'Shipped')
    defaultMap.set("Delivered" , 'Delivered')

    const icon  = new Map();
    icon.set("Order Placed","clipboard check icon")
    icon.set("Shipped","shipping fast icon")

    super(props)
    this.state= {
      currentPage: 1,
      roleSelected: new Map(),
      order_id: '',
      status: '',
      action: '',
      datafetched: false,
      options: options,
      defaultMap: defaultMap,
      selected: '2',
      ModalIsOpen: false,
      icon : icon
    }

  }

  componentDidMount() {

    getAllOrdersForSeller();

    //this.setState({options : options, defaultMap : defaultMap})

    this.timer = setInterval(() => getAllOrdersForSeller(), 2000);
    this.timer1 = setInterval(()=> this.update(),2000)
  }

  update(){
    this.setState({datafetched:true})
  }

  componentWillUnmount(){
    clearInterval(this.timer);
    this.timer= null;
  }


  toggleModal(){
    this.setState({ModalIsOpen : !(this.state.ModalIsOpen)})
  }

  getModalNumber(){
    return this.state.ModalNumber;
  }

  setModalNumber(number){
    this.setState({ModalNumber:number})
  }

  setSelectedOrder(orderId){
    this.setState({orderId : orderId})
  }

  getSelectedOrder(){
    return this.state.orderId;
  }

  getModalIsOpen(){
    return this.state.ModalIsOpen;
  }

  getDate(date){
    return date.substr(0,10)
  }

  render(){
    console.log(this.state)
    let orders = store.getState().sellerorders;

    let orderList = Array.from(orders, ([, value]) => ({value}))

    console.log(orderList)
    const itemPerPage = 4;
    const page = this.state.currentPage;
    const totalPages = Math.ceil(orderList.length / itemPerPage);
    orderList = orderList.slice((page - 1) * itemPerPage, (page - 1) * itemPerPage + itemPerPage)
    if (orderList.length > 0) {
      return (
          <div>

            <div className="ui raised orange segment order-seg">
              <h3 className="ui orange header">
                Orders for You
              </h3>
              <table className="ui six column table">
                <thead>
                <tr>
                  <th> Order Id </th>
                  <th> Product Name </th>
                  <th> Quantity </th>
                  <th> Expected Delivery </th>
                  <th> Status </th>
                  {/*<th> Status2 </th>*/}
                  <th> Action </th>
                </tr>
                </thead>
                <tbody>

                  {orderList.map((order, index)=>(

                      <tr>
                        <td className="tableData">{order.value._id}</td>
                          <td className="tableData">{order.value.gift.name}</td>
                        <td className="tableData">{order.value.quantity}</td>
                        <td className="tableData">{this.getDate(order.value.expectedDelivery)}</td>

                        <td className="tableData">
                          <a className="item">
                            <i className={this.state.icon.get(order.value.status)}/>
                            {order.value.status}
                          </a>
                        </td>

                        <td className="tableData">
                          <Button className="ui blue submit button" variant="secondary"
                          onClick = {async()=>{
                            await this.setModalNumber(13)
                            await this.setSelectedOrder(order.value._id)
                            await this.toggleModal()
                             //await changeOrderDetailStatus(this.state)
                           await this.setState({status:''})
                          }}>
                            Update
                          </Button>
                        </td>
                      </tr>
                      ))}


                </tbody>

              </table>

              <div>
                <div align="center">
                  <Pagination
                      onPageChange={(e,{activePage})=>{this.setState({currentPage:activePage})}}
                      activePage={page}
                      siblingRange={1}
                      totalPages={totalPages}
                  />
                </div>
              </div>

          </div>
            <ModalView getModalNumber ={this.getModalNumber.bind(this)}
                       getModalIsOpen ={this.getModalIsOpen.bind(this)}
                       getSelectedOrder = {this.getSelectedOrder.bind(this)}
                       toggleModal = {this.toggleModal.bind(this)}
            />

          </div>
            )}


    else  return (
        <div>
          <dialog open>
            <p>No Pending Orders!</p>
          </dialog>
        </div>
    )
  }


}

export default SellerOrder;