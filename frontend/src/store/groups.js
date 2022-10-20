import { csrfFetch } from "./csrf";

//*******************TYPES*********************/
const LOAD_GROUPS = 'groups/LOAD'
const ADD_GROUP = 'groups/ADD'
const REMOVE_GROUP = 'groups/REMOVE'
const EDIT_GROUP = 'groups/EDIT'
const LOAD_ONE_GROUP = 'groups/LOAD_ONE'

//****************ACTION CREATOR***************/
const loadGroups = groups => ({
    type: LOAD_GROUPS,
    groups
})

const addGroup = newGroup => ({
    type: ADD_GROUP,
    newGroup
})

const removeGroup = groupId => ({
    type: REMOVE_GROUP,
    groupId
})

const editGroup = group => ({
    type: EDIT_GROUP,
    group
})

const loadOneGroup = group => ({
    type: LOAD_ONE_GROUP,
    group
})

/********************THUNKS*********************/
//GET /api/groups (READ)
export const getAllGroups = () => async dispatch => {
    const response = await csrfFetch('/api/groups');

    if (response.ok) {
        const groups = await response.json();
        dispatch(loadGroups(groups));
        return groups;
    }

}
//POST /api/groups (CREATE)
export const createGroup = (newGroup) => async dispatch => {
    const response = await csrfFetch('/api/groups', {
        method: 'POST',
        body: JSON.stringify(newGroup)
    });

    if (response.ok) {
        const newGroup = await response.json();
        dispatch(addGroup(newGroup));
        return newGroup;
    }
}
//DELETE /api/groups/:groupId (DELETE)
export const deleteGroup = (groupId) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const group = await response.json();
        dispatch(removeGroup(group));
        return group;
    }
}
//PUT /api/groups/:groupId (UPDATE)
export const updateGroup = group => async dispatch => {
    const response = await csrfFetch(`/api/groups/${group.id}`, {
        method: 'PUT',
        body: JSON.stringify(group)
    });

    if (response.ok) {
        const group = await response.json();
        dispatch(editGroup(group));
        return group;
    }
}
//GET /api/groups/:groupId (READ1)
export const getGroupDetails = groupId => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}`);
    if (response.ok) {
        const group = await response.json();
        dispatch(loadOneGroup(group));
        console.log('group from thunk', group)
        return group;
    }
}
/*******************REDUCER********************/
const initialState = {
    groups: {},
    oneGroup: {}
}


export const groupReducer = (state = initialState, action) => {

    let newState;
    let groups;
    switch (action.type) {

        case LOAD_GROUPS:
            newState = { ...state };
            groups = {};
            action.groups.Groups.forEach(group => groups[group.id] = group);
            newState.groups = groups;
            return newState;


        case ADD_GROUP:
            newState = { ...state };
            delete newState[action.groupId];
            return newState;

        case EDIT_GROUP:
            newState = { ...state, [action.group.id]: action.group };
            return newState;

        case LOAD_ONE_GROUP:
            let oneGroup = {};
            newState = { ...state };
            oneGroup = { ...action.group };
            newState.oneGroup = oneGroup;

            return newState;

        default:
            return state
    }
}
