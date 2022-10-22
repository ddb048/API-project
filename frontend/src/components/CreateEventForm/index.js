import React from 'react';
import DatePicker from 'react-datepicker';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { createEvent } from '../../store/events';
import { getAllGroups } from '../../store/groups';
import { addEventImage } from '../../store/events';

import "react-datepicker/dist/react-datepicker.css"
import './index.css';

function CreateEventForm() {
    const { groupId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    /**************State************** */

    const user = useSelector(state => state.session.user);
    console.log('user', user)
    const groupsObj = useSelector(state => state.groups.groups)
    const groupsArr = Object.values(groupsObj);
    console.log("groupsArr", groupsArr)
    const groups = groupsArr.filter(group => user.id === group.organizerId);

    //field states
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState('')
    const [price, setPrice] = useState('0.00');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    // const [startYear, setStartYear] = useState(2022);
    // const [startMonth, setStartMonth] = useState(01);
    // const [startDay, setStartDay] = useState(01);
    // const [startHours, setStartHours] = useState(01);
    // const [startMin, setStartMin] = useState(01);
    // const [endYear, setEndYear] = useState(2022);
    // const [endMonth, setEndMonth] = useState(01);
    // const [endDay, setEndDay] = useState(01);
    // const [endHours, setEndHours] = useState(01);
    // const [endMin, setEndMin] = useState(01);
    const [type, setType] = useState('')
    const [prevImg, setPrevImg] = useState('');
    const [renderErr, setRenderErr] = useState(false)
    const [backEndErrors, setBackEndErrors] = useState('')

    //field error states
    const [nameErr, setNameErr] = useState('');
    const [descriptionErr, setDescriptionErr] = useState('');
    const [capacityErr, setCapacityErr] = useState('');
    const [typeErr, setTypeErr] = useState('');
    const [startDateErr, setStartDateErr] = useState('');
    const [endDateErr, setEndDateErr] = useState('');
    const [prevImgErr, setPrevImgErr] = useState('');

    /***********************Helper Functions******************* */

    const urlValidation = str => {
        return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/.test(str);
    }

    // const validateStartDate = (startYear, startMonth, startDay, startHours, startMin) => {
    //     let possStart = new Date(`${startYear}, ${startMonth}, ${startDay}, ${startHours}, ${startMin}`)

    //     if (possStart - new Date() < 0) {
    //         setStartDateErr('This start date has already passed.')
    //     } else {
    //         setStartDate(possStart.toISOString())
    //     }
    // }

    // const validateEndDate = (endYear, endMonth, endDay, endHours, endMin) => {
    //     let possEnd = new Date(`${endYear}, ${endMonth}, ${endDay}, ${endHours}, ${endMin}`)

    //     if (possEnd - (new Date(startDate)) < 0) {
    //         setEndDateErr('The end date must be after the start date.')
    //     }
    // }
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

        //startDate error handling
        // (startYear, startMonth, startDay, startHours, startMin) => {
        //     let possStart = new Date(`${startYear}, ${startMonth}, ${startDay}, ${startHours}, ${startMin}`)

        // if (new Date(startDate) - new Date() < 0) {
        //     setStartDateErr('This start date has already passed.')
        // } else {
        //     setStartDate(startDate.toISOString())
        //     setStartDateErr('')
        // }
        if (startDate - new Date() < 0) {
            setStartDateErr('This start date has already passed.')
        } else {
            setStartDateErr('')
        }

        //endDate error handling
        // (endYear, endMonth, endDay, endHours, endMin) => {
        //     let possEnd = new Date(`${endYear}, ${endMonth}, ${endDay}, ${endHours}, ${endMin}`)

        // if (new Date(endDate) - (new Date(startDate)) < 0) {
        //     setEndDateErr('The end date must be after the start date.')
        // } else {
        //     setEndDate(endDate.toISOString())
        //     setEndDateErr('')
        // }
        if (endDate - startDate < 0) {
            setEndDateErr('The end date must be after the start date.')
        } else {
            setEndDateErr('')
        }


        setBackEndErrors('')

    }, [name, description, capacity, price, prevImg, type, startDate, endDate])

    /***************************On Submit************************** */

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRenderErr(true)

        if (
            !nameErr &&
            !descriptionErr &&
            !capacityErr &&
            !prevImgErr &&
            !startDateErr &&
            !endDateErr
        ) {
            const payload = {
                venueId: 1,
                name,
                type,
                capacity,
                price,
                description,
                startDate,
                endDate
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
                            {!!renderErr && descriptionErr.length > 0 && descriptionErr}
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
                                min={2}
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
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                timeInputLabel="Event Start Time:"
                                dateFormat='MM/dd/yyyy h:mm aa'
                                showTimeInput
                            />
                        </div>
                        <div className='field-error'>
                            {!!renderErr && startDateErr.length > 0 && startDateErr}
                        </div>
                    </div>
                    <div className='input-main'>
                        <div className='label'>End Date</div>
                        <div className='input'>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                timeInputLabel="Event Start Time:"
                                dateFormat='MM/dd/yyyy h:mm aa'
                                showTimeInput
                            />
                        </div>
                        <div className='field-error'>
                            {!!renderErr && endDateErr.length > 0 && endDateErr}
                        </div>
                    </div>
                    <div className='input-main'>
                        <div className='label'>Group Image</div>
                        <div className='input'>
                            <input type='text'
                                value={prevImg}
                                onChange={(e) => setPrevImg(e.target.value)}
                            />
                        </div>
                        <div className='field-error'>
                            {!!renderErr && prevImgErr.length > 0 && prevImgErr}
                        </div>
                    </div>
                    <div className='submit-button-div'>
                        <button className='submit-button'
                            type='submit'
                            disabled={backEndErrors.length}
                        >Create Event</button>
                    </div>
                </div>

            </form >
        </div >
    )
}

export default CreateEventForm;
