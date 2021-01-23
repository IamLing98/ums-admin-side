/**
 * User Profile Page
 */
import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Helmet } from "react-helmet";
// Components
import Profile from './component/Profile';
import EmailPrefrences from './component/EmailPrefrences';
import UserBlock from './component/UserBlock';

// rct card box
import { RctCard } from 'Components/RctCard';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// For Tab Content
function TabContainer(props) {
   return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
         {props.children}
      </Typography>
   );
}

export default class UserProfile extends Component {

   state = {
      activeTab: this.props.location.state ? this.props.location.state.activeTab : 0
   };

   handleChange = (event, value) => {
      this.setState({ activeTab: value });
   };

   render() {
      const { activeTab } = this.state;
      const {match} = this.props;
      return (
         <div className="userProfile-wrapper">
            <Helmet>
               <title>Polucon | User-Profile</title>
               <meta name="description" content="User Profile" />
            </Helmet>
            <PageTitleBar title={<IntlMessages id="sidebar.userProfile" />} match={match} />
            <RctCard>
               <UserBlock />
               <div className="rct-tabs">
                  <AppBar position="static">
                     <Tabs
                        value={activeTab}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="off"
                        indicatorColor="primary"
                     >
                        <Tab
                           icon={<i className="ti-user"></i>}
                           label={<IntlMessages id="components.myProfile" />}
                        />
                        <Tab
                           icon={<i className="ti-email"></i>}
                           label={<IntlMessages id="components.emailPrefrences" />}
                        />
                     </Tabs>
                  </AppBar>
                  {activeTab === 0 &&
                     <TabContainer>
                        <Profile />
                     </TabContainer>}
                  {activeTab === 1 &&
                     <TabContainer>
                        <EmailPrefrences />
                     </TabContainer>}
               </div>
            </RctCard>
         </div>
      );
   }
}
