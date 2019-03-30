import React from 'react';
import {addItem} from "../actions/sellItem";
import { connect } from 'react-redux';

class sellItemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            priceNature: "",
            title: "",
            keyWord:"",
            price:0
        };
    }

    handleSubmit(event) {
        console.log({sellerID,...this.state});
        let sellerID = this.props.sellerID;
        this.props.startAddItem({sellerID,...this.state});
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

    render() {
        return (
            <form >
                <label>
                    Name:
                    <input type="text" name={"title"} onChange={()=>{
                        this.setState({ "title": event.target.value });
                    }} />
                </label> 
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
        );
    }
}

const mapStateToProps = (state, props) => ({
    sellerID: state.auth
  });

const mapDispatchToProps = (dispatch) => ({
    startAddItem: (item) => dispatch(addItem(item))
  });

export default connect(mapStateToProps, mapDispatchToProps)(sellItemForm);
