import { csrfFetch } from './csrf';
//TYPES
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';


//ACTIONS

//action creator to set a User
const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};
//action creator to remove the User
const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

//THUNKS

//login thunk action
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    //uses the csrfFetch function to ensure proper auth
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data));
    return response;
};

//logout thunk action
export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};

//restore User thunk action
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data));
    return response;
};

//signup User thunk action
export const signup = (user) => async (dispatch) => {
    const { firstName, lastName, username, email, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data));
    return response;
};

const initialState = { user: null };


//REDUCER
const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
