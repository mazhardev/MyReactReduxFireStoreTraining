import React, { Component } from "react";
import EventDashboard from "../../features/event/eventDashBoard/EventDashBoard.jsx";
import NavBar from "../../features/nav/navbar/NavBar";
import { Container } from "semantic-ui-react";
import { Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>hggh
        <NavBar />
        <Container className="main">
         <Route path="/event" component={EventDashboard} />
        </Container>
      </div>
    );
  }
}

export default App;