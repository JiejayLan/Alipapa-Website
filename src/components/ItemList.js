import React from 'react'

const ItemList = (props) =>{
    
    const keyword = props.keyword

    let itemlist = [];
    let itemlt = [...props.items];

    if(keyword !== ''){
        itemlist = itemlt.filter( (stuff) =>
            stuff[0].name.toLowerCase().includes( keyword.toLowerCase() )
        )
    }

    else{
        itemlist = itemlt;
    }

    let display = itemlist.map( (item) =>
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
