import { csrfFetch } from "./csrf";

//TYPES
const LOAD_GROUPS = 'groups/LOAD'

//ACTION CREATOR
const loadGroups = groups => ({
    type: LOAD_GROUPS,
    groups
})

//THUNKS
export const getAllGroups = () => async dispatch => {
    const response = await fetch('/api/groups');

    if (response.ok) {
        const groups = await response.json();
        console.log('groups ', groups);
        dispatch(loadGroups(groups));
        return groups;
    }
}

//REDUCER
const initialState = {
    allGroups: {},
    Group: {
        groupImages: [],
        organizer: {},
        venues: []
    }
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
