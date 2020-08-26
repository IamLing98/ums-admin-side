/**
 * Sidebar Content
 */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import NavMenuItemAdmin from './NavMenuItemAdmin';

// redux actions
import {onAdminToggleMenu} from "Actions/AppSettingsActions";

class SidebarContentAdmin extends Component {

    toggleMenu(menu, stateCategory) {
        let data = {
            menu,
            stateCategory
        };
        this.props.onAdminToggleMenu(data);
    }

    render() {
        const { AdminSidebarMenu } = this.props.sidebar;
        const {userData} = this.props;

        return (
            <div className="rct-sidebar-nav">
                <nav className="navigation">
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={
                            <ListSubheader className="side-title" component="li">
                               <span>Chung</span>
                            </ListSubheader>}
                    >
                        {AdminSidebarMenu.Admincategory1.map((menu, key) => (
                            <NavMenuItemAdmin
                                menu={menu}
                                key={key}
                                onAdminToggleMenu={() => this.toggleMenu(menu, 'Admincategory1')}
                            />
                        ))}
                    </List>
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={
                            <ListSubheader className="side-title" component="li">
                                <span>Task</span>
                            </ListSubheader>}
                    >
                        {AdminSidebarMenu.Admincategory2.map((menu, key) => (
                            <NavMenuItemAdmin
                                menu={menu}
                                key={key}
                                onAdminToggleMenu={() => this.toggleMenu(menu, 'Admincategory2')}
                            />
                        ))}
                    </List>

                        <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={
                            <ListSubheader className="side-title" component="li">
                                <span>Người dùng</span>
                            </ListSubheader>}
                    >
                        {AdminSidebarMenu.Admincategory3.map((menu, key) => (
                            <NavMenuItemAdmin
                                menu={menu}
                                key={key}
                                onAdminToggleMenu={() => this.toggleMenu(menu, 'Admincategory3')}
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
    onAdminToggleMenu
})(SidebarContentAdmin));
