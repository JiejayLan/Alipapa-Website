import React from 'react';
import ItemList from './ItemList';

class Homepage extends React.Component {
    
    state = {
        ItemID : [
            {
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
            }
        ],
        searchKeyword: ''
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

            <ItemList items={this.state.ItemID} keyword={this.state.searchKeyword} />
            
        </div>
        );
    }
}

export default Homepage;
