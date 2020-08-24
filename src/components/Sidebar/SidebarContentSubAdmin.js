/**
 * Sidebar Content
 */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import IntlMessages from 'Util/IntlMessages';

import NavMenuItemSubAdmin from './NavMenuItemSubAdmin';

// redux actions

import {onSubToggleMenu} from "Actions/AppSettingsActions";

class SidebarContentSubAdmin extends Component {

    toggleMenu(menu, stateCategory) {
        let data = {
            menu,
            stateCategory
        };
        this.props.onSubToggleMenu(data);
    }

    render() {
        const { subAdminSidebarMenu } = this.props.sidebar;
        const {userData} = this.props;

        return (
            <div className="rct-sidebar-nav">
                <nav className="navigation">
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={
                            <ListSubheader className="side-title" component="li">
                                <IntlMessages id="sidebar.general" />
                            </ListSubheader>}
                    >
                        {subAdminSidebarMenu.SubAdmincategory1.map((menu, key) => (
                            <NavMenuItemSubAdmin
                                menu={menu}
                                key={key}
                                onSubToggleMenu={() => this.toggleMenu(menu, 'SubAdmincategory1')}
                            />
                        ))}
                    </List>
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={
                            <ListSubheader className="side-title" component="li">
                                <IntlMessages id="sidebar.tasks" />
                            </ListSubheader>}
                    >
                        {subAdminSidebarMenu.SubAdmincategory2.map((menu, key) => (
                            <NavMenuItemSubAdmin
                                menu={menu}
                                key={key}
                                onSubToggleMenu={() => this.toggleMenu(menu, 'SubAdmincategory2')}
                            />
                        ))}
                    </List>

                        <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={
                            <ListSubheader className="side-title" component="li">
                                <IntlMessages id="sidebar.users" />
                            </ListSubheader>}
                    >
                        {subAdminSidebarMenu.SubAdmincategory3.map((menu, key) => (
                            <NavMenuItemSubAdmin
                                menu={menu}
                                key={key}
                                onSubToggleMenu={() => this.toggleMenu(menu, 'SubAdmincategory3')}
                            />
                        ))}
                    </List>



                </nav>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ sidebar }) => {
    return { sidebar };
};

export default withRouter(connect(mapStateToProps, {
    onSubToggleMenu
})(SidebarContentSubAdmin));
