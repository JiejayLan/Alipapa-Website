import React from 'react';
import uuid from "uuid";
import { connect } from 'react-redux';
import {database,storage} from '../firebase/firebase';

class sellItemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            priceNature: "Fixed_Price",
            keywords:[],
            price:0,
            picture:null,
            pictureURL:""
        };
    }

    handleSubmit =(e)=>{
        e.preventDefault();  
        alert("Submit Successfully");
        let sellerID = this.props.seller.userID;
        var storageRef = storage.ref("item_application/"+ uuid.v4() + this.state.picture.name);

        //upload picture to firebase storage
        storageRef.put(this.state.picture).then(fileData => {
                console.log("submit file");
                return fileData.ref.getDownloadURL();
            }).then(imageURL=>{
            this.setState({pictureURL:imageURL});
            //upload to firebase database 
            database.ref('item_application')
                    .push({sellerID,...this.state})
                    .then(snapshot=>{
                        console.log(snapshot);
                        // <Redirect to='/sellnewitem' />
                    });  
        });          
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
            priceNature: changeEvent.target.value
        });
    };

    fileSelect=e=>{
        this.setState({picture:e.target.files[0]});
    }

    handleKeywords = event=>{
        let keywords = event.target.value;
        keywords = keywords.split(/(\s+)/)
                         .filter( function(e) { return e.trim().length > 0; } );;
        console.log(keywords);
        this.setState({keywords});
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                    <h1 className="page-header__title">New Item Application</h1>
                    </div>
                </div>
            <div className="content-container">
            <form className="form" onSubmit={this.handleSubmit}>
                <label className="label">
                    Title:
                    <input 
                        type="text" 
                        required
                        name={"title"} 
                        className="text-input"
                        size="25"
                        onChange={()=>{
                        this.setState({ "title": event.target.value });
                    }} />
                </label> 

                <input type="file"
                    id="itemPicture"  
                    required 
                    name="itemPicture" 
                    className="file-input"
                    onChange={this.fileSelect}
                    accept="image/png, image/jpeg, image/jpg">
                </input>

                <label className="label">
                    Keywords:
                    <input 
                        type="text" 
                        required 
                        name={"keyWord"} 
                        className="text-input"
                        onChange={this.handleKeywords}
                    />
                    <br/>
                    (seperate by space ^ ^)
                </label>
                <label className="label">
                    price:
                    <input type="number" required name={"price"} className="number-input"
                        onChange={()=>{
                        this.setState({ "price": event.target.value });
                    }}  />
                </label>
                
                <div className="radio">
                    <label className="label">
                        <input type="radio" selected value="Fixed_Price" checked={this.state.priceNature === 'Fixed_Price'} onChange={this.handleOptionChange} />
                        Fixed Price
                    </label>
                </div>
                <div className="radio">
                    <label className="label">
                        <input type="radio" value="Range_Price" checked={this.state.priceNature === 'Range_Price'} onChange={this.handleOptionChange} />
                        Range Price
                    </label>
                </div>
                <div>
                <button className="button"  >submit</button>
                </div>
            </form>
            </div>
        </div>
        );
    }
}

//get sellerID from redux state
const mapStateToProps = (state, props) => ({
    seller: state.auth
  });

// const mapDispatchToProps = (dispatch) => ({
//     startAddItem: (item) => dispatch(addItem(item))
// });

export default connect(mapStateToProps)(sellItemForm);
