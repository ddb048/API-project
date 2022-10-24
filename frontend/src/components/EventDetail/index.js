import React from 'react';
import { Link } from 'react-router-dom';

import './index.css'

function EventDetail({ event }) {
    console.log('event', event)
    /****************Helper Functions*********** */
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


    return (

        <Link className='link-to-group' to={`/events/${event.id}`}>
            <div className='main-group-listing'>
                <div className='listing-image'>
                    <img className='img' src={event.previewImage} />
                </div>
                <div className='group-details'>

                    <div className='date'>{`${setDate(event.startDate).toUpperCase()} @ ${setTime(event.startDate)}`}</div>

                    <div className='group-name'>Event: {event.name}</div>

                    <div className='event-group'>Group: {event.Group.name}</div>



                </div>
            </div>

        </Link >
    )
}

export default EventDetail;
