import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Checkbox} from "semantic-ui-react";
import {addGifts} from "./Creator";
import {connect} from "react-redux";
import noImage from '../noImage.jpg'
class AddGift extends React.Component {


  constructor(props) {
    let noImageFile = new File([""], noImage);
    super(props)
    this.state = {
      name: '',
      delivery: 0,
      category: [],
      availability: 0,
      image: '',
      storeCategories: [],
      price: 0.0,
      categoryChecked: new Map(),
    }

  }

  componentDidMount() {
    let categories = this.props.categories
    console.log(categories);
    let allCategories = [];
    for(let i=0;i<categories.size;i++){
      let current = categories.get(i)
      if(current.catType === 'Parent') {
        allCategories.push({"Parent":current.categoryName, "Children": []})
      }
      //categories.delete(i);
    }
    let checked = new Map();
    for(let i=0;i<categories.size;i++) {
      let current = categories.get(i)
      checked.set(current.categoryName , false);
      if (current.catType === 'Child') {
        for (let j = 0; j < allCategories.length; j++) {
          if (allCategories[j].Parent === current.parentCategory) {
            allCategories[j].Children.push(current.categoryName);
            break;
          }
        }
      }
    }
    console.log('All Categories')
    console.log(allCategories)
    this.setState({storeCategories : allCategories, categoryChecked : checked})
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

  render() {
    console.log(this.state)
    let categoryList = this.state.storeCategories;
    return (
        <div>
          <Modal.Header>
            <Modal.Title>Add Gift</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="ui form">
              <div className="field">
                <label>Name</label>
                <div className="ui left icon input">
                  <input type="text" placeholder="Giftname"
                         onChange={(e) => this.setState({name: e.target.value})}/>
                  <i className="gift icon"></i>
                </div>
                <div className="field">
                  <label>Price</label>
                  <div className="ui left icon input">
                    <input type="text" placeholder="$"
                           onChange={(e) => this.setState({price: e.target.value})}/>
                    <i className="dollar sign icon"></i>
                  </div>
                </div>
              </div>
              <div className="field">
                <label>DeliveryInDays</label>
                <div className="ui left icon input">
                  <input type="text" placeholder="Delivery in Days"
                         onChange={(e) => this.setState({delivery: e.target.value})}/>
                  <i className="truck icon"></i>
                </div>
              </div>
              <div className="field">
                <label>AvailableQuantity</label>
                <div className="ui left icon input">
                  <input type="text" placeholder="Available Quantity"
                         onChange={(e) => this.setState({availability: e.target.value})}/>
                  <i className="warehouse icon"></i>
                </div>
              </div>
              <div className="field">
                <label>Category:</label>
                <div>
                  <ul>
                    {categoryList.map(category =>
                        <li key={category.Parent}>{category.Parent}
                            <ul>
                              {category.Children.map(child =>
                                   <Checkbox key={child} label={child} value={child}
                                             onClick={()=>this.handleCheck({child})}/>
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
                         onChange={(e) => this.setState({image: e.target.files[0]})}/>
                  <i className="file image large icon"/>
                </div>
              </div>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button className="ui blue submit button" variant="secondary"
                    onClick={async() => {await addGifts(this.state); await this.toggleModal()}}>
              Confirm
            </Button>
            <Button className="ui blue submit button" variant="primary"
                    onClick={() => this.toggleModal()}>
              Cancel
            </Button>
          </Modal.Footer>
        </div>
    );
  }



}

function mapStateToProps(state) {
  return state;
}
export default connect (mapStateToProps)(AddGift);
