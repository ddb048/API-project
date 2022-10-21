import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editGroup, getGroupDetails, deleteGroup } from '../../store/groups';

import './index.css'

function EditGroupForm({ groups }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { groupId } = useParams();

    /************State*********** */

    const sessionUser = useSelector(state => state.session.user);

    const group = useSelector(state => state.groups.oneGroup)
    console.log("group from edit", group)
    //field selector states
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [type, setType] = useState('');
    const [groupPrivate, setGroupPrivate] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [prevImg, setPrevImg] = useState('');
    const [backEndErrors, setBackEndErrors] = useState('');

    //field error states
    const [nameErr, setNameErr] = useState('');
    const [aboutErr, setAboutErr] = useState('');
    const [cityErr, setCityErr] = useState('');
    const [stateErr, setStateErr] = useState('');
    const [urlErr, setUrlErr] = useState('');
    const [typeErr, setTypeErr] = useState('');
    const [privateErr, setPrivateErr] = useState('');
    const [renderErr, setRenderErr] = useState(false);
    return (null)
}

export default EditGroupForm;
