/**
 * User List
 */
import React, {Component, createRef, forwardRef} from 'react';
import Button from '@material-ui/core/Button';
import { Helmet } from "react-helmet";

// api
import {api} from 'Api';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import {RctCard, RctCardContent} from 'Components/RctCard';
import TextField from "@material-ui/core/es/TextField";
import ClientTab from './component/Client';
export default class ClientComponent extends Component {

    search_index = createRef();


   render() {
      return (
         <div className="clients-wrapper">
            <Helmet>
               <title>Polucon | Clients</title>
               <meta name="description" content="Reactify Widgets" />
            </Helmet>
            <PageTitleBar title={<IntlMessages id="sidebar.clientList" />} match={this.props.match} />
             <div className="search-bar-wrap">
                 <RctCard >
                     <RctCardContent>
                         <div className="row">
                             <div className="col-sm-12 col-md-3 col-lg-3 align-items-center mb-10 mb-sm-0">
                                 <h2 className="mb-0 text-capitalize">search</h2>
                             </div>
                             <div className="col-sm-12 col-md-9 col-lg-9">
                                 <div className="d-sm-flex">
                                     <div className="search-bar">
                                         <TextField
                                             id="standard-with-placeholder"
                                             inputRef={this.search_index}
                                             placeholder="Search Projects"
                                         />
                                         <Button variant="contained" color="primary" className="mx-sm-15" onClick={() => null}>
                                             Search
                                         </Button>
                                     </div>

                                 </div>
                             </div>
                         </div>
                     </RctCardContent>
                 </RctCard>
             </div>
             <div>
                 <RctCard>
                    <ClientTab/>
                 </RctCard>
             </div>
         </div>
      );
   }
}
