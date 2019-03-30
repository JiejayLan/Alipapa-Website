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
            
            let sellerID = this.props.sellerID.uid;
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
            <h1>New Item Application</h1>
            {/* <img src={"https://firebasestorage.googleapis.com/v0/b/mini-ebymazon-test.appspot.com/o/itemApplication%2Faccba561-68b1-4542-949d-311ebc42a479WeChat%20Image_20190330170628.png?alt=media&token=6addc1d2-89e9-422f-94a3-6bb89532476b"}></img> */}
            <form >
                <label>
                    Title:
                    <input type="text" name={"title"} onChange={()=>{
                        this.setState({ "title": event.target.value });
                    }} />
                </label> 

                <input type="file"
                    id="itemPicture" name="itemPicture"
                    onChange={this.fileSelect}
                    accept="image/png, image/jpeg, image/jpg">
                </input>

                <label>
                    Key word:
                    <input type="text" name={"keyWord"} onChange={()=>{
                        this.setState({ "keyWord": event.target.value });
                    }}  />
                </label>
                <label>
                    price:
                    <input type="number" name={"price"} onChange={()=>{
                        this.setState({ "price": event.target.value });
                    }}  />
                </label>
                
                <div className="radio">
                    <label>
                        <input type="radio" value="Fixed_Price" checked={this.state.priceNature === 'Fixed_Price'} onChange={this.handleOptionChange} />
                        Fixed Price
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" value="Range_Price" checked={this.state.priceNature === 'Range_Price'} onChange={this.handleOptionChange} />
                        Range Price
                    </label>
                </div>

                <button type="button" onClick={()=>this.handleSubmit()} >submit</button>
            </form>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    sellerID: state.auth
  });

// const mapDispatchToProps = (dispatch) => ({
//     startAddItem: (item) => dispatch(addItem(item))
// });

export default connect(mapStateToProps)(sellItemForm);
