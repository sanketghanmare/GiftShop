    import React from "react";
//import axios from "axios";
import {Form, Rating} from "semantic-ui-react";
//import FormData from "FormData";

class User extends React.Component{
    state = {
        users : [],
        newUser : {
            username : '',
            firstName : '',
            lastName : ''
        },
        newImage : {},
        showImage : ''
    }

    componentDidMount() {
        this.findAllUsers();
    }

    findAllUsers = () => {
        fetch("http://localhost:5000/api/users")
            .then(response => response.json())
            .then(allUsers => this.setState({users: allUsers}))
    }

    createUser = (user) =>
        fetch("http://localhost:5000/api/users", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
            .then(newUser => this.setState(prevState => ({
                users: [...prevState.users, newUser],
                newUser: {username: '', firstName: '', lastName: ''}
            })))


    imageSelected = (ev) => {

        //console.log(ev.target.files)
        const file = ev.target.files[0];
        console.log(file);
        const imageObject = {
            imageName : "upload" + Date.now(),
            imageData : URL.createObjectURL(file)
        }
        const imageObj = new FormData();
        imageObj.append("imageName", "upload" + Date.now())
        imageObj.append("imageData", file);
        console.log(imageObj.get('imageData'))
        this.setState({image : URL.createObjectURL(file)});
        console.log(this.state);
        fetch("http://localhost:4000/api/image", {
            method: 'POST',
            body: imageObj
        }).then(response => response.json())
            .then(img => this.setState( {newImage: img})).then(this.getImage.bind(this));
        console.log(this.state.newImage)
        //console.log(this.state.newImage.document)
        //this.getImage();
        // fetch("http://localhost:4000/api/image/"+newImage._id)
        // .then(response => response.json()).then(img1 => console.log(img1))

/*axios.post('http://localhost:4000/api/image',imageObj)
    .then((res) => {
    console.log(res.data)
}).catch((error) => {
    console.log(error)
});*/
    }

    getImage() {
        console.log(this.state.newImage.document)
        fetch("http://localhost:50000/api/image/"+this.state.newImage.document._id)
        .then(response => response.json()).then(img1 => this.setState({showImage: 'data:image/jpeg;base64,' + this.arrayBufferToBase64(img1.data)}))
        //this.setState({showImage: 'data:image/jpeg;base64,' + this.arrayBufferToBase64(img1.buffer)})
          //  .then(console.log(this.state.showImage))
    }

    arrayBufferToBase64(buffer) {
        //console.log(buffer)
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        //console.log(window.btoa(binary));
        return window.btoa(binary);
    };

    imageSave(){

    }

    testme = () =>
    {
        console.log("Clicked")
    }
    render() {
        console.log(this.state)
        return(
          <div>
              <div>
              <h2 className="ui block header">Users</h2>
              <ul className="list-group">
                      {this.state.users.map( user =>
                            <ol key={user._id} className="list-group-item">
                                    <div className="ui label">
                                        <i className="user icon"></i> {user.firstName + " " + user.lastName}
                                    </div>
                                <div className="ui buttons">
                                    <button className="ui negative button">Delete</button>
                                    {/*<div className="or"></div>
                                    <button className="ui positive button">Add</button>*/}
                                </div>
                            </ol>
                      )}
              </ul>
                  <div>
                      <input type="text" onChange={(e) => this.setState({newUser : {username: e.target.value, firstName: e.target.value, lastName: e.target.value}})}/>
                        <button onClick={()=>this.createUser(this.state.newUser)}>Add User</button>
                  </div>
          </div>
              <div>
                  <h2 className="ui dividing header">Photos</h2>
                  <form action="/api/image" encType="multipart/form-data" method="POST">
                  <div className="ui right icon input">
                      <input type="file" name='imageData' id='imageData' onChange={this.imageSelected}/>
                      <i className="file image large icon"></i>
                  </div>
                  </form>
                      <button className="ui blue icon button" onClick={this.imageSave}>
                          Upload
                          <i className="right upload large icon"></i>
                      </button>
                      <div className="card">
                          <div className="image">
                              <img src={this.state.image} width="250px"/>
                              <img src={this.state.showImage} width="250px" alt=""/>
                          </div>

                      </div>

              </div>
          </div>

        )}
}

export default User;