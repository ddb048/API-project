import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent, getEventDetails, getEventsByGroup, removeEvent } from '../../store/events';
import { getGroupDetails } from '../../store/groups';
import { useParams, useHistory, Link } from 'react-router-dom';


function OneEventDetail() {
    const { eventId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    /**************State************* */

    const event = useSelector(state => state.events.oneEvent);
    console.log('event from OneEventDetail', event)
    const group = useSelector(state => state.groups.oneGroup);
    const user = useSelector(state => state.session.user);

    /**************Use Effect***************** */

    useEffect(() => {
        dispatch(getEventDetails(eventId))

    }, [dispatch])

    useEffect(() => {
        if (event.Group) {
            dispatch(getGroupDetails(event.Group.id))
        }
    }, [event])

    /**************Helper Function*********** */
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteEvent(eventId));
        history.push('/events');
    }

    let setDate = (date) => {
        let dateStr = new Date(date).toDateString();
        let dateSplit = dateStr = dateStr.split(' ');
        let returnDate = `${dateSplit[0]}, ${dateSplit[1]}, ${dateSplit[2]}`;
        return returnDate
    }

    let setTime = (time) => {
        let timeStr = new Date(time).toLocaleTimeString();
        let timeSplit = timeStr.split(':');
        let returnTime = `${timeSplit[0]}:${timeSplit[1]} ${timeSplit[2][3]}M`;
        return returnTime
    }

    return (event && event.EventImages && group && group.GroupImages &&
        <div className='main'>
            <div className='top-main'>
                <div className='title'>{event.name}</div>
                <div className='organizer-container'>
                    <div className='Organizer'>Event Organizer</div>
                    <div className='organizer-name'>{group.Organizer?.firstName} {group.Organizer?.lastName}</div>
                </div>

                <div className='left-side'>
                    <div className='event-img'>
                        <img className='img' src={event.EventImages[0].url} />
                    </div>
                    <div className='details-container'>
                        <div className='title'>Details</div>
                        <div className='event-details'>{event.description}</div>
                        <div className='event-price'>Price: ${event.price}</div>
                        <div className='date'>{`${setDate(event.startDate).toUpperCase()} @ ${setTime(event.startDate)}`}</div>
                        <div className='attending'>Attending: {event.numAttending} Guests</div>
                        <div className='capacity'>Capacity: {event.capacity}</div>
                    </div>
                </div>

                <div className='right-side'>
                    <Link className='group-container' to={`/groups/${group.id}`}>
                        <img className='group-img' src={group.GroupImages[0].url} />
                        <div className='group-details'>
                            {event.Group &&
                                <>
                                    <div className='group-title'>{event.Group.name}</div>
                                    <div className='group-private'>This group is: {event.Group.private ? 'Private' : 'Public'}</div>
                                </>
                            }
                        </div>
                    </Link>
                </div>
                <div className='owner-button'>
                    {user && group && user.id === group.organizerId &&
                        <button className='delete button' onClick={handleDelete}>Delete Event</button>}
                </div>
            </div>
        </div>
    )
}

export default OneEventDetail;
