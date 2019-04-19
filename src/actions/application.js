import {database} from '../firebase/firebase';

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

   return database.ref('user_application').push(application).then((ref) => {
      dispatch(addApplication({
        id: ref.key,
        ...application
      }));
    });
  };
};
