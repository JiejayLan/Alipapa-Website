import React from 'react'

class Hotness extends React.Component {
    constructor(props) {
        super(props);
    };

    renderfire(){
        let fireList = [];

        for(let i = 0; i < this.props.count; i++){
            fireList.push(i);
        }

        let lis = fireList.map( (fire) =>{
            return(
            <span className="glyphicon"
                key={fire}>&#xe104;</span>)

        })
        return lis;
    }

    render(){
        let lis = this.renderfire();
        return(
            <span>
                {lis}
            </span>
        );
    };
};


export default Hotness;