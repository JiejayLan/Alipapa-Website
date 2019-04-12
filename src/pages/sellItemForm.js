import React from 'react';
import uuid from "uuid";
import { connect } from 'react-redux';
import {database,storage} from '../firebase/firebase';

class sellItemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            priceNature: "",
            keyWord:"",
            price:0,
            picture:null,
            pictureURL:""
        };
    }

    handleSubmit() {  
        if(this.state.title!="" &&this.state.priceNature!=""&&this.state.keyWord!=""
        &&this.state.price>0 && this.state.picture!=null){    
            
            let sellerID = this.props.seller.uid;
            var storageRef = storage.ref("itemApplication/"+ uuid.v4() + this.state.picture.name);

            //upload picture to firebase storage
            storageRef.put(this.state.picture).then(fileData => {
                 return fileData.ref.getDownloadURL();
              }).then(imageURL=>{
                this.setState({pictureURL:imageURL});
            // upload to firebase database 
                database.ref('itemApplication').push({sellerID,...this.state});  
            });         
        }
    
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
            priceNature: changeEvent.target.value
        });
    };
    getInitialState =  ()=> {
        return {
            priceNature: 'Fixed_Price'
        };
      };

    fileSelect=e=>{
        console.log(e.target.files[0]);
        this.setState({picture:e.target.files[0]});
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
            <form className="form">
                <label className="label">
                    Title:
                    <input type="text" name={"title"} className="text-input"
                        size="25"
                        onChange={()=>{
                        this.setState({ "title": event.target.value });
                    }} />
                </label> 

                <input type="file"
                    id="itemPicture" name="itemPicture" 
                    className="file-input"
                    onChange={this.fileSelect}
                    accept="image/png, image/jpeg, image/jpg">
                </input>

                <label className="label">
                    Key word:
                    <input type="text" name={"keyWord"} className="text-input"
                        onChange={()=>{
                        this.setState({ "keyWord": event.target.value });
                    }}  />
                </label>
                <label className="label">
                    price:
                    <input type="number" name={"price"} className="number-input"
                        onChange={()=>{
                        this.setState({ "price": event.target.value });
                    }}  />
                </label>
                
                <div className="radio">
                    <label className="label">
                        <input type="radio" value="Fixed_Price" checked={this.state.priceNature === 'Fixed_Price'} onChange={this.handleOptionChange} />
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
                <button className="button" type="button" onClick={()=>this.handleSubmit()} >submit</button>
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
