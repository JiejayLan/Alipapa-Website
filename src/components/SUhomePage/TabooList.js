import React from 'react'
import { connect } from 'react-redux';
import * as firebase from "firebase";
import { removeTBword, addTBword } from '../../actions/SUaction';
import axios from 'axios';

class TabooList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taboo: [],
            newWord: ''
        };
            

        axios.post('/suhome', { datatype: 'TAB'}).then( (resp)=>{
            this.setState({taboo:[...resp.data]});

        }).catch( err =>{
            console.log(err);
        });
    };

    addTabooHandler = (newword) => {
        alert('Successfully added!');

        this.props.addTBword(newword);
        
        let newstate = this.state.taboo;
        newstate.push(newword);

        this.setState({taboo:[...newstate]});

    };
    
    removeTabooHandler = (word) => {
        if(confirm('Sure wanna remove this taboo word?')){
            this.props.removeTBword(word);

            let newstate = this.state.taboo.filter( w =>{
                return w !== word;
            });

            this.setState({taboo:[...newstate]});
        }
    };

    renderTBList = () => {
        

        let jsxOUlist = this.state.taboo.map( (word) =>
            <div className='float-left' key={word}>
                {word} <button className="btn-sm btn-outline-danger" onClick={()=>this.removeTabooHandler(word)}>X</button>&nbsp;&nbsp;
            </div>

        );

        return jsxOUlist;
    };


    render(){

        let resultList = this.renderTBList();

        return(
            <div>
                {resultList}
                <div className='clearfix'></div>
                <br />
                <div className="input-group">
                <div className='col-xs-3'>
                    <input className="form-control" placeholder="New Taboo word" onChange={(e)=>this.setState({newWord: e.target.value})}/>
                    </div>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" onClick={()=>this.addTabooHandler(this.state.newWord)}>Add</button>
                        </div>
                </div>
            </div>
        );
    };
};

/*const mapStateToProps = (state) => ({
    Users: state.SUmanagement
});*/

const mapDispatchToProps = (dispatch) => {
    return {
        removeTBword: (word) => dispatch( removeTBword(word)),
        addTBword: (word) => dispatch( addTBword(word))
    };
};

export default connect(null, mapDispatchToProps)(TabooList);
