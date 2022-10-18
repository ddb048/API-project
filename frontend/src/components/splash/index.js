import React from "react";
// import { useSelector } from "react-redux";
import './index.css';
import { Link } from 'react-router-dom';

function Splash() {
    // const user = useSelector(state => state.session.user);

    return (
        <div className="main">
            <div className="background-svgs">
                <img className="green-blob" viewbox="0 20 10 10" src="https://secure.meetupstatic.com/next/images/blobs/green-blob.svg" />

                <img className="yellow-blob" viewbox='10 10 4 10' src="https://secure.meetupstatic.com/next/images/blobs/yellow-blob.svg" />

                <img className="red-blob" src="https://secure.meetupstatic.com/next/images/blobs/red-blob.svg" />
            </div>
            <div className="main-top">
                <div className="main-header-left">
                    <h1 className="h1">Celebrating 20 years of real connections on Meetup</h1>
                    <p className="beat-up-introduction">Whatever you're looking to do this year, Beatup can help.
                        For 20 years, people have turned to Beatup to meet people,
                        make friends, find support, grow a business, and explore their interests in fighting crime.
                        Thousands of events are happening every day-join the adventure.</p>
                </div>
                <div className="main-header-right">
                    <img className="header-right-img" src="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=640" />
                </div>
            </div>
            <div className="middle-center">
                <h2 className="middle-center-h2">How Beatup works</h2>
                <p>Meet new people who share your interests through online and in-person events.  It's free to create an account and fight bad guys</p>
            </div>
            <div className="interaction-center">
                <Link className="link" to=''>
                    <div className="card">
                        <div className="svg-div">
                            <img className="svg" src="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=256" />
                        </div>
                        <h3 className="title">Join a group</h3>
                        <p className="p">Do what you love, beatup the bad guys, protect your community.  The rest is history!</p>
                    </div>
                </Link>
                <Link className="link" to=''>
                    <div className="card">
                        <div className="svg-div">
                            <img className="svg" src="https://secure.meetupstatic.com/next/images/shared/ticket.svg?w=256" />
                        </div>
                        <h3 className="title">Find an event</h3>
                        <p className="p">Events are happening on just about any topic you can think of, from online crime-fighting to in-person vigilantism</p>
                    </div>
                </Link>
                <Link className='link' to=''>
                    <div className="card">
                        <div className="svg-div">
                            <img className="svg" src="https://secure.meetupstatic.com/next/images/shared/joinGroup.svg?w=256" />
                        </div>
                        <h3 className="title">Start a group</h3>
                        <p className="p">You don't have to have superpowers to gather people together and fight crime</p>
                    </div>
                </Link>
            </div>
            {/* {!user && <div className="join-beatup-button">
                <button className="join-beatup">Join Beatup</button>
            </div>} */}
        </div>
    )
}

export default Splash;
