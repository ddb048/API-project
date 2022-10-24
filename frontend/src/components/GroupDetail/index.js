import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'



function GroupDetail({ group }) {

    return (
        <Link className='link-to-group' to={`/groups/${group.id}`}>
            <div className='main-group-listing'>
                <div className='listing-image'>
                    <img className='img' src={group.previewImage} />
                </div>
                <div className='group-details'>
                    <div className='group-name'>{group.name}</div>
                    <div className='group-location'>
                        {group.city}, {group.state}
                    </div>
                    <div className='group-about'>
                        <div className='group-title'>Group Description:</div>
                        <div className='about-text'>{group.about}</div>
                    </div>
                    <div className='group-members'>
                        <div className='numMembers'>Members: {group.numMembers}</div>
                        <div className='private'>
                            {group.private ? 'Private' : 'Public'} Group
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default GroupDetail
