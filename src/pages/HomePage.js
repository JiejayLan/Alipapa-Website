import React from 'react';
import ItemList from '../components/homePage/ItemList';
import { connect } from 'react-redux';
import * as firebase from "firebase";
import {database,storage} from '../firebase/firebase';
import axios from 'axios';

class Homepage extends React.Component {
    constructor(){
        super();
        this.state = {
            total_items : {},
            searchKeyword: ''
        };

    }
    
    render() {

        //simple in-line style for search area
        const divstyle = {
        //padding: '10px',
        margin: 'auto',
        textAlign: 'center'
        }

        //simple in-line style for search bar
        const sbarstyle = {
        width: '30vw',
        height: '30px',
        border: '2px solid aqua'
        }
        
        return (
        <div>
            <div className='text-center' style={divstyle}>
              <h1>AliPaPa</h1>
              <p>Let shopping sets you free</p>
            </div>
            <form>
            <div style={divstyle}>
                <input style={sbarstyle} type='text' placeholder='search...' 
                    onChange={(e)=>this.setState({searchKeyword: e.target.value})} />
            </div>
            </form>
            <ItemList />
            {/*<ItemList items={this.state.total_items} keyword={this.state.searchKeyword} />*/}
            
        </div>
        );
    }
}

export default Homepage;
