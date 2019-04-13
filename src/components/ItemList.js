import React from 'react'

const ItemList = (props) =>{
    
    const keyword = props.keyword;

    let itemlist = { };
    let itemlt = {...props.items};

    Object.filter = (obj, func) => 
    Object.assign(...Object.keys(obj)
        .filter( key => func(obj[key]) )
        .map( key => ({ [key]: obj[key] }) ) );

    if(keyword !== ''){
        itemlist = Object.filter(itemlt, item => 
            item.name.toLowerCase().includes( keyword.toLowerCase() ) );
    }
    else{
        itemlist = itemlt;
    }

    let keys = [];
    keys = Object.keys(itemlist);

    let fianlist = [];

    for( let i = 0; i < keys.length; i++){
        if(itemlist[keys[i]].hasOwnProperty('price') ===false){
          itemlist[keys[i]].price = "let's bid";
        }
        fianlist.push(itemlist[keys[i]]);
    }

    let display = fianlist.map( (item) =>
        <div className='col-9 mx-auto col-md-6 col-lg-3 my-3 rounded float-left'>
            <div className='card'>
                {/*<div className='img-container p-5'>
                    <img src={item.img} className='card-img-top' alt='item'/>
                </div>*/}
                <div className='card-footer d-flex justify-content-between'>
                  <p className='align-self-center mb-0'>{item.name}</p>
                  <h5 className='text-blue font-italic mb-0'>${item.price}</h5>
                </div>
            </div>

        </div>
    )
    return display;
};


export default ItemList;
