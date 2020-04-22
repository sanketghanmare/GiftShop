import {createStore, combineReducers} from "redux";
import _ from 'lodash';

function login(st0 ={username:"",password:"",role:"",authenticated:""}, action){
  console.log("in store")
 //console.log(st0.username)
  if(action.type === 'CHANGE_LOGIN'){
    return Object.assign({},st0,action.data);
  }
  if(action.type === 'LOGIN'){
    console.log("Login action")
    console.log(st0)
    return Object.assign({},{authenticated:true},st0,action.data);
  }
  else
    return st0;
}

function gifts(st0=new Map(),action) {

  let st1 = new Map(st0);
  console.log("in gift store")
  console.log(st0)
   if(action.type === 'GET_GIFTS') {
     for (let i = 0; i < action.data.length; i++) {
       st1.set(i, action.data[i])
     }
       return st1;
     }

     if(action.type === "ADD_GIFT") {
       st1.set(st0.size,action.data)
       console.log("add_gifts")
       console.log(st1);
       return st1;
     }


     if(action.type === "SEARCH_GIFTS"){
       let st1 = new Map();
       for (let i = 0; i < action.data.length; i++) {
         st1.set(i, action.data[i])
       }
       console.log(st1);
       return st1;
     }

     if(action.type === 'EDIT_GIFT'){
       st1= new Map();
       console.log(action.data)
       console.log(st0,"this the original one")
       for(let i = 0;i<st0.size;i++){
         if(st0.get(i)._id === action.data._id){
           st1.set(st1.size,action.data)
         }
         else{
           st1.set(i,st0.get(i))
         }

       }
     console.log("modified",st1);
       return st1;
     }

     if(action.type === 'DELETE_GIFT'){
       st1= new Map();
       //return Object.assign({},...Object.entries(st0).filter(([k])=>k._id!==action.id).map(([k,v])=>({[k]:v})))
       // return st0.filter((k,v)=> v._id!=action.id)
       for(let i = 0 ;i<st0.size;i++){
         if(st0.get(i)._id !== action.id){
           st1.set(st1.size,st0.get(i))
         }
       }
       console.log("delete gift")
       console.log(st1)
       return st1;

     }

     if(action.type === 'CLEAR'){
       st1 = new Map();
       return st1;
     }

     if(action.type === 'SELECTED_GIFT'){
       st1= new Map();
       st1.set(0,action.data)
       return st1;
     }



return st0;
}

function shoppingCart(st0 = new Map(), action){
  // let st1 = new Map(st0);
  if(action.type === "ADD_TO_GIFT_BASKET"){
let st1 = new Map();
    if(st0.size === 0){
      console.log(st0)
     st1 = new Map();
      console.log(st1.size);
      console.log(action.data[0]);
      if(action.data.length > 1){

        for(let i = 0 ; i< action.data.length; i++){
          st1.set(i,action.data[i])
        }
      }
      else {
        st1.set(st1.size,action.data[0])
      }


    }
    else{
     st1 = new Map(st0);
      console.log(st0);
      st1.set(st0.size,action.data[0])

    }
    console.log("Shopping cart",st1)
    return st1;

  }

  if(action.type === 'DELETE_GIFT_FROM_CART'){
    let st1 = new Map();
    for(let i = 0 ;i<st0.size; i++){
      if(st0.get(i)._id !== action.id) {
        st1.set(st1.size,st0.get(i))
      }
    }
    return st1;
  }

  if(action.type === 'DELETE_ALL_FROM_CART'){
    let st1 = new Map();
    return st1;
  }

  return st0;
}

function userdetails(st0 = new Map(), action) {
console.log("userdetails");
  console.log(action);
  let st1 = new Map(st0)
  if(action.type === 'USER_DETAILS') {
    console.log("inside userdetails");
    st1.set(0 , action.data);
    console.log(action.data);
    return st1
  }
return st0;
}

function categories(st0 = new Map(), action) {
  console.log("In store categories");

  if(action.type === 'GET_CATEGORIES') {
    let st1 = new Map(st0);
    for (let i = 0; i < action.data.length; i++) {
      st1.set(i, action.data[i])
    }
    console.log(st1);
    return st1;
  }

  if(action.type === 'CREATE_CATEGORY') {
    let st1 = new Map(st0);
    console.log(st0)
    st1.set(st0.size, action.data)
    console.log(st1);
    return st1;
  }

  //editCategory
  if(action.type === 'EDIT_CATEGORY') {
    let st1 = new Map();
    console.log(action.data)
    console.log(st0,"this the original one")
    for(let i = 0; i < st0.size; i++) {
      if(st0.get(i)._id === action.data._id) {
        st1.set(st1.size,action.data)
      }
      else{
        st1.set(i, st0.get(i))
      }
    }
    console.log("modified",st1);
    return st1;
  }

  //DELETE_CATEGORY
  if(action.type === 'DELETE_CATEGORY') {
    let st1 = new Map();
    let isParentCategory = 0;
    console.log("in store deleting", action.data)
    console.log(st1);
    console.log(st0);
    for(let i = 0 ; i < st0.size;i++) {
      if (st0.get(i).categoryName !== action.data) {
        st1.set(st1.size, st0.get(i))
        console.log("looping", st1)
        if (st0.get(i).catType === 'Parent') {
          isParentCategory = 1
        }
      }
    }
  console.log("after delete", st1);
      if(isParentCategory === 1) {
        console.log("printing children")
        let st2 = new Map(st1)
        for(let i = 0 ; i < st2.size; i++) {
          if(st1.get(i).parentCategory === action.data) {
            console.log(st1.get(i).categoryName)
            st1.delete(i)
          }
        }
      }
      console.log(st1)
    return st1;
  }
  return st0;
}

