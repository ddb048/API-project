import { csrfFetch } from "./csrf";

//*******************TYPES*********************/
const LOAD_MEMBERS = 'members/LOAD'
const LOAD_ONE_MEMBERS = 'members/LOAD_ONE'
const ADD_MEMBER = 'members/ADD'
const DELETE_MEMBER = 'members/DELETE'

//****************ACTION CREATOR***************/
const loadMembers = (members, pending) => ({
    type: LOAD_MEMBERS,
    members,
    pending
})

const loadOneMember = (member, pending) => ({
    type: LOAD_ONE_MEMBERS,
    member,
    pending
})

const addMember = newMember => ({
    type: ADD_MEMBER,
    newMember
})

const deleteMember = member => ({
    type: DELETE_MEMBER,
    member
})

/********************THUNKS*********************/
//GET /api/:groupId/members (READ)
export const getAllMembers = groupId => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}/members`);

    if (response.ok) {
        const fullList = await response.json();
        let members = [];
        let pending = [];

        fullList.Members.forEach(member => member.Membership.status === "pending" ?

            pending.push(member) : members.push(member))



        dispatch(loadMembers(members, pending));
        return fullList;
    }

}


//POST /api/:groupId/members (CREATE)
export const createMembership = newMembership => async dispatch => {
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

//DELETE /api/groups/:groupId/membership/:memberId (DELETE)
export const deleteGroup = (groupId, memberId) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}/membership/${memberId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const destroyedMember = await response.json();
        dispatch(removeGroup(group));
        return await getAllMembers();
    }
}
//PUT /api/groups/:groupId/membership/:memberId (UPDATE)
export const updateGroup = (groupId, memberId) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}/membership/${memberId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            memberId,
            status: 'member'
        })
    });

    if (response.ok) {
        const member = await response.json();
        return await getAllMembers();
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
