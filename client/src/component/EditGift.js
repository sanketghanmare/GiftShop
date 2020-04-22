import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Checkbox} from "semantic-ui-react";
import {addGifts, editGifts} from "./Creator";
import {connect} from "react-redux";
import store from "../store";

class EditGift extends React.Component{

constructor(props){
  super(props)
  let gift = new Map();

  this.state = {
    _id:'',
    name:'',
    deliveryInDays:0,
    category:[],
    availableQuantity:0,
    imageName:{},
    storeCategories:[],
    categoryChecked:{},
    Seller:'',
    isImageChanged : false,
    price:0.0,
    view:'Edit Gift',
    fields:'enabled field',
  }

console.log(this.props.getView());
}

  componentDidMount() {
    let categories = this.props.categories
    console.log(categories);
    let allCategories = [];
    let checked = new Map();
    for(let i=0;i<categories.size;i++){
      let current = categories.get(i)
      if(current.catType === 'Parent') {
        allCategories.push({"Parent":current.categoryName, "Children": []})
      }
      else {
          checked.set(current.categoryName , false);
        for(let j=0; j<allCategories.length;j++) {
          if(allCategories[j].Parent === current.parentCategory) {
            allCategories[j].Children.push(current.categoryName);
            break;
          }
        }
      }
    }
    console.log('All Categories')
    console.log(allCategories)
    //this.setState({storeCategories:allCategories, categoryChecked: checked})

    //console.log("THE GIFT")
    for(let j = 0 ;j<this.props.gifts.size;j++){
      if(this.props.gifts.get(j)._id=== this.props.getEditGift()){
        console.log(this.props.gifts.get(j))

        for(let x = 0; x<this.props.gifts.get(j).category.length;x++){
          console.log("In checked for loop")
          console.log(this.props.gifts.get(j).category[x]);
          console.log(checked.get(this.props.gifts.get(j).category[x]))
          checked.set(this.props.gifts.get(j).category[x],true);
          console.log(checked.get(this.props.gifts.get(j).category[x]))

        }
        this.setState({
          _id: this.props.gifts.get(j)._id,
          name: this.props.gifts.get(j).name,
          deliveryInDays: this.props.gifts.get(j).deliveryInDays,
          availableQuantity: this.props.gifts.get(j).availableQuantity,
          imageName: this.props.gifts.get(j).imageName,
          category: this.props.gifts.get(j).category,
          categoryChecked: checked,
          storeCategories: allCategories,
          Seller : this.props.gifts.get(j).Seller,
          imageData : this.props.gifts.get(j).imageData,
          price:this.props.gifts.get(j).price
        })
        break;
      }
    }

    if(this.props.getView() === 'View Gift'){
      this.setState({view: 'View Gift',
        fields:'disabled field'},
      )
    }
    else{
      this.setState({view: 'Edit Gift',
        fields:'enabled field'},
      )
    }

  }

  toggleModal(){
    this.props.toggleModal();
  }

  handleCheck(category) {
    console.log(category.child);
    let checked = this.state.categoryChecked;
    let catSelected = this.state.category
    checked.set(category.child, !checked.get(category.child))
    if(checked.get(category.child)){
      catSelected.push(category.child)
    }
    else{
      catSelected = catSelected.filter((cat)=> cat!==category.child)
    }
    console.log({catSelected})
    this.setState({categoryChecked: checked, category:catSelected})
  }

  render(){
    let categoryList = this.state.storeCategories;
    console.log(this.state);
    return (
        <div>
          <Modal.Header>
            <Modal.Title>{this.state.view}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="ui form">
              <div className={this.state.fields}>
              <div className="field">
                <label>Name</label>
                <div className="ui left icon input">
                  <input type="text" placeholder="Giftname"
                        value={ this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
                  <i className="gift icon"></i>
                </div>
              </div>
              <div className="field">
                <label>Price</label>
                <div className="ui left icon input">
                  <input type="text" placeholder="$"
                         value={this.state.price} onChange={(e) => this.setState({price: e.target.value})}/>
                  <i className="dollar sign icon"></i>
                </div>
              </div>
              <div className="field">
                <label>DeliveryInDays</label>
                <div className="ui left icon input">
                  <input type="text" placeholder="Delivery in Days"
                        value={this.state.deliveryInDays} onChange={(e) => this.setState({deliveryInDays: e.target.value})}/>
                  <i className="truck icon"></i>
                </div>
              </div>
              <div className="field">
                <label>AvailableQuantity</label>
                <div className="ui left icon input">
                  <input type="text" placeholder="Available Quantity"
                         value={this.state.availableQuantity}
                         onChange={(e) => this.setState({availableQuantity: e.target.value})}/>
                  <i className="warehouse icon"></i>
                </div>
              </div>
              <div className="field">
                <label>Category:</label>
                <div>
                  <ul>
                    {categoryList.map(category =>
                        <li key={category.Parent}>
                          {category.Parent}
                          <ul>
                            {category.Children.map(child =>
                                <Checkbox key={child} label={child} value={child} checked={this.state.categoryChecked.get(child)} onClick={()=>this.handleCheck({child})}/>
                            )}
                          </ul>
                        </li>
                    )}
                  </ul>
                </div>

              </div>
              <div className="field">
                <div className="ui right icon input">
                  <input type="file" name="imageData" id="imageData"
                         onChange={(e) => this.setState({imageName: e.target.files[0], isImageChanged:true})}/>
                  <i className="file image large icon"/>
                </div>
              </div>
              </div>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <div className="ui form">
              <div className={this.state.fields}>
            <Button className="ui blue submit button" variant="secondary"
                    onClick={async() => {await editGifts(this.state._id, this.state); await this.toggleModal()}}>
              Save
            </Button>
              </div>
            <Button className="ui blue submit button" variant="primary"
                    onClick={() => this.toggleModal()}>
              Cancel
            </Button>
              </div>

          </Modal.Footer>
        </div>

    )
  }

}

function mapStateToProps(state) {
  return state;
}
export default connect (mapStateToProps)(EditGift);