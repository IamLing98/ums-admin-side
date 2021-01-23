import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';

// app config
import AppConfig from 'Constants/AppConfig';
import {connect} from 'react-redux'
const mapStateToProps = state =>({
   ...state.auth
});

class Forgotpwd extends Component {

   componentDidMount(){
      if(this.props.isAuthenticated){
         this.props.history.push("/")
      }
   }

   render() {
      return (
         <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper" key="1">
               <AppBar position="static" className="session-header">
                  <Toolbar>
                     <div className="container">
                        <div className="d-flex justify-content-between">
                           <div className="session-logo">
                              <Link to="/">
                                 <img src={require('Assets/img/site-logo.png')} alt="session-logo" className="img-fluid" width="110" height="35" />
                              </Link>
                           </div>

                        </div>
                     </div>
                  </Toolbar>
               </AppBar>
               <div className="session-inner-wrapper p-4 h-100 p-md-0">
                  <div className="row">
                     <div className="col-sm-8 col-lg-5 mx-auto">
                        <div className="session-body text-center">
                           <div className="session-head mb-30">
                              <h2>Welcome to {AppConfig.brandName}</h2>
                              <p className="mb-0">We will send you an email to reset your password</p>
                           </div>
                           <Form>
                              <FormGroup className="has-wrapper">
                                 <Input type="mail" name="user-mail" id="user-mail" className="has-input input-lg" placeholder="Enter Email Address" onChange={(event) => this.setState({ email: event.target.value })} />
                                 <span className="has-icon"><i className="ti-email"></i></span>
                              </FormGroup>
                              <FormGroup>
                                 <Button variant="contained" className="btn-info text-white btn-block btn-large w-100">Reset Password</Button>
                              </FormGroup>
                              <Button component={Link} to="/admin-login" className="btn-dark btn-block btn-large text-white w-100">Already having account?  Login</Button>
                           </Form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </QueueAnim>
      );
   }
}
export default connect(mapStateToProps,null)(Forgotpwd)
