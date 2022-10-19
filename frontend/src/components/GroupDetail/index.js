import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'



function GroupDetail({ group }) {
    const { groupId } = useParams();

    return (
        console.log(group)
    )
}

export default GroupDetail
