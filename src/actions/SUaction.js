import {database} from '../firebase/firebase';

export const viewUser = (users) => {
    return {
        type: 'VIEW_USER',
        users
    }
};

export const removeUser = (user) => {
    return (dispatch, getState) => {

        dispatch({
            type: 'REMOVE_USER',
            user
        })
    }
};

export const viewUserApplication = (applications) => {
    return {
        type: 'VIEW_USER_APP',
        applications
    }
};

export const ApproveUserApplication = (application) => {
    return (dispatch, getState) => {

        dispatch({
            type: 'APP_USER_APP',
            application
        })
    }
};

export const DenyUserApplication = (application) => {
    return (dispatch, getState) => {

        dispatch({
            type: 'DENY_USER_APP',
            application
        })
    }
};

export const viewItemApplication = (itemAppli) => {
    return {
            type: 'VIEW_ITEM_APP',
            itemAppli
    }
}

export const ApproveItemApplication = (itemAppli) => {
    return (dispatch, getState) => {

        dispatch({
            type: 'APP_ITEM_APP',
            itemAppli
        })
    }
};

export const DenyItemApplication = (itemAppli) => {
    return (dispatch, getState) => {

        dispatch({
            type: 'DENY_ITEM_APP',
            itemAppli
        })
    }
};