function users(st0 = new Map(),action) {

  let st1 = new Map(st0);

  if(action.type === 'ADD_USER') {
    let st1 = new Map(st0);
    st1.set(st1.size, action.data)
    return st1;
  }

  if(action.type === "GET_USERS"){
    for(let i = 0;i < action.data.length;i++){
      st1.set(i,action.data[i])
    }
    console.log("get_users",st1);
    return st1;
  }


  //editUser
  if(action.type === 'EDIT_USER') {
    st1= new Map();
    console.log(action.data)
    console.log(st0,"this the original one")
    for(let i = 0;i<st0.size;i++) {
      if(st0.get(i)._id === action.data._id) {
        st1.set(st1.size,action.data)
      }
      else{
        st1.set(i,st0.get(i))
      }
    }
    console.log("modified",st1);
    return st1;
  }


  //deleteUser
  if(action.type === 'DELETE_USER') {
    st1 = new Map()
    for(let i = 0 ;i<st0.size;i++){
      if(st0.get(i)._id !== action.id) {
        st1.set(st1.size, st0.get(i))
      }
    }
    return st1;
  }
  return st0;
}

function notifications(st0 = new Map(),action) {

  if(action.type === "MY_NOTIFICATIONS") {
    let st1 = new Map(st0);
    for(let i = 0;i < action.data.length;i++) {
      st1.set(i, action.data[i])
    }
    console.log("notifications",st1);
    return st1;
  }

  if(action.type === 'DELETE_NOTIFICATION'){
    let st1 = new Map();
    console.log(st0);
    for(let i=0; i <st0.size ; i++){
      if(st0.get(i)._id !== action.id){
        st1.set(st1.size,st0.get(i))
      }
    }
    console.log("Deleteing Notication",st1)
    return st1;
  }

  return st0;
}

function sellerorders(st0 = new Map(),action){
  let st1 = new Map();
  if(action.type === 'GET_ORDERS_SELLER'){
    console.log(action.data)
    let st1 = new Map();
    for (let i = 0 ; i< action.data.length; i++){
      st1.set(i,action.data[i])
    }
    return st1;
  }

  if(action.type === 'UPDATE_ORDER_SELLER'){
    console.log(st0);
    let st1 = new Map();
    for(let i = 0;i < st0.size;i++){
      if(st0.get(i)._id === action.data[0]._id){
        console.log(st0.get(i));
        if(action.data[0].status === 'Delivered'){

        }
        else{
          st1.set(st1.size,action.data[0])
        }

      }
      else{
        st1.set(st1.size,st0.get(i))
      }
    }
    console.log(st1);
    return st1;
  }

  return st0;
}

function subscriptions (st0 = new Map(), action) {

  if(action.type === 'ADD_SUBSCRIPTION'){
    let st1 = new Map(st0);
    st1.set(st1.size, action.res);
    return st1;
  }
  
  if(action.type === "GET_SUBSCRIPTIONS") {
    let st1 = new Map();
    st1.set(0, action.data)
    console.log("subscriptions", st1);
    return st1;
  }

  if(action.type === 'UNSUBSCRIBE') {
    let st1 = new Map();
    console.log(st0);
    console.log(action)
    //for(let i=0; i < st0.size ; i++) {
      console.log("store loop", st0.get(0))
      //if(st0.get(i)._id !== action.id) {
        st1.set(st1.size,action.data)
      //}
    //}
    console.log("Deleting subscription", st1)
    return st1;
  }

  return st0;

}

function orders(st0 = new Map(),action){
  let st1 = new Map();
  if(action.type === 'ADD_ORDER'){
    let st1 = new Map (st0)
    console.log(st0);
    console.log(action.data);
    st1.set(st0.size,action.data);
    return st1;
  }
  if(action.type === 'GET_ORDERS'){
    console.log(action.data);
    let st1 = new Map();
    for (let i = 0 ; i< action.data.length; i++){
      if(action.data[i].orderDetails.length > 0) {
        console.log("check for buyeer order",
            action.data[i].orderDetails.length)
        st1.set(st1.size, action.data[i])
      }

    }
    return st1;
  }

  return st0;
}

let reducers = combineReducers({

  login,
  userdetails,
  gifts,
  categories,
  users,
  shoppingCart,
  notifications,
  subscriptions,
  orders,
  sellerorders

});
let store = createStore(reducers);

export default store;