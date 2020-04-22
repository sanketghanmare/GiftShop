import React from "react";
import {Rating} from 'semantic-ui-react'
const Gift = ({gift, setModalNumber,setModalIsOpen, setSelectedGift}) => {
  let img = null;
  console.log("from gift item");
  console.log(gift.value)
  return (
      <div className="card">
        <div align="center"> {gift.value.name} </div>
        <div className="image">
          <img className="cardstyle" src={gift.value.imageData} alt="no image" width='100px' height='100px'/>
        </div>
        <div className="content">
          Price : ${gift.value.price}

          <button className="ui orange button right floated" onClick={()=>{setModalNumber(7); setModalIsOpen(); setSelectedGift(gift.value._id) }}>Details
            {/*<div className="hidden content">Shop</div>*/}
            {/*<div className="visible content">*/}
            {/*  <i className="shop icon"></i>*/}
            </button>



        </div>
      </div>
  )
}
export default Gift
