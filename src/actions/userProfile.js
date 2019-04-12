import * as firebase from 'firebase';
const database = firebase.database();

//change the reference point when the basic firebase
//structure is set up

//a profile is used to be an application
//once application get approved by SU
//it will be an available profile to edit and set

export const editProfile = (id, updates) => ({
  type: 'EDIT_PROFILE',
  id,
  updates
});

export const startEditProfile = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/profile`).update(updates).then(() => {
      dispatch(editProfile(id, updates));
    });
  };
};

export const setProfile = (profile) => ({
  type: 'SET_PROFILE',
  profile
});

//fetch user profile from firebase at the start of app after they login
export const startSetProfile = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/profile`).once('value').then((snapshot) => {
      const profile = snapshot.val();
      dispatch(setProfile(profile));
    });
  }
};