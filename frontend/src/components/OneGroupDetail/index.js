import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';

import { getGroupDetails, deleteGroup, clearGroup } from '../../store/groups';

import './index.css'

function OneGroupDetail() {
    const { groupId } = useParams();
    let dispatch = useDispatch();
    let history = useHistory();
    const [backEndErrors, setBackEndErrors] = useState('')

    /*********************State************************/


    const group = useSelector(state => state.groups.oneGroup)
    // console.log("GROUP from oneGroupDetail", group)
    const organizer = useSelector(state => state.groups.oneGroup.Organizer)

    const sessionUser = useSelector(state => state.session.user);



    /*********************Use Effect************************/


    useEffect(() => {

        dispatch(getGroupDetails(groupId)).catch(async res => {
            const data = await res.json()

            if (data && data.message) {
                setBackEndErrors(data.message)
            }
        });


    }, [groupId]);

    useEffect(() => {
        // return (() => dispatch(clearGroup()))
    })

    /*********************onClick handlers************************/
    const handleEdit = async (e) => {
        e.preventDefault();

        history.push(`/groups/${groupId}/edit`);
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        if (window.confirm(`Are you sure you'd like to delete ${group.name}?
          This action cannot be undone.`)) {

            await dispatch(deleteGroup(groupId)).then(history.push('/groups'));


        } else {
            history.push(`/groups/${groupId}`);
        }
    };

    const handleEvent = async (e) => {
        e.preventDefault();

        history.push(`/groups/${groupId}/events/new`)
    }
    /**************************Early Return*************************/

    if (!Object.values(group).length) {
        return (
            null
        );
    }
    /**************************Normal Functioning*************************/


    let buttons;
    //IF user is owner of the group, they can edit/delete
    if (sessionUser && sessionUser.id === group.organizerId) {
        buttons = (
            <div className='group-buttons'>
                <button className='ge-button' onClick={handleEdit}>Edit</button>
                <button className='ge-button' onClick={handleDelete}>Delete</button>
                <button className='ge-button' onClick={handleEvent}>Create An Event</button>
            </div>
        )
    } else {
        //ADD MEMBERSHIP JOIN BUTTON HERE
        buttons = (null)
    }

    return (
        <div className='details-main'>
            <div className='details-inner-div'>
                <div className='backend-errors'>{backEndErrors}</div>

                <div className='top-div'>
                    <h1 className='detail-title'>{group.name}</h1>
                    <h3 className='organizer'>Organized by: {organizer?.firstName} {organizer?.lastName} </h3>
                </div>
                <div className='bottom-div'>
                    <div className='group-section'>
                        <div className='group-image'>

                            <img className='group-img' src={group?.GroupImages[0]?.url}></img>
                        </div>
                        <div className='group-info'>
                            <h3 className='h3'>About</h3>
                            <div className='group-about'>{group.about}</div>
                        </div>
                    </div>
                </div>

                <div className='buttons'>
                    {buttons}
                </div>
            </div>
        </div>

    )
}

export default OneGroupDetail;
