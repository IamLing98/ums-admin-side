/**
 * Email Prefrences Page
 */
import React, { Component } from 'react';
import Switch from 'react-toggle-switch';
import Button from '@material-ui/core/Button';
import { FormGroup, Input } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import {api} from "Api";
import {parseApiErrors} from "Util/apiUtils";

export default class EmailPrefrences extends Component {

   state = {
      loading: false,
      email:null
   };

   // on save changes
   onSaveChanges() {
      this.setState({ loading: true });
      const email = this.state.email;
      const userId = localStorage.getItem('user_id');
      api.put(`/users/${userId}/reset-email`,{email:email}).then(response =>{
         this.setState({loading: false});
         setTimeout(function(){  window.location.reload(); }, 5000);
         NotificationManager.success('Please confirm email and re-login');
      }).catch(error =>{
         this.setState({loading: false});
         const errors = parseApiErrors(error);
         console.log(error.response);
         if (errors){
            NotificationManager.error(errors.email);
         }
      })
   }

   render() {
      let loading = this.state.loading;
      return (
         <div className="prefrences-wrapper">
            <div className="row">
               <div className="col-sm-12 col-md-8">
                  <div className="search-filter p-0 mb-50">
                     <form>
                        <h2 className="heading"><IntlMessages id="widgets.updateYourEmailAddress" /></h2>
                        <FormGroup className="mb-0 w-40">
                           <Input type="search" className="input-lg" name="search" placeholder="example@example.com" onChange={(e) => this.setState({ email: e.target.value })} />
                        </FormGroup>
                        { loading ?
                            <CircularProgress />:
                            <Button variant="contained" color="primary" className="text-white btn-lg" onClick={()=>this.onSaveChanges()}>
                               <IntlMessages id="button.save" />
                            </Button>}

                     </form>
                  </div>


               </div>
            </div>
         </div>
      );
   }
}
