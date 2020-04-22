import React from "react";
import ReactDOM from "react-dom";
//import Query from "../server/saveImageNode"
import GiftListComponent from "./GiftListComponent";
//import Axios from "axios";
class App extends React.Component {

    state = {
        file : null
    }
    fileSelectedHandler = (e) => {
        let reader = new FileReader();
        let file = e.target.files.item(0);
        let data = new FormData();
        data.append("image", file, file.name)
        console.log(data)
        this.setState({ file : data });
    }

    fileUploadHander = () => {
        console.log("here");
        console.log(this.state.file);
        let data = this.state.file;


        //Query.query(this.state.file)
    }

    render() {
        return (
          <div className="App">
              <div>
              <input type = "file" onChange={this.fileSelectedHandler}/>
              <button onClick={this.fileUploadHander}>Upload</button>
              </div>
              <div>
                  <br/><br/>
                  <GiftListComponent
                      gifts = {[
                          {id: "1", title:"Cake", rating:3},
                          {id: "2", title:"Ring", rating: 2},
                          {id: "3", title:"Flowers", rating: 4}
                      ]}/>
              </div>
          </div>
        );
    }
}

export default App;