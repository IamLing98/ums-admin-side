/**
 * Sidebar Content
 */
import React, { Component, useEffect } from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import NavMenuItem from "./NavMenuItem";

// redux actions
import { onSupToggleMenu } from "Actions/AppSettingsActions";

const SidebarContentSuperAdmin = (props) => {
  const toggleMenu = (menu, stateCategory) => {
    let data = {
      menu,
      stateCategory,
    };
    props.onSupToggleMenu(data);
  };

  const { sidebarMenus } = props.sidebar;
  const { userData } = props;
  return (
    <div className="rct-sidebar-nav">
      <nav className="navigation">
        <List
          className="rct-mainMenu p-0 m-0 list-unstyled"
          subheader={
            // <ListSubheader className="side-title" component="li">
            //     <span>THỐNG KÊ</span>
            // </ListSubheader>
            <></>
          }
        >
          {sidebarMenus.SupAdmincategory1.map((menu, key) => (
            <NavMenuItem
              menu={menu}
              key={key}
              location={props.location}
              onSupToggleMenu={() => {
                toggleMenu(menu, "SupAdmincategory1");
              }}
            />
          ))}
        </List>
        <List
          className="rct-mainMenu p-0 m-0 list-unstyled"
          subheader={
            // <ListSubheader className="side-title" component="li">
            //     <span>PHÒNG ĐÀO TẠO</span>
            // </ListSubheader>
            <></>
          }
        >
          {sidebarMenus.SupAdmincategory2.map((menu, key) => (
            <NavMenuItem
              menu={menu}
              key={key}
              location={props.location}
              onSupToggleMenu={() => toggleMenu(menu, "SupAdmincategory2")}
            />
          ))}
        </List>
        <List
          className="rct-mainMenu p-0 m-0 list-unstyled"
          subheader={
            // <ListSubheader className="side-title" component="li">
            //     <span>Người dùng</span>
            // </ListSubheader>
            <></>
          }
        >
          {sidebarMenus.SupAdmincategory3.map((menu, key) => (
            <NavMenuItem
              menu={menu}
              key={key}
              location={props.location}
              onSupToggleMenu={() => toggleMenu(menu, "SupAdmincategory3")}
            />
          ))}
        </List> 
        <List
          className="rct-mainMenu p-0 m-0 list-unstyled"
          subheader={
            // <ListSubheader className="side-title" component="li">
            //     <span>Người dùng</span>
            // </ListSubheader>
            <></>
          }
        >
          {sidebarMenus.SupAdmincategory4.map((menu, key) => (
            <NavMenuItem
              menu={menu}
              key={key}
              location={props.location}
              onSupToggleMenu={() => toggleMenu(menu, "SupAdmincategory4")}
            />
          ))}
        </List>
      </nav>
    </div>
  );
};

// map state to props
const mapStateToProps = ({ sidebar }) => {
  return { sidebar };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      onSupToggleMenu,
    },
  )(SidebarContentSuperAdmin),
);
