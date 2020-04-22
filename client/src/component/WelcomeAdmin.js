import React from 'react'
import bg from '../images/Admin.jpg'

class WelcomeAdmin extends React.Component{


  render(){
    return(
        <div className="ui orange segment">

          <img src ={bg} width='1200px' height='900px'/>

        </div>
    )
  }
}

export default WelcomeAdmin;