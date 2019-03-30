import React from 'react';
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "",
            Name: '',
            Quantity:"",
            Description:""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };
    getInitialState= function () {
        return {
          selectedOption: 'option1'
        };
      };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" name={"Name"} onChange={()=>{
                        this.setState({ "Name": event.target.value });
                    }} />
                </label> 
                <label>
                    Description:
                    <input type="text" name={"Description"} onChange={()=>{
                        this.setState({ "Description": event.target.value });
                    }}  />
                </label>
                <label>
                    Quantity:
                    <input type="number"  onChange={()=>{
                        this.setState({ "Quantity": event.target.value });
                    }}  />
                </label>
                
                <div className="radio">
                    <label>
                        <input type="radio" value="Fixed_Price" checked={this.state.selectedOption === 'option1'} onChange={this.handleOptionChange} />
                        Fixed Price
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" value="Range_Price" checked={this.state.selectedOption === 'option2'} onChange={this.handleOptionChange} />
                        Range Price
                    </label>
                </div>


                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default NameForm;