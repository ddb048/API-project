import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import Splash from './components/splash';
import Groups from './components/Groups';
import { getAllGroups } from "./store/groups";

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

          <Route path='/groups'>
            <Groups />
          </Route>


        </Switch>
      )}
    </>
  );
}

export default App;
