import React from "react";
import Modal from "react-bootstrap/Modal";
import {Button, Checkbox, Dropdown, Radio} from "semantic-ui-react";
import {connect} from "react-redux";
import {editCategory} from "./Creator";


class EditCategory extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            categoryName : '',
            catType : '',
            parentCategory : '',

        }
    }

    componentDidMount() {
        console.log(this.props.categories);
        let categories = this.props.categories

        let parentCategories = []
        for(let i=0;i<categories.size;i++) {
            let current = categories.get(i)
            if(current.catType === 'Parent') {
                parentCategories.push({key : i, text : current.categoryName, value : current.categoryName})
            }
        }

        //console.log("component did mount", categories)
        //let parentCategories = []
        console.log("category to be edited "+  this.props.getSelectedCategory());
        for(let i=0;i<categories.size;i++) {
            let current = categories.get(i)
            if(current.categoryName === this.props.getSelectedCategory()) {
                this.setState({
                     categoryName : current.categoryName,
                     catType : current.catType,
                     parentCategory : current.parentCategory,
                     allParents : parentCategories
                })
            }
        }


    }

    toggleModal(){
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
        this.setState({parentCategory : value})
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Modal.Header>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="ui form">
                        <div className="field">
                            <label>Name:</label>
                            <div className="ui left icon input">
                                <input type="text" placeholder="CategoryName"
                                       value={this.state.categoryName}
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
                            onClick={async() => {await editCategory(this.props.getSelectedCategory(), this.state); this.toggleModal()}}>
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
export default connect (mapStateToProps)(EditCategory);