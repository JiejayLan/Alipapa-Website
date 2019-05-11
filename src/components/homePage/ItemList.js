import React from 'react'
import axios from 'axios';
import * as firebase from "firebase";
import { connect } from 'react-redux';

class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };

        axios.post('/home').then( (resp)=>{
            
            this.setState({...resp.data});

        }).catch( err =>{
            console.log(err);
        });
    };


    renderItemList = () => {
        const Itemkeys = Object.keys(this.state);
        let Itemlist = [];

        for(let i = 0; i < Itemkeys.length; i++){

            Itemlist.push(this.state[Itemkeys[i]]);
        }

        let jsxOUlist = Itemlist.map( (item) =>
        <div className='col-9 mx-auto col-md-6 col-lg-3 my-3 rounded float-left' key={item.itemID}>
            <div className='card'>
                <div className='img-container p-5'>
                    <img src={item.url} className='card-img-top' alt='item'/>
                </div>
                <div className='card-footer d-flex justify-content-between'>
                  <p className='align-self-center mb-0'>{item.title}</p>
                  <h5 className='text-blue font-italic mb-0'>$ {item.price.current}</h5>
                </div>
            </div>

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
