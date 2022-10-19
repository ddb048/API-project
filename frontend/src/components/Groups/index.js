import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups } from "../../store/groups";
import './index.css'
import GroupDetail from "../GroupDetail";


function Groups() {
    const dispatch = useDispatch();
    const groupsObj = useSelector(state => state.groups.groups)
    const groups = Object.values(groupsObj);


    //on each render, triggers the dispatch to backend to fetch all groups
    useEffect(() => {
        dispatch(getAllGroups())
    }, [dispatch]);


    //declares the variable to hold all listings
    let groupsList;


    //maps over my array of groups and generates a card for each index
    if (groups.length > 0) {
        groupsList = (
            groups.map(group => (<GroupDetail group={group} />))
        )


        //sets a display for if I have no groups within my list
    } else {
        <div className="no-groups">
            <img className="no-groups-pic" src="https://secure.meetupstatic.com/next/images/home/EmptyGroup.svg?w=384" />
            <div className="no-groups-text">There are currently no groups!</div>
        </div>
    }




    return (groups &&
        <div className="main">
            <div className="groups-inner-container">
                <Link to=''>Events</Link>
                <Link to=''>Groups</Link>
            </div>
            <div className="groupList">
                {groupsList}
            </div>
        </div>
    )
}

export default Groups;
