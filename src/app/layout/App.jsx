import React, { Component } from "react";
import EventDashboard from "../../features/event/eventDashBoard/EventDashBoard.jsx";
import NavBar from "../../features/nav/navbar/NavBar";
import { Container } from "semantic-ui-react";
import { Route } from 'react-router-dom';
import EventDetailedPage  from '../../features/event/eventDetailed/EventDetailedPage';
import PeopleDashBoard from '../../features/user/PeopleDashboard/PeopleDashboard'
import UserDetails from '../../features/user/userDetails/UserDetails'
import SettingsDashboard from '../../features/user/settings/SettingsDashboard'
import EventForm from '../../features/event/eventForm/EventForm'
import HomePage from '../../features/home/HomePage'
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container className="main">
        <Route exact path="/" component={HomePage} />
        <Route path="/events" component={EventDashboard} />
        <Route path="/event/:id" component={EventDetailedPage} />
        <Route path="/people" component={PeopleDashBoard} />
        <Route path="/profile/:id" component={UserDetails} />
        <Route path="/settings" component={SettingsDashboard} />
        <Route path="/createEvent" component={EventForm} />
           
        </Container>
      </div>
    );
  }
}

export default App;