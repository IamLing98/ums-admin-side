/**
 * Followers Widget
 */
import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button'; 

export default class FollowersWidget extends Component {
   render() {
      return (
         <Card className="rct-block">
            <CardBody className="pb-0 d-flex justify-content-between">
               <h4 className="mb-5"><span>Người theo dõi</span></h4>
               <p className="fs-14 mb-0"><span>Trending</span>: 29% <i className="ti-arrow-up text-success ml-1"></i></p>
            </CardBody>
            <List className="p-0">
               <ListItem className="d-flex justify-content-between border-bottom py-5 fs-14 px-20">
                  <span><span>Tuan truoc</span></span>
                  <span>5400</span>
                  <span><i className="ti-arrow-up text-success mr-5"></i>20%</span>
               </ListItem>
               <ListItem className="d-flex justify-content-between border-bottom py-5 fs-14 px-20">
                  <span><span>Tuan nay</span></span>
                  <span>2400</span>
                  <span><i className="ti-arrow-down text-danger mr-5"></i>-5%</span>
               </ListItem>
            </List>
            <div className="px-20 py-10 d-flex justify-content-end">
               <Button className="btn-xs" variant="contained" size="small" className="text-white" color="primary">
                  <IntlMessages id="button.seeInsights" />
               </Button>
            </div>
         </Card>
      );
   }
}
