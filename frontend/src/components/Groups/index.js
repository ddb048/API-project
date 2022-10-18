import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups } from "../../store/groups";
import './index.css'
import GroupListing from "../GroupListing";

function Groups() {
    const dispatch = useDispatch();
    const allGroups = useSelector(state => state.groups.allGroups)

    useEffect(() => {
        dispatch(getAllGroups())
    }, [dispatch]);

    return (allGroups &&
        <div className="main">
            {Object.values(allGroups).map(group => (
                <GroupListing group={group} />
            ))}
        </div>
    )
}

export default Groups;
