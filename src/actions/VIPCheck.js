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

  return database.ref(`${userURL}/rating`).once('value').then((snapshot) => {
    const RATING = snapshot.val();
    console.log(`rating: ${RATING}`);

    if(RATING >= 4){
      return database.ref(`${userURL}/rater_number`).once('value').then((snapshot) => {
        const RATER_NUMBER = snapshot.val();
        console.log(`raters: ${RATER_NUMBER}`);

        if (RATER_NUMBER >= 3){
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