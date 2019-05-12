import React from 'react';
import ItemList from '../components/homePage/ItemList';
import { connect } from 'react-redux';
import * as firebase from "firebase";
import {database,storage} from '../firebase/firebase';
import axios from 'axios';
import {Link} from 'react-router-dom';

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
                { (this.state.searchKeyword !== '') && (
                <Link className="list-item__title--link" to={`/home/${this.state.searchKeyword}`}>
                    <button className='btn btn-outline-info btn-lg'>search</button>
                </Link>)}
                { (this.state.searchKeyword === '') && (
                    <button className='btn btn-outline-info btn-lg'>search</button>
                )}
            </div>
            </form>
            <ItemList />
            
        </div>
        );
    }
}

export default Homepage;
