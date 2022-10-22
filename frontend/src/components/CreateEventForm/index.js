import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { createEvent } from '../../store/events';
import { getAllGroups } from '../../store/groups';
import { addEventImage } from '../../store/events';

import './index.css';

const defaultDate = () => {
    const newDate = new Date().toISOString().slice(0, 10);
    return newDate;
};

function CreateEventForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    /**************State************** */

    const user = useSelector(state => state.session.user);
    const groupsObj = useSelector(state => state.groups.groups)
    const groupsArr = Object.values(groupsObj);
    const groups = groupsArr.filter(group => user.id === group.organizerId);

    //field states
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState('')
    const [price, setPrice] = useState('0.00');
    const [startDate, setStartDate] = useState(`${defaultDate()}`);
    const [time, setTime] = useState('06:00');
    const [endTime, setEndTime] = useState('06:00');
    const [type, setType] = useState('');
    const [endDate, setEndDate] = useState(`${defaultDate()}`);
    const [prevImg, setPrevImg] = useState('');
    const [renderErr, setRenderErr] = useState(false)

    //field error states
    const [nameErr, setNameErr] = useState('');
    const [descriptionErr, setDescriptionErr] = useState('');
    const [capacityErr, setCapacityErr] = useState('')
    const [typeErr, setTypeErr] = useState('');
    const [prevImgErr, setPrevImgErr] = useState('');

    /***********************Helper Functions******************* */

    const urlValidation = str => {
        return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/.test(str);
    }

    const parseDate = (date, time) => {
        return new Date(date + 'T' + time + ':00');
    }

    /********************Use Effect********************* */

    useEffect(() => {

        //name error handling
        if (!name.length) {
            setNameErr('name is required')
        } else if (name.length && name.length < 5) {
            setNameErr('name must be greater than 5 characters')
        } else {
            setNameErr('')
        }

        //description error handling
        if (!description.length) {
            setDescriptionErr('description is required')
        } else if (description.length && description.length < 50) {
            setDescriptionErr('description must be at least 50 characters')
        } else {
            setDescriptionErr('')
        }

        //capacity error handling
        if (!capacity) {
            setCapacityErr('capacity must be included')
        } else if (capacity < 2) {
            setCapacityErr('capacity must be at least 2')
        } else {
            setCapacityErr('');
        }

        //image error handling
        if (!prevImg.length) {
            setPrevImgErr('image URL is required')
        } else if (prevImg.length && !urlValidation(prevImg)) {
            setPrevImgErr('image URL is invalid')
        } else {
            setPrevImgErr('');
        }

        //type error handling
        if (!type.length) {
            setTypeErr('Type must be "Online" or "In person"')
        } else {
            setTypeErr('')
        }

    }, [name, description, capacity, price, image, type])

    /***************************On Submit************************** */

    handleSubmit = async (e) => {
        e.preventDefault();
        setRenderErr(true)

        if (
            !nameErr &&
            !descriptionErr &&
            !timeErr &&
            !capacityErr &&
            !prevImgErr
        ) {
            const payload = {
                venueId: 1,
                name,
                type,
                capacity,
                price,
                description,
                startDate: parseDate(startDate, time).toISOString(),
                endDate: parseDate(endDate, endTime).toISOString()
            }

            const newEvent = await dispatch(createEvent(groupId, payload))

            const newImage = {
                url: prevImg,
                preview: true
            }

            if (prevImg.length > 0) {
                await dispatch(addEventImage(newEvent.id, newImage));
            }
            history.push(`/events/${newEvent.id}`);
        }

    }


    return (
        <div className='main'>
            <div className='title'>Create An Event</div>

            <div className='backend-errors'>{backEndErrors}</div>

            <form onSubmit={handleSubmit}>
                <div className='form-main'>
                    <div className='input-main'>
                        <div className='label'>Event Name</div>
                        <div className='input'>
                            <input type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='field-error'>
                            {!!renderErr && nameErr.length > 0 && nameErr}
                        </div>
                    </div>
                    <div className='input-main'>
                        <div className='label'>Event Description</div>
                        <div className='input'>
                            <input type='text'
                                maxLength={200}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className='field-error'>
                            {!!renderErr && aboutErr.length > 0 && aboutErr}
                        </div>
                    </div>
                    <div className='input-main'>
                        <div className='label'>Event Type</div>
                        <div className='input'>
                            <select type='text'
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value={' '}>Select Group Type</option>
                                <option value={'In person'}>In person</option>
                                <option value={'Online'}>Online</option>
                            </select>
                        </div>
                        <div className='field-error'>
                            {!!renderErr && typeErr.length > 0 && typeErr}
                        </div>
                    </div>
                    <div className='input-main'>
                        <div className='label'>Capacity</div>
                        <div className='input'>
                            <input type='number'
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                            />
                        </div>
                        <div className='field-error'>
                            {!!renderErr && capacityErr.length > 0 && capacityErr}
                        </div>
                    </div>
                    <div className='input-main'>
                        <div className='label'>Price</div>
                        <div className='input'>
                            <input type='number'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='input-main'>
                        <div className='label'>Start Date</div>
                        <div className='input'>
                            <input type='date'
                                value={startDate}
                                min={nextDate()}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='input-main'>
                        <div className='label'>End Date</div>
                        <div className='input'>
                            <input type='date'
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='input-main'>
                        <div className='label'>Event Time</div>
                        <div className='input'>
                            <input type='time'
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

            </form >
        </div >
    )
}

export default CreateEventForm;
