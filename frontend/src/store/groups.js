import { csrfFetch } from "./csrf";

//*******************TYPES*********************/
const LOAD_GROUPS = 'groups/LOAD'
const ADD_GROUP = 'groups/ADD'
// const ADD_IMAGE = 'groups/ADD_IMAGE'
const REMOVE_GROUP = 'groups/REMOVE'
const EDIT_GROUP = 'groups/EDIT'
const LOAD_ONE_GROUP = 'groups/LOAD_ONE'
const CLEAR_ONE_GROUP = 'groups/CLEAR'

//****************ACTION CREATOR***************/
const loadGroups = groups => ({
    type: LOAD_GROUPS,
    groups
})

const addGroup = newGroup => ({
    type: ADD_GROUP,
    newGroup
})

// const addImage = image => ({
//     type: ADD_IMAGE,
//     image
// })

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

export const clearGroup = () => ({
    type: CLEAR_ONE_GROUP

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
        dispatch(getGroupDetails(newGroup));
        return newGroup;
    }
}
//POST /api/groups (CREATE)
export const addGroupImage = (groupId, image) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}/images`, {
        method: 'POST',
        body: JSON.stringify(image)
    });

    if (response.ok) {
        const newImage = await response.json();
        dispatch(getGroupDetails(groupId));
        return newImage;
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
export const updateGroup = (group, groupId) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}`, {
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
        dispatch(addGroup(group));
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

    let newState = { ...state };
    let groups;
    let oneGroup;
    switch (action.type) {

        case LOAD_GROUPS:
            // newState = { ...state };
            // groups = {};
            // action.groups.Groups.forEach(group => groups[group.id] = group);
            // newState.groups = groups;
            return { groups: { ...action.groups.Groups }, oneGroup: { ...state.oneGroup } };


        case ADD_GROUP:
            // newState = { ...state, [action.newGroup.id]: action.newGroup };
            newState.groups[action.newGroup.id] = action.newGroup;
            newState.oneGroup = action.newGroup
            return newState;


        case REMOVE_GROUP:
            newState = { ...state };
            delete newState[action.groupId];
            return newState;

        // case ADD_IMAGE:
        //     newState = { ...state };
        //     oneGroup = { ...state.oneGroup };
        //     let groupImages = [];
        //     groupImages.push(action.image);
        //     newState.oneGroup.groupImages = groupImages;
        //     return newState;

        case EDIT_GROUP:
            newState = { ...state, [action.group.id]: action.group };
            return newState;

        case LOAD_ONE_GROUP:
            oneGroup = {};
            newState.groups = { ...state.groups, [action.group.id]: action.group };
            newState.oneGroup = { ...action.group };

            return newState;

        case CLEAR_ONE_GROUP:
            newState = { ...state }
            newState.oneGroup = {}
            return newState;

        default:
            return state
    }
}
