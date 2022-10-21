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
    const [type, setType] = useState('');
    const [endDate, setEndDate] = useState(`${defaultDate()}`);
    const [prevImg, setPrevImg] = useState('');
    const [renderErr, setRenderErr] = useState('')

    //field error states
    const [nameErr, setNameErr] = useState('');
    const [descriptionErr, setDescriptionErr] = useState('');
    const [capacityErr, setCapacityErr] = useState('')
    const [priceErr, setPriceErr] = useState('');
    const [startDateErr, setStartDateErr] = useState('');
    const [timeErr, setTimeErr] = useState('');
    const [typeErr, setTypeErr] = useState('');
    const [endDateErr, setEndDateErr] = useState('');
    const [prevImgErr, setPrevImgErr] = useState('');



    return (
        null
    )
}

export default CreateEventForm;
