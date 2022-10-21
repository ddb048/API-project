import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { createEvent } from '../../store/events';
import { getAllGroups } from '../../store/groups';
import { addEventImage } from '../../store/events';

import './index.css';

function CreateEventForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    /**************State************** */

    const user = useSelector(state => state.session.user);
    const groupsObj = useSelector(state => state.groups.groups)
    const groupsArr = Object.values(groupsObj);
    const groups = groupsArr.filter(group => user.id === group.organizerId);



    return (
        null
    )
}

export default CreateEventForm;
