import React from 'react';
import { Link } from 'react-router-dom';

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

        <Link to={`/events/${event.id}`}>
            <div className='event-container'>
                <div className='event-img'>
                    <img className='img' src={event.previewImage} />
                    <div className='date'>{`${setDate(event.startDate).toUpperCase()} @ ${setTime(event.startDate)}`}</div>
                </div>
                <div className='event-info'>

                    <h2 className='h2'>{event.name}</h2>
                    <div className='event-info'>
                        <div className='event-group'>{event.Group.name}</div>


                    </div>
                </div>
            </div>
        </Link>
    )
}

export default EventDetail;
