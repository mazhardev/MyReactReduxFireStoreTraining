import React from 'react'
import {Grid  } from 'semantic-ui-react'
import { Switch,Route,Redirect } from 'react-router-dom'
import SettingsNav from './SettingsNav';
import BasicPage from './BasicPage'
import AboutPage from './AboutPage'
import PhotosPage from './PhotosPage'
import AccountPage from './AccountPage'

const SettingsDashboard = () => {
  return (
    <Grid>
      <Grid.Column width={12}>
      <Switch>
        <Redirect exact from='/settings' to='/settings/BasicPage' /> 
      <Route path='/settings/BasicPage' component={BasicPage}/>
      <Route path='/settings/AboutPage' component={AboutPage}/>
      <Route path='/settings/PhotosPage' component={PhotosPage}/>
      <Route path='/settings/AccountPage' component={AccountPage}/>
      </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
    <SettingsNav/>
      
      </Grid.Column>
    </Grid>
  )
}

export default SettingsDashboard
