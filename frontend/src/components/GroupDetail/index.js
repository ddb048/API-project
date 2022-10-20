import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'



function GroupDetail({ group }) {

    return (
        <Link className='link-to-group' to={`/groups/${group.id}`}>
            <div className='main-group-listing'>
                <div className='listing-image'>
                    <img src={group.previewImage} />
                </div>
                <div className='group-details'>
                    <p className='group-name'>{group.name}</p>
                    <div className='group-location'>
                        {group.city}, {group.state}
                    </div>
                    <div className='group-about'>
                        <p className='about-text'>{group.about}</p>
                    </div>
                    <div className='group-members'>
                        <div className='numMembers'>{group.numMembers}</div>
                        <div className='private'>
                            {group.private ? 'Private' : 'Public'}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default GroupDetail
