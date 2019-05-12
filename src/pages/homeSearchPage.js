import React from 'react'
import axios from 'axios';
import * as firebase from "firebase";
import { connect } from 'react-redux';
import Hotness from '../components/homePage/hotness';
import {Link} from 'react-router-dom';

class HomeSearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            keyword : props.match.params.keyword
        };

        axios.post('/home').then( (resp)=>{
            
            this.setState({items: {...resp.data}});

        }).catch( err =>{
            console.log(err);
        });
    };


    renderItemList = () => {
        const Itemkeys = Object.keys(this.state.items);
        let Itemlist = [];

        let keyw = this.state.keyword;
        if( typeof(keyw) !== 'string'){
            keyw = keyw.toString();
        }
        
        const searchword = keyw.toLowerCase();

        const cardimg = {
            width: '100%',
            height: '28vw',
            objectFit: 'cover'
        }

        for(let i = 0; i < Itemkeys.length; i++){
            let item = this.state.items[Itemkeys[i]];
            
            if( item.status ==='expired' || item.status ==='order')
                continue;

            if( item.title.toLowerCase().indexOf(searchword) >-1 ||
                item.description.toLowerCase().indexOf(searchword) >-1 ||
                item.price_type.toLowerCase().indexOf(searchword) >-1 ||
                JSON.stringify(item.keywords).toLowerCase().indexOf(searchword) > -1 ){
                    Itemlist.push(item);
                }
        }

        Itemlist.sort( (a, b) => (a.hotness < b.hotness ) ? 1 : -1 );

        let jsxOUlist = Itemlist.map( (item) =>
            <div key={item.itemID}>
                <Link className="list-item__title--link" to={`/items/${item.itemID}`}>
                    <div className='col-9 mx-auto col-md-6 col-lg-3 my-3 rounded float-left'>
                        <div className='card'>
                            <div className='img-container p-5'>
                            <img src={item.url} className='card-img-top img-fluid' alt='item' style={cardimg}/>
                            </div>
                            <div className='card-footer d-flex justify-content-between'>
                                <p className='align-self-center mb-0'>{item.title}</p>
                                <h5 className='text-blue font-italic mb-0'><span>&#36;</span>{item.price.current}</h5>
                            </div>
                            <p className='float-left'>&nbsp;&nbsp;Hotness: <Hotness count={item.hotness}/></p>
                        </div>

                    </div>
                </Link>
            </div>
    )

        return jsxOUlist;
    };


    render(){

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

        let resultList = this.renderItemList();

        return(
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
                {resultList}
            </div>
        );
    };
};


export default HomeSearchPage;
