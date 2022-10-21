import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import Splash from './components/splash';
import Groups from './components/Groups';
import { getAllGroups } from "./store/groups";
import OneGroupDetail from './components/OneGroupDetail'
import CreateGroupForm from "./components/CreateGroupForm";
import EditGroupForm from "./components/EditGroupForm";
import Events from './components/Events';
import OneEventDetail from './components/OneEventDetail';

function App() {
  const dispatch = useDispatch();

  const groups = useSelector(state => state.groups.Groups);

  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(dispatch(getAllGroups()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route exact path='/'>
            <Splash />
          </Route>

          <Route path='/groups/:groupId/edit'>
            <EditGroupForm groups={groups} />
          </Route>


          <Route exact path='/groups/new'>
            <CreateGroupForm />
          </Route>

          <Route exact path='/groups/:groupId'>
            <OneGroupDetail />
          </Route>

          <Route path='/events/:eventId'>
            <OneEventDetail />
          </Route>

          <Route path='/groups'>
            <Groups />
          </Route>

          <Route path='/events'>
            <Events />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
