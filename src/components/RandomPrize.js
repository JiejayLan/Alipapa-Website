import React from 'react';
import { database } from '../firebase/firebase';
import { connect } from 'react-redux';

class RandomPrize extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prizeArr: ['Better Luck Next Time!', '$5', '$10', '$25'],
      randomPrize: '',
      prize: '',
      displayButton: true
    }
  }

  // credit: Generate A Weighted Random Number -- doelleri & maerics 
  weightedRand(spec) {
    let sum = 0;
    let r = Math.random();
    for (let i in spec){
      sum += spec[i];
      if(r <= sum) return i;
    }
  }

  pickPrize = () =>{
    const PRIZE_ARR = this.state.prizeArr;

    const INTERVAL = setInterval(() => {
      let random = Math.floor(Math.random()*PRIZE_ARR.length);
      let randomPrize = PRIZE_ARR[random];
      this.setState( () => ({randomPrize}));
    }, 100);

    //INDEX:percentage
    const INDEX = this.weightedRand({0:0.9, 1:0.05, 2:0.03, 3:0.02});
    let prize = PRIZE_ARR[INDEX];

    setTimeout( () => {
      clearInterval(INTERVAL);
      this.setState(() => ({
        randomPrize: '',
        prize,
        displayButton: false
      }));
    },2000);

    if (prize.charAt(0) === '$') {

      const USERID = this.props.auth.userID;
      database.ref(`users/${USERID}/balance`).once('value').then((snapshot) => {
        let balance = snapshot.val();
        console.log(balance);
        balance += parseInt(prize.substr(1));
        console.log(balance);
        database.ref(`users/${USERID}`).update({balance});
      });
    }
  }

  render() {
    const PRIZE = this.state.prize;
    const RANDOM_PRIZE = this.state.randomPrize;

    return (
      <div className="content-container">
        {
          this.state.displayButton === true ? (        
            <div className="content-container">
              <h2 className="form__error">Before Checkout, Win a Prize!</h2>
              <button className="button" onClick={this.pickPrize}>
                Try Your Luck
              </button>
           </div>
          ) : ''
        }
          
        {
          !!(RANDOM_PRIZE) ? (
            <div className="content-container">
              <h2 className="form__error">Randomizing Prize...</h2>
              <h2 className="form__error">{RANDOM_PRIZE}</h2>
            </div>
          ) : ''
        }

        {
          !!(PRIZE) ? (
            <div className="content-container">
              {
                PRIZE.charAt(0) === '$' ? (
                  <h2 className="form__error">
                    {`Congratulation! Your won ${PRIZE}! ${PRIZE} added to your balance.`}
                  </h2>
                ) : (
                  <h2 className="form__error">
                    {`${PRIZE}`}
                  </h2>
                )
              }
            </div>
          ) : ''
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(RandomPrize);