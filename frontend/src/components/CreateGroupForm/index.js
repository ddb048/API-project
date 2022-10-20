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
    const [accessErr, setAccessErr] = useState('');
    const [renderErr, setRenderErr] = useState(false);

    /***********************Helper Functions******************* */

    const urlValidation = str => {
        return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/.test(str);
    }
    /********************Use Effect********************* */

    useEffect(() => {
        const errs = [];

        //name error handling
        if (!name.length) {
            setNameErr('Name is required');
            setRenderErr(true)
        } else if (name.length > 60) {
            setNameErr('Name must be 60 characters or less')
            setRenderErr(true)
        }

        //about error handling
        if (!about.length || about.length && about.length < 50) {
            setAboutErr('About must be 50 characters or more')
            setRenderErr(true)
        }

        //city error handling
        if (!city.length) {
            setCityErr('City is required')
            setRenderErr(true)
        }

        //state error handling
        if (!state.length) {
            setStateErr('State is required')
            setRenderErr(true)
        }

        //type error handling
        if (type !== 'In person' || type !== 'Online') {
            setTypeErr('Type must be "Online" or "In person"')
            setRenderErr(true)
        }

        //private error handling
        if (groupPrivate !== 'true' || groupPrivate !== 'false') {
            setPrivateErr('Private must be true or false')
            setRenderErr(true)
        }

        //imgUrl error handling
        if (!prevImg.length) {
            setUrlErr('image URL is required')
            setRenderErr(true)
        } else if (prevImg.length && !urlValidation(prevImg)) {
            setUrlErr('invalid image URL')
            setRenderErr(true)
        }

        setErrors(errs);

    }, [name, about, city, state, prevImg, groupPrivate, type])

    /***************************On Submit************************** */

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!renderErr) {

            const payload = {
                name,
                about,
                city,
                state,
                private: groupPrivate,
                type
            }


            const newGroup = await dispatch(createGroup(payload)).then(() => {
                const newImg = {
                    id: newGroup.id,
                    url: prevImg,
                    preview: true
                }

                if (prevImg.length > 0) {
                    const response = dispatch(addGroupImage(newGroup.id, newImg))
                }

                history.push(`/groups/${newGroup.id}`)

            }).catch(async (response) => {
                const data = await response.json();

                if (data && data.message) setBackEndErrors(data.message);
            });
        }
    }


    return (
        <div className='main'>
            <div className='title'>Create A Group</div>
            <div className='backend-err-div'>
                {backEndErrors}
            </div>

            <form onSubmit={handleSubmit}>
                <div className='form-main'>
                    <div className='input-main'>
                        <div className='label'>Group Name</div>
                        <div className='input'>
                            <input type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='field-error'>
                            {renderErr && nameErr.length > 0 && nameErr}
                        </div>
                    </div>
                    <div className='input-main'>
                        <div className='label'>Group Description</div>
                        <div className='input'>
                            <input type='text'
                                maxLength={200}
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                            />
                        </div>
                        <div className='field-error'>
                            {renderErr && aboutErr.length > 0 && aboutErr}
                        </div>
                    </div>
                    <div className='input-main'>
                        <div className='label'>City</div>
                        <div className='input'>
                            <input type='text'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className='field-error'>
                            {renderErr && cityErr.length > 0 && cityErr}
                        </div>
                    </div>
                    <div className='input-main'>
                        <div className='label'>State</div>
                        <div className='input'>
                            <input type='text'
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>
                        <div className='field-error'>
                            {renderErr && stateErr.length > 0 && stateErr}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateGroupForm;
