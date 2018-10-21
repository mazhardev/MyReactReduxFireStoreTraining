import React from "react";
import { Grid } from "semantic-ui-react";
import { Switch, Route, Redirect } from "react-router-dom";
import SettingsNav from "./SettingsNav";
import BasicPage from "./BasicPage";
import AboutPage from "./AboutPage";
import PhotosPage from "./PhotosPage";
import AccountPage from "./AccountPage";
import { updatePassword } from "../../auth/AuthActions";
import { connect } from "react-redux";

const actions = {
  updatePassword
};
const mapState = state => ({
  providerId: state.firebase.auth.providerData[0].providerId  ,
  profile:state.firebase.profile
});
const SettingsDashboard = ({ updatePassword, providerId,profile }) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="/settings/BasicPage" />
          <Route path="/settings/BasicPage" render={()=><BasicPage initialValues={profile}/>} />
          <Route path="/settings/AboutPage" component={AboutPage} />
          <Route path="/settings/PhotosPage" component={PhotosPage} />
          <Route
            path="/settings/AccountPage"
            render={() => (
              <AccountPage
                providerId={providerId}
                updatePassword={updatePassword}
              />
            )}
          />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
};

export default connect(
  mapState,
  actions
)(SettingsDashboard);
