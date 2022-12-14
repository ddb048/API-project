import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createGroup, addGroupImage } from '../../store/groups';
import './index.css'

function CreateGroupForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    /****************State****************** */

    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) {
        history.push('/');
    }

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

    /***********************Helper Functions******************* */

    const urlValidation = str => {
        return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/.test(str);
    }
    /********************Use Effect********************* */

    useEffect(() => {

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
        } else {
            setAboutErr('')
        }

        //city error handling
        if (!city.length) {
            setCityErr('City is required')
        } else {
            setCityErr('')
        }

        //state error handling
        if (!state.length) {
            setStateErr('State is required')
        } else {
            setStateErr('')
        }

        //type error handling
        if (!type.length) {
            setTypeErr('Type must be "Online" or "In person"')
        } else {
            setTypeErr('')
        }

        //private error handling
        if (!groupPrivate.length) {
            setPrivateErr('Access must be Public or Private')
        } else {
            setPrivateErr('')
        }

        //imgUrl error handling
        if (!prevImg.length) {
            setUrlErr('image URL is required')

        } else if (prevImg.length && !urlValidation(prevImg)) {
            setUrlErr('invalid image URL')
        } else {
            setUrlErr('')
        }

        setBackEndErrors('')

    }, [name, about, city, state, prevImg, groupPrivate, type])

    /***************************On Submit************************** */

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRenderErr(true)

        if (
            !nameErr &&
            !aboutErr &&
            !cityErr &&
            !stateErr &&
            !urlErr &&
            !typeErr &&
            !privateErr
        ) {

            const payload = {
                name,
                about,
                city,
                state,
                private: groupPrivate,
                type
            }


            const newGroup = await dispatch(createGroup(payload))


            const newImg = {
                id: newGroup.id,
                url: prevImg,
                preview: true
            }

            if (prevImg.length > 0) {
                const response = dispatch(addGroupImage(newGroup.id, newImg))
            }
            history.push(`/groups/${newGroup.id}`)
        }

    }


    return (
        <div className='main'>
            <div className='title'>Create A Group</div>

            <div className='backend-errors'>{backEndErrors}</div>

            <form onSubmit={handleSubmit}>
                <div className='full-form-main-div'>
                    <div className='full-input-inner-div'>
                        <div className='full-input-header'>Group Name</div>
                        <div className='full-login-input'>
                            <input
                                className='full-input-field'
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='full-input-error'>
                            {!!renderErr && nameErr.length > 0 && nameErr}
                        </div>
                    </div>
                    <div className='full-input-inner-div'>
                        <div className='full-input-header'>Group Type</div>
                        <div className='full-login-input'>
                            <select
                                className='full-input-dropdown'
                                type='text'
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option className='full-option' value={' '}>Select Group Type</option>
                                <option className='full-option' value={'In person'}>In person</option>
                                <option className='full-option' value={'Online'}>Online</option>
                            </select>
                        </div>
                        <div className='full-input-error'>
                            {!!renderErr && typeErr.length > 0 && typeErr}
                        </div>
                    </div>
                    <div className='full-input-inner-div'>
                        <div className='full-input-header'>Group Access</div>
                        <div className='full-login-input'>
                            <select
                                className='full-input-dropdown'
                                type='text'
                                value={groupPrivate}
                                onChange={(e) => setGroupPrivate(e.target.value)}
                            >
                                <option className='full-option' value={' '}>Select Group Access</option>
                                <option className='full-option' value={false}>Public</option>
                                <option className='full-option' value={true}>Private</option>
                            </select>
                        </div>
                        <div className='full-input-error'>
                            {!!renderErr && privateErr.length > 0 && privateErr}
                        </div>
                    </div>
                    <div className='full-input-inner-div'>
                        <div className='full-input-header'>City</div>
                        <div className='full-login-input'>
                            <input
                                className='full-input-field'
                                type='text'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className='full-input-error'>
                            {!!renderErr && cityErr.length > 0 && cityErr}
                        </div>
                    </div>
                    <div className='full-input-inner-div'>
                        <div className='full-input-header'>State</div>
                        <div className='full-login-input'>
                            <input
                                className='full-input-field'
                                type='text'
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>
                        <div className='full-input-error'>
                            {!!renderErr && stateErr.length > 0 && stateErr}
                        </div>
                    </div>
                    <div className='full-input-inner-div'>
                        <div className='full-input-header'>Group Image</div>
                        <div className='full-login-input'>
                            <input
                                className='full-input-field'
                                type='text'
                                value={prevImg}
                                onChange={(e) => setPrevImg(e.target.value)}
                            />
                        </div>
                        <div className='full-input-error'>
                            {!!renderErr && urlErr.length > 0 && urlErr}
                        </div>
                    </div>

                    <div className='full-input-inner-div'>
                        <div className='full-input-header'>Description</div>
                        <div className='full-login-input'>
                            <textarea
                                className='full-input-block'
                                type='text'
                                maxLength={200}
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                            />
                        </div>
                        <div className='full-input-error'>
                            {!!renderErr && aboutErr.length > 0 && aboutErr}
                        </div>
                    </div>
                    <div className='full-login-button-div'>
                        <button className='full-login-button'
                            type='submit'
                            disabled={backEndErrors.length}
                        >Create Group</button>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default CreateGroupForm;
