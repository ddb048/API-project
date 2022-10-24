import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllGroups } from "../../store/groups";
import './index.css'
import GroupDetail from "../GroupDetail";


function Groups() {
    let dispatch = useDispatch();
    const groupsObj = useSelector(state => state.groups.groups)
    console.log("groups", groupsObj)


    let groups = [];
    if (groupsObj) {
        groups = Object.values(groupsObj);

    }
    //on each render, triggers the dispatch to backend to fetch all groups
    useEffect(() => {
        dispatch(getAllGroups())
    }, [dispatch]);


    //declares the variable to hold all listings
    let groupsList;


    //maps over my array of groups and generates a card for each index
    if (groups.length > 0) {
        groupsList = (
            groups.map(group => (<GroupDetail key={group.id} group={group} />))
        )


        //sets a display for if I have no groups within my list
    } else {
        groupsList = (
            <div className="no-groups">
                <img className="no-groups-pic" src="https://secure.meetupstatic.com/next/images/home/EmptyGroup.svg?w=384" />
                <div className="no-groups-text">There are currently no groups!</div>
            </div>)
    }




    return (groups &&
        <div className="ge-main">
            <div className="groups-inner-container">
                <Link className='ge-title' to='/groups' >Groups</Link>
                <Link className='ge-title' to='/events'>Events</Link>
            </div>
            <div className="groupList">
                {groupsList}
            </div>
        </div>
    )
}

export default Groups;
