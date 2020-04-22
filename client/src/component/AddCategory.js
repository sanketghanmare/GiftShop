import React from "react";
import Modal from "react-bootstrap/Modal";
import {Button, Checkbox, Dropdown, Radio} from "semantic-ui-react";
import {connect} from "react-redux";
import {addCategory} from "./Creator";


class AddCategory extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            categoryName : '',
            catType : '',
            parentCategory : '',
            allParents : [],
            isParent : true,
            existingCat : []
        }
    }

    componentDidMount() {
        let categories = this.props.categories
        console.log("component did mount", categories)
        let parentCategories = []
        let allCat = []
        for(let i=0;i<categories.size;i++) {
            let current = categories.get(i)
            allCat.push(current.categoryName);
            if(current.catType === 'Parent') {
                parentCategories.push({key : i, text : current.categoryName, value : current.categoryName})
            }
        }
        console.log("parents", parentCategories)
        this.setState({allParents : parentCategories, existingCat : allCat})
    }

    toggleModal() {
        this.props.toggleModal();
    }

    handleSelect(value){
        console.log(value);
        if(value === 'Child') {
            this.setState({isParent : false, catType : 'Child'})
        }
        else if(value === 'Parent'){
            this.setState({isParent : true, catType:'Parent'})
        }
        else{
            this.setState({isParent : true, catType:''})
        }
    }

    setParent(value) {
        console.log(value)
        this.setState({parentCategory : value})
    }

    async createCategory(){
       const cat = this.state.categoryName;
        if(this.state.existingCat.includes(cat)){
            alert("This Category already exists")
        }
        else {
            await addCategory(this.state);
            this.toggleModal();
        }
    }


    render() {
        console.log(this.state)
        return (
            <div>
                <Modal.Header>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="ui form">
                        <div className="field">
                            <label>Name:</label>
                            <div className="ui left icon input">
                                <input type="text" placeholder="CategoryName"
                                       onChange={(e) => this.setState({categoryName: e.target.value})} />
                                <i className="gift icon"></i>
                            </div>
                        </div>

                        <div className="two fields">
                            <div className="eight wide field">
                                <label>Category Type:</label>
                                <Dropdown key="Category Type" placeholder="Type" clearable selection
                                          options={[{key: 1, text:"Parent", value: "Parent"},
                                                    {key: 2, text: "Child", value: "Child"}]}
                                          onChange={(e, { value}) => this.handleSelect(value)}
                                />
                            </div>
                            <div className="eight wide field">
                                <label>Parent Category:</label>
                                <Dropdown key="parentCategories" disabled={this.state.isParent}
                                          placeholder="Select Parent" clearable selection
                                          options={this.state.allParents}
                                          onChange={(e, { value}) => this.setParent(value)}
                                />
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button className="ui blue submit button" variant="secondary"
                            onClick={async() => {await this.createCategory()}}>
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
export default connect (mapStateToProps)(AddCategory);