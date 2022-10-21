import { csrfFetch } from "./csrf";

//*******************TYPES*********************/
const LOAD_EVENTS = 'events/LOAD'
const REMOVE_EVENT = 'events/REMOVE'
const EDIT_EVENT = 'events/EDIT'
const LOAD_ONE_EVENT = 'events/LOAD_ONE'

//****************ACTION CREATOR***************/
const loadEvents = events => ({
    type: LOAD_EVENTS,
    events
})

// const addevent = newevent => ({
//     type: ADD_event,
//     newevent
// })

// const addImage = image => ({
//     type: ADD_IMAGE,
//     image
// })

const removeEvent = eventId => ({
    type: REMOVE_EVENT,
    eventId
})

const editEvent = event => ({
    type: EDIT_EVENT,
    event
})

const loadOneEvent = event => ({
    type: LOAD_ONE_EVENT,
    event
})

/********************THUNKS*********************/
//GET /api/events (READ)
export const getAllEvents = () => async dispatch => {
    const response = await csrfFetch('/api/events');

    if (response.ok) {
        const events = await response.json();
        dispatch(loadEvents(events));
        return events;
    }

}
//POST /api/events (CREATE)
export const createEvent = (newEvent) => async dispatch => {
    const response = await csrfFetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(newEvent)
    });

    if (response.ok) {
        const newEvent = await response.json();
        dispatch(geteventDetails(newEvent));
        return newEvent;
    }
}
//POST /api/events (CREATE)
export const addEventImage = (eventId, image) => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}/images`, {
        method: 'POST',
        body: JSON.stringify(image)
    });

    if (response.ok) {
        const newImage = await response.json();
        dispatch(getEventDetails(eventId));
        return newImage;
    }
}
//DELETE /api/events/:eventId (DELETE)
export const deleteEvent = (eventId) => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const event = await response.json();
        dispatch(removeEvent(event));
        return event;
    }
}
//PUT /api/events/:eventId (UPDATE)
export const updateEvent = event => async dispatch => {
    const response = await csrfFetch(`/api/events/${event.id}`, {
        method: 'PUT',
        body: JSON.stringify(event)
    });

    if (response.ok) {
        const event = await response.json();
        dispatch(editEvent(event));
        return event;
    }
}
//GET /api/events/:eventId (READ1)
export const geteventDetails = eventId => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}`);
    if (response.ok) {
        const event = await response.json();
        dispatch(loadOneEvent(event));
        console.log('event from thunk', event)
        return event;
    }
}
/*******************REDUCER********************/
const initialState = {
    events: {},
    oneevent: {}
}


export const eventReducer = (state = initialState, action) => {

    let newState = {};
    let events;
    let oneEvent;
    switch (action.type) {

        case LOAD_EVENTS:
            newState = { ...state };
            events = {};
            action.events.events.forEach(event => events[event.id] = event);
            newState.events = events;
            return newState;


        // case ADD_event:
        //     newState = { ...state, [action.newevent.id]: action.newevent };
        //     return newState;


        case REMOVE_EVENT:
            newState = { ...state };
            delete newState[action.eventId];
            return newState;

        // case ADD_IMAGE:
        //     newState = { ...state };
        //     oneevent = { ...state.oneevent };
        //     let eventImages = [];
        //     eventImages.push(action.image);
        //     newState.oneevent.eventImages = eventImages;
        //     return newState;

        case EDIT_EVENT:
            newState = { ...state, [action.event.id]: action.event };
            return newState;

        case LOAD_ONE_EVENT:
            oneEvent = {};
            newState.events = { ...state.events, [action.event.id]: action.event };
            newState.oneevent = { ...action.event };

            return newState;

        default:
            return state
    }
}