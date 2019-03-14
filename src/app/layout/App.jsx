import React, { Component } from "react";
import EventDashboard from "../../features/event/eventDashBoard/EventDashBoard.jsx";
import NavBar from "../../features/nav/navbar/NavBar";
import { Container } from "semantic-ui-react";
import { Route,Switch } from 'react-router-dom';
import EventDetailedPage  from '../../features/event/eventDetailed/EventDetailedPage';
import PeopleDashBoard from '../../features/user/PeopleDashboard/PeopleDashboard'
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage'
import SettingsDashboard from '../../features/user/settings/SettingsDashboard'
import EventForm from '../../features/event/eventForm/EventForm'
import HomePage from '../../features/home/HomePage'
import TestComponent from "../../features/testarea/TestComponent";
import ModalManager from '../../features/modals/ModalManager'
import {UserIsAuthenticated} from "../../features/auth/AuthWraper"
class App extends Component {
  render() {
    return (
      <div>
        <ModalManager/>
        <Switch>
        <Route exact path="/" component={HomePage} />   
        </Switch>
    <Route
    path="/(.+)"
    render={()=>(
      <div>
        <NavBar />
        <Container className="main">
        <Switch>
        <Route path="/TestComponent" component={TestComponent} />
          <Route path="/events" component={EventDashboard} />
          <Route path="/event/:id" component={EventDetailedPage} />
          <Route path="/manage/:id" component={UserIsAuthenticated(EventForm)} />
        <Route path="/people" component={UserIsAuthenticated(PeopleDashBoard)} />
        <Route path="/profile/:id" component={UserIsAuthenticated(UserDetailedPage)} />
        <Route path="/settings" component={UserIsAuthenticated(SettingsDashboard)} />
        <Route path="/createEvent" component={UserIsAuthenticated(EventForm)} />
        </Switch>
        </Container>
      </div>
    )}
    />
      </div>      
    );
  }
}

export default App;