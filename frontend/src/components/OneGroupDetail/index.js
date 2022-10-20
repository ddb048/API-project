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
    const [join, setJoin] = useState('')

    //STATES NEEDED FOR PAGE
    const group = useSelector(state => state.groups.groups[groupId])
    const sessionUser = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(getGroupDetails(groupId)).catch(async res => {
            const data = await res.json()

            if (data && data.message) {
                setPageNotFound(data.message)
            }
        }
        );
    }, [dispatch, groupId]);


    //onClick handlers
    const handleEdit = async (e) => {
        e.preventDefault();
        history.pushState(`/groups/${groupId}/edit`);
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        if (window.confirm(`Are you sure you'd like to delete ${group.name}?  This action cannot be undone.`)) {
            dispatch(deleteGroup(groupId));
            history.pushState('/groups');
        } else {
            history.pushState(`/groups/${groupId}`);
        }
    };

    const handleJoin = async (e) => {
        e.preventDefault();

        if (join === 'Join') {
            setJoin('Joined')
        } else {
            setJoin('Join')
        }
    }

    let buttons;
    //IF user is owner of the group, they can edit/delete
    if (sessionUser && sessionUser.id === group?.organizerId) {
        buttons = (
            <div className='group-buttons'>
                <div className='edit-button' onClick={handleEdit}>Edit</div>
                <div className='delete-button' onClick={handleDelete}>Delete</div>
            </div>
        )
    } else {
        buttons = (
            <div className='group-buttons'>
                <div className='join-button' onClick={ }
            </div>
        )
    }

    return (
        <div>
            {!group && (
                <>
                    <div className='error-img-div'>
                        <img className='error-img' src='https://secure.meetupstatic.com/next/images/home/EmptyGroup.svg?w=384' />
                    </div>
                    <div className='error-div'>{pageNotFound}</div>
                </>
            )}
            <div>{group?.name}</div>

        </div>

    )
}

export default OneGroupDetail;
