/**
 * Clients tab section
 */
/* eslint-disable */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


// rct card box
import { RctCard, RctCardContent } from 'Components/RctCard';

//Actions
import { deleteClient } from "Actions";
import {api} from "Api/index";
import {NotificationManager} from "react-notifications";
import {SERVER_PATH} from "Actions/types";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

class SurveyorTab extends Component {


    state = {
        value: 0,
        users: null,
        isUpdated:false,
        loading:false
    };

    // get users
    getUsers() {
        this.setState({loading:true});
        api.get('/users/all-users?roles=ROLE_SURVEYOR',true)
            .then(response => {

                this.setState({ users: response['hydra:member'] });
                this.setState({loading:false});
            })
            .catch(error => {
                this.setState({loading:false});
                if (error.message === 'Unauthorized'){
                    NotificationManager.error("Session Timed out");
                    this.props.dispatch(this.props.fetchUserError);
                }
                else {
                    NotificationManager.error(error.message);
                }
            })
    }
    componentDidMount() {
        this.getUsers();
    }


    render() {
        const { theme } = this.props;
        const { users,loading } = this.state;
        return (
            <div className="client-tab-wrap p-15 Tab-wrap">

                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Surveyor" />

                    </Tabs>
                </AppBar>
                <div>
                    <SwipeableViews
                        //animateHeight
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.value}>
                        <div className="card mb-0 transaction-box">
                            <TabContainer dir={theme.direction}>
                                <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                                    <div className="row">
                                        {users && users.map((data, index) => {
                                            return (
                                                <div key={index} className="col-sm-12 col-md-6 col-lg-3">
                                                    <RctCard>
                                                        <RctCardContent>
                                                            <div className="client-post text-center">
                                                                <div className="client-thumb mb-20">
                                                                   {data.profilePic ?
                                                                       <img
                                                                        className="rounded"
                                                                        src={`${SERVER_PATH}${data.profilePic.url}`}
                                                                        alt="client"
                                                                        width="95"
                                                                        height="95"
                                                                    />:
                                                                       <img
                                                                           className="rounded"
                                                                           src={require('Assets/avatars/profile.jpg')}
                                                                           alt="client"
                                                                           width="95"
                                                                           height="95"
                                                                       />
                                                                   }
                                                                </div>
                                                                <div className="client-content">
                                                                    <h4 className="fw-bold text-capitalize text-primary">{data.firstName}{' '}{data.lastName}</h4>
                                                                      <span className="d-block">
                                                                             <a href="#" className="text-dark">{data.email}</a>
                                                                       </span>
                                                                    <span className="d-block text-dark text-capitalize"><b>SUID:</b> #{data.surveyorUID.UID}</span>
                                                                    <span className="d-block text-dark text-capitalize"><b>DEPARTMENT:</b> {data.surveyorUID.department.DepartmentName}</span>
                                                                    <span className="d-block text-dark text-capitalize"><b>{data.countries.countryName}</b></span>

                                                                </div>

                                                            </div>
                                                        </RctCardContent>
                                                    </RctCard>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </TabContainer>
                        </div>

                    </SwipeableViews>
                    {(loading) && <RctSectionLoader/>}
                </div>

            </div>
        );
    }
}


export default connect(null,null)(withStyles(null, { withTheme: true })(SurveyorTab));