import React, { Component } from 'react';
import AppMedia from '../../../app/common/util/appMedia'
import EventDashboard from './EventDashboard'
import EventDashboardMobile from './EventDashboardMobile'


const { Media } = AppMedia;

class NavBar extends Component {

    render() {
        return (
            <React.Fragment>
                <Media greaterThan="mobile">
                    <EventDashboard />
                </Media>

                <Media at="mobile">
                <EventDashboardMobile />
                </Media>
            </React.Fragment>
        );
    }
}

export default NavBar;
