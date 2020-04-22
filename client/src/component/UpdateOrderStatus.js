import React from 'react'
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown} from "semantic-ui-react";
import {changeOrderDetailStatus, deleteUser} from "./Creator";

class UpdateOrderStatus extends React.Component{

  constructor(props) {
    super(props)

    this.state = {

        status : '',
        order_id : '',
        options : [
        {value : 'Order Placed', text: 'Order Placed'},
        {value : 'Shipped', text: 'Shipped'},
        {value : 'Delivered', text: 'Delivered'},
      ]
    }
  }

  componentDidMount() {
      this.setState({order_id : this.props.getSelectedOrder()})
  }

  toggleModal(){
    this.props.toggleModal();
  }

  render() {

    return(

          <div>
            <Modal.Header >
              <Modal.Title>Update Order Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div> OrderId : {this.props.getSelectedOrder()} </div>
              <div className="ui divider"></div>
              <div>
                Status :
                <Dropdown fluid selection
                           options={this.state.options}
                           onChange={(e, { value}) => this.setState({status : value})}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="ui blue submit button" variant="secondary" onClick={async ()=>{
                await changeOrderDetailStatus(this.state)
                await this.toggleModal()
              }}>
                Confirm
              </Button>
              <Button className="ui blue submit button" variant="primary" onClick = {()=>this.toggleModal()}>
                Cancel
              </Button>
            </Modal.Footer>
          </div>
    );
}
}

export default UpdateOrderStatus;