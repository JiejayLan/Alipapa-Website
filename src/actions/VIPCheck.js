import {database} from '../firebase/firebase';

export const VIPCheckSpending = (userID) => {
  const userURL = `users/${userID}`;

  return database.ref(`${userURL}/total_spending`).once('value').then((snapshot) => {
    const TOTAL_SPENDING = snapshot.val();

    console.log(TOTAL_SPENDING);
    if (TOTAL_SPENDING > 500){
      return database.ref(`${userURL}/warn_count`).once('value').then((snapshot) => {
        const WARN_COUNT = snapshot.val();
        console.log(WARN_COUNT);

        if (WARN_COUNT === 0){
          database.ref(`${userURL}/`).update({user_type: "VIP OU"});
        } else {
          database.ref(`${userURL}/`).update({user_type: "OU"});
        }
      });
    } else {
      database.ref(`${userURL}/`).update({user_type: "OU"});
    }
  });

}

export const VIPCheckRating = (userID) => {
  const userURL = `users/${userID}`;
  database.ref(`${userURL}/rating`).once('value').then((snapshot) => {
    const RATING = snapshot.val();
    //console.log(`rating: ${RATING}`);
 
    if(RATING >= 4){
      database.ref(`users/${userID}/grade`).once('value').then((snapshot) => {
        let counter = 0;
        const GRADES = snapshot.val();
        for (let grade in GRADES){
          counter += 1;
        }
        //console.log(`counter: ${counter}`);
        if (counter >= 3){
          database.ref(`${userURL}/`).update({user_type: "VIP OU"});
        } else {
          database.ref(`${userURL}/`).update({user_type: "OU"});
        }
      });
    } else {
      database.ref(`${userURL}/`).update({user_type: "OU"});
    }
  });
}