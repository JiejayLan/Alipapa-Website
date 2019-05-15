import React from 'react'
import { connect } from 'react-redux';
import * as firebase from "firebase";
import { removeItem, addItemToBl, checkUsername } from '../../actions/SUaction';
import axios from 'axios';

class SUviewItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };

        axios.post('/suhome', { datatype: 'ITEMS'}).then( async (resp)=>{
            let obj = resp.data;
            let objkeys = Object.keys(obj);

            for( let i = 0; i < objkeys.length; i++ ){
                if(obj[objkeys[i]].status === 'order'){
                    delete obj[objkeys[i]];
                }
                else{
                   let sellername = await checkUsername(obj[objkeys[i]].seller);
                   obj[objkeys[i]].sellername = sellername;
                }
            }
            this.setState({...obj});

        }).catch( err =>{
            console.log(err);
        });
    };

    removeHandler = (uid) => {
        if(confirm("Are you sure to remove this item?")){
            if(confirm("The item removed will be add to black list")){
                
                this.props.addItemToBl(this.state[uid].title);
                this.props.removeItem(uid);

                delete this.state[uid];

                let newState = this.state;
                this.setState({...newState});
            }
        }
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
                <div className='card-content'>
                    <span className='card-title'>{item.title}</span>
                    <br /><br />
                    item type: {item.price_type}<br />
                    seller: {item.sellername}<br />
                    status: {item.status}<br />
                </div>
                <div className='card-action'>
                    <button className="btn btn-outline-danger" 
                        onClick={()=>this.removeHandler(item.itemID, item.status)}>remove</button>
                </div>
            </div>
            </div>
        );

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

/*const mapStateToProps = (state) => ({
    Users: state.SUmanagement
});*/

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (item) => dispatch( removeItem(item)),
        addItemToBl: (item) => dispatch( addItemToBl(item))
    };
};

export default connect(null, mapDispatchToProps)(SUviewItems);
