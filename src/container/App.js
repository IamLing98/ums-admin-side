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
// const InitialPath = ({ component: Component,authToken,...rest }) =>{
//     return(   <Route
//        {...rest}
//        render={props =>
//            authToken
//                ? <Component {...props}/>
//                : <Redirect
//                    to={{
//                        pathname: '/admin-login',
//                        state: { from: props.location }
//                    }}
//                />}
//    />);
// };


const InitialPath = ({ component: Component,authToken,...rest }) =>{
    return(   
    <Route
       {...rest}
       render={props =><Component {...props}/> }
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
           if(token !== null){
              return (<Redirect to={'/admin-login'}/>);
           } else {
              return (<Redirect to={'/dashboard/home'}/>)
           }
       }
      return (
         <RctThemeProvider>
            <NotificationContainer />
             <InitialPath
                 path={``}
                 authToken = {token}
                 component={RctDefaultLayout}
             />

             <Switch>

                 <Route exact path="/admin-login" component={AsyncAdminLoginComponent}/>
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
