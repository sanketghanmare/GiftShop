import React from 'react'
import {connect} from "react-redux";
import './app.css'
import {getCategories, getGiftsByCategories} from "./Creator";
import store from "../store";
import {Dropdown, Pagination, Segment} from "semantic-ui-react";
import GiftListComponent from "./GiftListComponent";
import ModalView from "./ModelView";
class WelcomeBuyer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: '',
      occasion: '',
      storeCategories: [],
      selectedCategories: [],
      categories : [],
      ModalIsOpen: false,
      ModalNumber: '',
      selectedGift:'',
      currentPage : 1
    }
  }

  toggleModal(){
    console.log("toggling")
    this.setState({ModalIsOpen : !(this.state.ModalIsOpen)})
  }

  getModalIsOpen(){
    return this.state.ModalIsOpen;

  }

  getModalNumber(){
    return this.state.ModalNumber;
  }

  setModalNumber(number){
    this.setState({ModalNumber:number})
  }


  setSelectedGift(giftId){
    this.setState({selectedGift:giftId})
  }

  getSelectedGift(){
    return this.state.selectedGift;
  }


  getIsNotification(){
    return false;
  }



  async componentDidMount() {
    console.log("Any notifications")
    // await getNotifications();

    store.dispatch({
      type:"CLEAR",
      data:{}
    })
    //console.log("in component didMount of welcomeBuyer")
    console.log(this.props);
    let categories = this.props.categories
    if(categories.size === 0) {
      await getCategories();
      categories= this.props.categories;
    }
    console.log(categories);
    let allCategories = [];
    let selectedCategories = [];
    for(let i=0;i<categories.size;i++) {
      let current = categories.get(i)
      if(current.catType === 'Parent') {
        allCategories.push({"Parent":current.categoryName, "Children": []})
        selectedCategories.push({"Parent":current.categoryName, "Child": ""})
      }
      //categories.delete(i);
    }
    for(let i=0;i<categories.size;i++) {
      let current = categories.get(i)
      if (current.catType === 'Child') {
        for (let j = 0; j < allCategories.length; j++) {
          if (allCategories[j].Parent === current.parentCategory) {
            allCategories[j].Children.push({key: i, text : current.categoryName, value:current.categoryName, parent: current.parentCategory});
            break;
          }
        }
      }
    }
    this.setState({storeCategories : allCategories, selectedCategories: selectedCategories})
  }

  handleSelect(value, parent) {
    let selectedCategories = this.state.selectedCategories;
    //let storedCategories = this.state.storeCategories;
    let categories = this.state.categories;
    for(let j=0;j<selectedCategories.length;j++)
    {
      if(selectedCategories[j].Parent === parent) {
        if(value.length !==0)
          selectedCategories[j].Child = value;
        else
          selectedCategories[j].Child = "";
        break;
      }
    }
    this.setState({selectedCategories : selectedCategories})
  }

  handleSearch() {
    let category = [];
    let selectedCategories = this.state.selectedCategories;
    for(let j=0; j<selectedCategories.length; j++)
    {
      if(selectedCategories[j].Child !== "") {
        console.log(selectedCategories[j])
        category.push(selectedCategories[j].Child);
      }
    }

    getGiftsByCategories(category);

  }

  setCurrentPage(activePage){
    this.setState({currentPage : activePage})
  }


  render() {
    console.log(store.getState().gifts)
    console.log(this.state);
    let categoryList = this.state.storeCategories;
    let gifts = store.getState().gifts
    let array = Array.from(gifts, ([name, value]) => ({ value }));
    const itemPerPage = 4;
    const page = this.state.currentPage;
    console.log("Page ", page)
    const totalPages = Math.ceil(array.length / itemPerPage);
    array = array.slice((page - 1) * itemPerPage, (page - 1) * itemPerPage + itemPerPage)
    return (
        <div>
          <h4 className="ui horizontal divider"><i className="orange gift icon"/>Shop gifts here</h4>
          {categoryList.map((category,index) =>
              <Dropdown key={category.Parent} placeholder={category.Parent} clearable selection options={category.Children} parent={category.Parent} onChange={(e, { value , parent }) => this.handleSelect(value , parent)}>
              </Dropdown>
          )}
          <button className="ui orange button" onClick={async ()=> await this.handleSearch()}>Go</button>
          <div className="ui divider"/>
          <Segment className="giftSegment">
            <GiftListComponent gifts={array} setModalNumber={this.setModalNumber.bind(this)}
                                setModalIsOpen ={this.toggleModal.bind(this)} setSelectedGift={this.setSelectedGift.bind(this)}
            />
          </Segment>
          <div align="center">
          <Pagination
              onPageChange={(e, {activePage}) => this.setCurrentPage(activePage)}
              activePage={page}
              siblingRange={1}
              totalPages={totalPages}
          />
          </div>
          <ModalView getModalNumber ={this.getModalNumber.bind(this)}
                     getModalIsOpen ={this.getModalIsOpen.bind(this)}
                     getIsNotification = {this.getIsNotification.bind(this)}
                     getSelectedGift={this.getSelectedGift.bind(this)}
                     toggleModal = {this.toggleModal.bind(this)}/>
        </div>
    )
  }
}


function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(WelcomeBuyer);

