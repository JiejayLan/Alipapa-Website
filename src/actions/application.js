//import database from '../firebase/firebase';
import * as firebase from 'firebase';
const database = firebase.database();

export const addApplication = (application) => ({
  type: 'ADD_APPLICATION',
  application
});

export const startAddApplication = (applicationData = {}) => {
  return (dispatch) => {
    const {
      name = '',
      password = '',
      creditCard = '', 
      address = '',
      phoneNumber = '' 
    } = applicationData;
    const application = { name, password, creditCard, address, phoneNumber };

   return database.ref('usersApplication').push(application).then((ref) => {
      dispatch(addApplication({
        id: ref.key,
        ...application
      }));
    });
  };
<<<<<<< HEAD
};
=======
};
>>>>>>> 9807621bd029a2bbc54fa5531729615125950392
