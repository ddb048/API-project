import React from 'react';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../../store/events';
import EventDetail from '../EventDetail';
import './index.css'

function Events() {
    const dispatch = useDispatch();

    /***************State************** */

    const eventsObj = useSelector(state => state.events.events)
    const events = Object.values(eventsObj);


    /*******************Helper Functions*********** */

    const upcomingEvents = events.filter(event => event.startDate >= new Date().toISOString());
    const sortedEvents = upcomingEvents.sort((eventA, eventB) => new Date(eventA.date) - new Date(eventB.date));

    /**************Use Effect************** */

    useEffect(() => {
        dispatch(getAllEvents())
    }, [dispatch])

    let eventsList;
    if (sortedEvents.length > 0) {
        eventsList = (
            sortedEvents.map(event => (
                <EventDetail key={event.id} event={event} />
            ))
        )
    } else {
        eventsList = (
            <>
                <div className='eventsList-div'>There are currently no upcoming Events!</div>
                <Link to={'/events/new'} className='create-events-button'>Start an Event!</Link>
            </>
        )
    }

    return (
        <div className='ge-main'>
            <div className='groups-inner-container'>
                <Link className='ge-title' to={'/events'}>Events</Link>
                <Link className='ge-title' to={'/groups'}>Groups</Link>
            </div>
            <div className='groupList'>
                {eventsList}
            </div>

        </div>
    )
}

export default Events;
