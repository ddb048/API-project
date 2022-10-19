import { csrfFetch } from "./csrf";

//*******************TYPES*********************
const LOAD_GROUPS = 'groups/LOAD'
const ADD_GROUP = 'groups/ADD'
const REMOVE_GROUP = 'groups/REMOVE'
const EDIT_GROUP = 'groups/EDIT'
const LOAD_ONE_GROUP = 'groups/LOAD_ONE'

//****************ACTION CREATOR***************
const loadGroups = groups => ({
    type: LOAD_GROUPS,
    groups
})

const addGroup = newGroup => {
    type: ADD_GROUP,
        newGroup
}
/********************THUNKS*********************
export const getAllGroups = () => async dispatch => {
    const response = await fetch('/api/groups');

    if (response.ok) {
        const groups = await response.json();
        console.log('groups ', groups);
        dispatch(loadGroups(groups));
    }
    return groups;
}

//*******************REDUCER********************
const initialState = {
    groups: {}
}


export const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_GROUPS:
            const allGroups = {};
            action.groups.reduce((accum, curr) => {
                accum[curr.id] = curr;
                return accum;
            }, allGroups);
            return { ...state, allGroups }

        default:
            return state
    }
}
