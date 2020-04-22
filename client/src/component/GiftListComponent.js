import React from "react";
import Gift from "./GiftItem";

const GiftListComponent = ({gifts,setModalNumber,setModalIsOpen,setSelectedGift}) => {


  console.log("in giftlist", gifts);
  //let array = Array.from(gifts, ([name, value]) => ({ value }));
  //console.log(array, "array")
  if(gifts.length > 0) {
    return (
        <div className="ui four cards">
          { gifts.map( gift => <Gift setSelectedGift = {setSelectedGift} setModalNumber={setModalNumber} setModalIsOpen={setModalIsOpen}
              key={gift._id} gift={gift}/> )
          }
        </div>
    )
  }
  else return <div/>};


export default GiftListComponent;