import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable'
import LoadingComponent from './LoadingComponent'
import { UserIsAuthenticated } from '../../features/auth/authWrapper';

import AppMedia from '../common/util/appMedia'

const AsyncHomePage = Loadable({
  loader: () => import('../../features/home/HomePage'),
  loading: LoadingComponent
})
const AsyncDesktopMenu = Loadable({
  loader: () => import('../../features/nav/Menus/desktop/DesktopMenu'),
  loading: LoadingComponent
})
const AsyncNavBarMobile = Loadable({
  loader: () => import('../../features/nav/Menus/mobile/NavBarMobile'),
  loading: LoadingComponent
})
const AsyncEventDashboard = Loadable({
  loader: () => import('../../features/event/EventDashboard/'),
  loading: LoadingComponent
})
const AsyncEventForm = Loadable({
  loader: () => import('../../features/event/EventForm/EventForm'),
  loading: LoadingComponent
})
const AsyncSettingsDashboard = Loadable({
  loader: () => import('../../features/user/Settings/SettingsDashboard'),
  loading: LoadingComponent
})
const AsyncUserDetailedPage = Loadable({
  loader: () => import('../../features/user/UserDetailed/UserDetailedPage'),
  loading: LoadingComponent
})
const AsyncPeopleDashboard = Loadable({
  loader: () => import('../../features/user/PeopleDashboard/PeopleDashboard'),
  loading: LoadingComponent
})
const AsyncEventDetailedPage = Loadable({
  loader: () => import('../../features/event/EventDetailed/EventDetailedPage'),
  loading: LoadingComponent
})
const AsyncModalManager = Loadable({
  loader: () => import('../../features/modals/ModalManager'),
  loading: LoadingComponent
})
const AsyncNotFound = Loadable({
  loader: () => import('../../app/layout/NotFound'),
  loading: LoadingComponent
})

const mediaStyles = AppMedia.createMediaStyle();
const { MediaContextProvider, Media } = AppMedia;

const ResponsiveContainer = ({ children }) => (
  <MediaContextProvider>
    <AsyncNavBarMobile Media={Media}>{children}</AsyncNavBarMobile>
    <AsyncDesktopMenu Media={Media}>{children}</AsyncDesktopMenu>
  </MediaContextProvider>
)

class App extends Component {
  render() {
    return (
      <div>
        <AsyncModalManager />
        <Switch>
          <Route exact path="/" component={AsyncHomePage} />
        </Switch>
        <Route
          path="/(.+)"
          render={() => (
            <div>
              <style>{mediaStyles}</style>
              <ResponsiveContainer>
                <Container className="main">
                  <Switch>
                    <Route path="/events" component={AsyncEventDashboard} />
                    <Route path="/event/:id" component={AsyncEventDetailedPage} />
                    <Route path="/manage/:id" component={UserIsAuthenticated(AsyncEventForm)} />
                    <Route path="/people" component={UserIsAuthenticated(AsyncPeopleDashboard)} />
                    <Route path="/profile/:id" component={UserIsAuthenticated(AsyncUserDetailedPage)} />
                    <Route path="/settings" component={UserIsAuthenticated(AsyncSettingsDashboard)} />
                    <Route path="/createEvent" component={UserIsAuthenticated(AsyncEventForm)} />
                    <Route path="/error" component={AsyncNotFound} />
                    <Route component={AsyncNotFound} />
                  </Switch>
                </Container>
              </ResponsiveContainer>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
