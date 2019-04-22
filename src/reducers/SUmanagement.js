const initState = {
    projects: [
        {if: '1', title: 'what', content: 'go'},
        {id: '2', title: 'wha2t', content: 'g4o'},
        {id: '3', title: 'wha3t', content: 'g1o'},
    ]
}

const SUmanagementReducer = (state = initState, action) => {
    switch (action.type){
        case 'VIEW_USER':
            console.log('view user', action.user);
        case 'REMOVE_USER':
            console.log('remove user', action.user);
        case 'VIEW_USER_APP':
            console.log('view user application', action.application);
        case 'APP_USER_APP':
            console.log('approve user application', action.application);
        case 'DENY_USER_APP':
            console.log('deny user application', action.application);
        case 'VIEW_ITEM_APP':
            console.log('view item application', action.itemAppli);
        case 'APP_ITEM_APP':
            console.log('approve item application', action.itemAppli);
        case 'DENY_ITEM_APP':
            console.log('deny item application', action.itemAppli);
    }

    return state;
}

export default SUviewDataReducer;