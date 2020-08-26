/**
 * Sidebar Content
 */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; 
import NavMenuItem from './NavMenuItem';

// redux actions
import {onSupToggleMenu} from "Actions/AppSettingsActions";

class SidebarContentSuperAdmin extends Component {

    toggleMenu(menu, stateCategory) {
        let data = {
            menu,
            stateCategory
        };
        console.log("data", data)
        this.props.onSupToggleMenu(data);
    }

    render() {
        const { sidebarMenus } = this.props.sidebar;
        const {userData} = this.props;
        console.log("side bar admin", this.props)
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
                        {sidebarMenus.SupAdmincategory1.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onSupToggleMenu={
                                    () => {
                                        this.toggleMenu(menu, 'SupAdmincategory1')
                                    }
                                }
                            />
                        ))}
                    </List>
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={
                            <ListSubheader className="side-title" component="li">
                                <span>Quản lý</span>
                            </ListSubheader>}
                    >
                        {sidebarMenus.SupAdmincategory2.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onSupToggleMenu={() => this.toggleMenu(menu, 'SupAdmincategory2')}
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
                        {sidebarMenus.SupAdmincategory3.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onSupToggleMenu={() => this.toggleMenu(menu, 'SupAdmincategory3')}
                            />
                        ))}
                    </List>
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={
                            <ListSubheader className="side-title" component="li">
                               <span>Xây dựng form</span>
                            </ListSubheader>}
                    >
                        {sidebarMenus.SupAdmincategory4.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onSupToggleMenu={() => this.toggleMenu(menu, 'SupAdmincategory4')}
                            />
                        ))}
                    </List>
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={
                            <ListSubheader className="side-title" component="li">
                                <span>Invoice</span>
                            </ListSubheader>}
                    >
                        {sidebarMenus.SupAdmincategory5.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onSupToggleMenu={() => this.toggleMenu(menu, 'SupAdmincategory5')}
                            />
                        ))}
                    </List>
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={
                            <ListSubheader className="side-title" component="li">
                            <span>Vị trí</span>
                            </ListSubheader>}
                    >
                        {sidebarMenus.SupAdmincategory6.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onSupToggleMenu={() => this.toggleMenu(menu, 'SupAdmincategory6')}
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
    onSupToggleMenu
})(SidebarContentSuperAdmin));
