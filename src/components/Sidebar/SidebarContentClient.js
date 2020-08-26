/**
 * Sidebar Content
 */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; 

import NavMenuItemClient from './NavMenuItemClient';

// redux actions
import {onClientToggleMenu} from "Actions/AppSettingsActions";

class SidebarContentClient extends Component {

    toggleMenu(menu, stateCategory) {
        let data = {
            menu,
            stateCategory
        };
        this.props.onClientToggleMenu(data);
    }

    render() {
        const { ClientSidebarMenu } = this.props.sidebar;
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
                        {ClientSidebarMenu.Clientcategory1.map((menu, key) => (
                            <NavMenuItemClient
                                menu={menu}
                                key={key}
                                onClientToggleMenu={() => this.toggleMenu(menu, 'category1')}
                            />
                        ))}
                    </List>
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={
                            <ListSubheader className="side-title" component="li">
                               <span>Nhiệm vụ</span>
                            </ListSubheader>}
                    >
                        {ClientSidebarMenu.Clientcategory2.map((menu, key) => (
                            <NavMenuItemClient
                                menu={menu}
                                key={key}
                                onClientToggleMenu={() => this.toggleMenu(menu, 'category2')}
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
                        {ClientSidebarMenu.Clientcategory3.map((menu, key) => (
                            <NavMenuItemClient
                                menu={menu}
                                key={key}
                                onClientToggleMenu={() => this.toggleMenu(menu, 'Clientcategory3')}
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
    onClientToggleMenu
})(SidebarContentClient));
