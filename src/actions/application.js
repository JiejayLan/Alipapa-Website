import {database} from '../firebase/firebase';

export const addApplication = (application) => ({
  type: 'ADD_APPLICATION',
  application
});

export const startAddApplication = (applicationData = {}) => {
  return (dispatch) => {
    const {
      username = '',
      password = '',
      credit_card = '', 
      address = '',
      phone_number = '' 
    } = applicationData;
    const application = { username, password, credit_card, address, phone_number };

   return database.ref('user_application').push(application).then((ref) => {
      dispatch(addApplication({
        userID: ref.key,
        ...application
      }));
    });
  };
};
