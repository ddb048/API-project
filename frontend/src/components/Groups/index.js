import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups } from "../../store/groups";
import './index.css'
import GroupListing from "../GroupListing";

function Groups() {
    const dispatch = useDispatch();
    const groups = useSelector(state => state.groups)

    useEffect(() => {
        dispatch(getAllGroups())
    }, [dispatch]);

    return (allGroups &&
        <div className="main">
            {Object.values(groups).map(group => (
                <GroupListing group={group} />
            ))}
        </div>
    )
}

export default Groups;
