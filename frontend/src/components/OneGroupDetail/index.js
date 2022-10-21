import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { getGroupDetails, deleteGroup } from '../../store/groups';

import './index.css'

function OneGroupDetail() {
    const { groupId } = useParams();
    let dispatch = useDispatch();
    let history = useHistory();
    const [pageNotFound, setPageNotFound] = useState('')

    /*********************State************************/


    const group = useSelector(state => state.groups.oneGroup)
    console.log("GROUP", group)
    const organizer = useSelector(state => state.groups.oneGroup.Organizer)

    const sessionUser = useSelector(state => state.session.user);



    /*********************Use Effect************************/


    useEffect(() => {
        dispatch(getGroupDetails(groupId)).catch(async res => {
            const data = await res.json()

            if (data && data.message) {
                setPageNotFound(data.message)
            }
        }
        );
    }, [dispatch, groupId]);


    /*********************onClick handlers************************/
    const handleEdit = async (e) => {
        e.preventDefault();

        history.push(`/groups/${groupId}/edit`);
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        if (window.confirm(`Are you sure you'd like to delete ${group.name}?
          This action cannot be undone.`)) {

            dispatch(deleteGroup(groupId));
            history.push('/groups');

        } else {
            history.push(`/groups/${groupId}`);
        }
    };

    /**************************Early Return*************************/

    if (!Object.values(group).length) {
        return (
            <>
                <div className='error-img-div'>
                    <img className='error-img' src='https://secure.meetupstatic.com/next/images/home/EmptyGroup.svg?w=384' />
                </div>
                <div className='error-div'>{pageNotFound}</div>
            </>
        );
    }
    /**************************Normal Functioning*************************/


    let buttons;
    //IF user is owner of the group, they can edit/delete
    if (sessionUser && sessionUser.id === group.organizerId) {
        buttons = (
            <div className='group-buttons'>
                <div className='edit-button' onClick={handleEdit}>Edit</div>
                <div className='delete-button' onClick={handleDelete}>Delete</div>
            </div>
        )
    } else {
        //ADD MEMBERSHIP JOIN BUTTON HERE
        buttons = (null)
    }

    return (
        <div className='main'>
            <div className='left-div'>
                <div className='group-section'>
                    <div className='group-image'>

                        <img className='img' src={group?.GroupImages[0]?.url}></img>
                    </div>
                    <div className='group-info'>
                        <h3 className='h3'>About</h3>
                        <p className='about'>{group.about}</p>
                    </div>
                </div>
            </div>
            <div className='right-div'>
                <h1 className='title'>{group.name}</h1>
                <h3 className='organizer'>Organized by: {organizer?.firstName} {organizer?.lastName} </h3>
            </div>
            {buttons}
        </div>

    )
}

export default OneGroupDetail;
