import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { updateGroup } from '../../store/groups';
import './index.css'

function EditGroupForm({ groups }) {
    const { groupId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    //field selector states
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [type, setType] = useState('');
    const [private, setPrivate] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [prevImg, setPrevImg] = useState('');

    //field error states
    const [nameErr, setNameErr] = useState('');
    const [aboutErr, setAboutErr] = useState('');
    const [cityErr, setCityErr] = useState('');
    const [stateErr, setStateErr] = useState('');
    const [urlErr, setUrlErr] = useState('');
    const [typeErr, setTypeErr] = useState('');
    const [accessErr, setAccessErr] = useState('');

    /***********************Helper Functions******************* */

    const urlValidation = str => {
        return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/.test(str);
    }
    /********************Use Effect********************* */

    useEffect(() => {
        const err = [];

        //name error handling
        if (!name.length) {
            setNameErr('Name is required');
        } else if (name.length > 60) {
            setNameErr('Name must be 60 characters or less')
        } else {
            setNameErr('')
        }

        //about error handling
        if (!about.length || about.length && about.length < 50) {
            setAboutErr('About must be 50 characters or more')
        }

        //city error handling
        if (!city.length) {
            setCityErr('City is required')
        }

        //state error handling
        if (!state.length) {
            setStateErr('State is required')
        }

        //type error handling
        if (type !== 'In person' || type !== 'Online') {
            setTypeErr('Type must be "Online" or "In person"')
        }

        //private error handling
        if (private !== 'true' || private !== 'false') {
            setPrivateErr('Private must be true or false')
        }

        //imgUrl error handling
        if (!prevImg.length) {
            setUrlErr('image URL is required')
        } else if (prevImg.length && !urlValidation(prevImg)) {
            setUrlErr('invalid image URL')
        }

        setErrors(errs);

    })

    const group = groups[groupId];


    const sessionUser = useSelector(state => state.session.user);

    return (

    )
}

export default EditGroupForm;
