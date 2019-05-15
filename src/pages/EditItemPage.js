import React from 'react';
import uuid from "uuid";
import { connect } from 'react-redux';
import { database } from '../firebase/firebase';
import * as TABOO_FUNCTION from "../function/checkTaboo";
class editItemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            keywords: [""],
            itemID:"",
        };
    }

    componentDidMount =  () => {
        TABOO_FUNCTION.checkTaboo()
        .then(data=>{
            this.setState({taboolist:data});
            
            let itemID = this.props.match.params.id;
            database
                .ref('total_items')
                .child(itemID)
                .once('value')
                .then((snapshot) => {
                    let title = snapshot.val().title;
                    console.log("title",title);
                    title = TABOO_FUNCTION.convertTaboo(title,data);
                    let keywordList = snapshot.val().keywords;
                    let keywords =[];
                    for(let key in keywordList){
                        keywords.push(key);
                    }
                    this.setState({title,keywords,itemID});
                    console.log(this.state)
                })
        });
    }

    checkBlackList = (title) => {
        return database.ref('/superUser/item_blacklist')
            .once('value')
            .then(function (snapshot) {
                let blacklist = snapshot.val();
                for (let key in blacklist) {
                    if (title === key)
                        return true;
                }
                return false;
            })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit");
        this.checkBlackList(this.state.title)
            .then((isBlack) => {
                if (isBlack)
                    alert("The item is in blacklist");
                else {
                    let container = this.state;
                    let keywords = this.state.keywords;
                    let newword = {};
                    for(let key in keywords){
                        newword[keywords[key]] = true;
                    }
                    container.keywords = newword;
                    database.ref('total_items/'+this.state.itemID)
                        .update(container)
                        .then(snapshot => {
                            alert("update successfully");
                            this.props.history.push('/account');
                            window.location.reload(true);
                        });
             
                    
                }
            })


    }


    handleKeywords = event => {
        let keywords = event.target.value;
        keywords = keywords.split(/(\s+)/)
            .filter(function (e) { return e.trim().length > 0; });;
        this.setState({ keywords });
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">New Item Application</h1>
                    </div>
                </div>
                <div className="content-container">
                    <form className="form" onSubmit={this.handleSubmit}>
                        <label className="label">
                            Title:
                            <input
                                type="text"
                                required
                                name={"title"}
                                className="text-input"
                                size="25"
                                value = {this.state.title}
                                onChange={() => {
                                    this.setState({ "title": event.target.value });
                                }} />
                        </label>



                        <label className="label">
                            Keywords:
                            <input
                                type="text"
                                required
                                name={"keyWord"}
                                className="text-input"
                                onChange={this.handleKeywords}
                            />
                            <br />
                            (seperate by space ^ ^)
                        </label>

                        <div>
                            <button className="button"  >submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

//get sellerID from redux state
const mapStateToProps = (state, props) => ({
    seller: state.auth
});

export default connect(mapStateToProps)(editItemForm);
