import React from 'react';
import ItemList from './ItemList';
import { connect } from 'react-redux';
import * as firebase from "firebase";
import {database,storage} from '../firebase/firebase';

class Homepage extends React.Component {
    constructor(){
        super();
        this.state = {
            total_items = {},
                /*{
                    name: 'Garbage Can',
                    img:'https://images-na.ssl-images-amazon.com/images/I/91t4TlUrzuL._SL1500_.jpg',
                    price:'$25.99',
                    link:'ItemPage'
                },
                {
                    name: 'Dummy1',
                    img:'',
                    price:'$123',
                    link:''
                },
                {
                    name: 'Dummy2',
                    img:'',
                    price:'$123',
                    link:''
                },
                {
                  name: 'Dummy3',
                  img:'',
                  price:'$123',
                  link:''
                },
                {
                  name: 'Dummy4',
                  img:'',
                  price:'$123',
                  link:''
                }*/
            searchKeyword: ''
        };
    }

    componentDidMount() {
        //let itemList = "";
        const rootRef = firebase.database().ref("total_items");
        
          rootRef.on("value", (snapshot) => {
            //let terms = snapshot.val();
            // Store all the itemIDs in array
            console.log(snapshot.val());
            let items = snapshot.val();
            /*snapshot.forEach( (snap)=>{
                let row = snap.val();
                items.push(row);
            })*/

            // Store array into state
            let addinstate = {...this.state.total_items};
            addinstate = {...items};
            this.setState({total_items:addinstate});
            
            //checking 
            console.log(this.state);
        });
    }
    
    render() {

        //simple in-line style for search area
        const divstyle = {
        display:'table',
        padding: '20px',
        margin: 'auto'
        }

        //simple in-line style for search bar
        const sbarstyle = {
        width: '30vw',
        height: '30px',
        border: '2px solid aqua'
        }

        return (
        <div>
            <div className='text-center'>
              <h1>AliPaPa</h1>
              <p>Let shopping sets you free</p>
            </div>
            <form>
            <div style={divstyle}>
                <input style={sbarstyle} type='text' placeholder='search...' 
                    onChange={(e)=>this.setState({searchKeyword: e.target.value})} />
            </div>
            </form>

            {/*<ItemList items={this.state.total_items} keyword={this.state.searchKeyword} />*/}
            
        </div>
        );
    }
}

export default Homepage;
