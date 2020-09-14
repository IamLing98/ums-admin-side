/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

// rct theme provider
import RctThemeProvider from './RctThemeProvider';

//Main App
import RctDefaultLayout from './DefaultLayout';

import RctHorizontalLayout from "./RctHorizontalLayout";

import {
    AsyncAdminLoginComponent, AsyncForgotPassComponent,
    AsyncSessionPage404Component,
    AsyncSessionPage500Component
} from "Components/AsyncComponent/AsyncComponent";
import {api} from "Api";
import {userLoginSuccess} from "Actions";
/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component,authToken,...rest }) =>{
    return(   <Route
       {...rest}
       render={props =>
           authToken
               ? <Component {...props}/>
               : <Redirect
                   to={{
                       pathname: '/login',
                       state: { from: props.location }
                   }}
               />}
   />);
};


class App extends Component {
    constructor(props){
        super(props);
        const tokenJwt = localStorage.getItem('jwtToken');
        if(tokenJwt){
            api.setToken(tokenJwt);
        }
    }


   render() {
      const { location,match,token } = this.props;
       if (location.pathname === '/') {
           if(token === null){
              return (<Redirect to={'/login'}/>);
           } else {
              return (<Redirect to={'/app/dashboard/home'}/>)
           }
       }
      return (
         <RctThemeProvider>
            <NotificationContainer />
             <InitialPath
                 path={`${match.url}app`}
                 authToken = {token}
                 component={RctDefaultLayout}
             />

             <Switch>

                 <Route exact path="/login" component={AsyncAdminLoginComponent}/>
                 <Route path="/session/404" component={AsyncSessionPage404Component} />
                 <Route path="/session/500" component={AsyncSessionPage500Component} />
                 <Route path="/forgot-password" component={AsyncForgotPassComponent}/>
                 <Route path="*" component={AsyncSessionPage404Component}/>

             </Switch>
         </RctThemeProvider>

      );
   }
}

// map state to props
const mapStateToProps = state =>({
    ...state.auth
});



export default connect(mapStateToProps,{
    userLoginSuccess
})(App);
