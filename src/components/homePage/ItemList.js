import React from 'react'
import axios from 'axios';
import * as firebase from "firebase";
import { connect } from 'react-redux';
import Hotness from './hotness';
import {Link} from 'react-router-dom';

class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {}

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

        for(let i = 0; i < Itemkeys.length; i++){
            let item = this.state.items[Itemkeys[i]];

            if( item.status ==='expired' || this.state.items[Itemkeys[i]].status ==='order')
                continue;
            
            Itemlist.push(item);
        }

        Itemlist.sort( (a, b) => (a.hotness < b.hotness ) ? 1 : -1 );

        let jsxOUlist = Itemlist.map( (item) =>
            <div key={item.itemID}>
                <Link className="list-item__title--link" to={`/items/${item.itemID}`}>
                    <div className='col-9 mx-auto col-md-6 col-lg-3 my-3 rounded float-left'>
                        <div className='card'>
                            <div className='img-container p-5'>
                            <img src={item.url} className='card-img-top' alt='item'/>
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

        let resultList = this.renderItemList();

        return(
            <div>
                {resultList}
            </div>
        );
    };
};


export default ItemList;
