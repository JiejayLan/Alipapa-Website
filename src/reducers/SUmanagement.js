
const SUmanagementReducer = (state = [], action) => {
    switch (action.type){
        
        case 'VIEW_USER':{
            console.log('view user', action.users);
            return action.users;}

        case 'REMOVE_USER':
            console.log('remove user', action.user);
            break;

        case 'VIEW_USER_APP':{
            console.log('view user application', action.applications);
            return action.applications;}

        case 'APP_USER_APP':
            console.log('approve user application', action.application);
            break;

        case 'DENY_USER_APP':
            console.log('deny user application', action.application);
            break;

        case 'VIEW_ITEM_APP':
            console.log('view item application', action.itemAppli);
            break;

        case 'APP_ITEM_APP':
            console.log('approve item application', action.itemAppli);
            break;

        case 'DENY_ITEM_APP':
            console.log('deny item application', action.itemAppli);

        default:
            return state;
    }
}

export default SUmanagementReducer;