/**
 * Sidebar Reducers
 */
import update from "react-addons-update";
import {
  AGENCY_TOGGLE_MENU,
  TOGGLE_ADMIN_MENU,
  TOGGLE_CLIENT_MENU,
  TOGGLE_SUB_MENU,
  TOGGLE_SUP_MENU,
  CHANGE_CURRENT_LOCATION_PATH_NAME,
} from "Actions/types";

// nav links
import navLinks from "Components/Sidebar/NavLinks";
import subNavLinks from "Components/Sidebar/subAdminNavLinks";
import AdminNavLinks from "Components/Sidebar/AdminNavLinks";
import ClientNavLinks from "Components/Sidebar/ClientNavLinks";
import agencyNavLinks from "Components/AgencyMenu/NavLinks";

const INIT_STATE = {
  sidebarMenus: navLinks,
  subAdminSidebarMenu: subNavLinks,
  AdminSidebarMenu: AdminNavLinks,
  ClientSidebarMenu: ClientNavLinks,
  agencySidebarMenu: agencyNavLinks,
  currentLocationPathName: {
    pathName: "/",
    pageTitle: "",
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TOGGLE_SUP_MENU:
      let sup_index = state.sidebarMenus[action.payload.stateCategory].indexOf(
        action.payload.menu
      );
      for (var key in state.sidebarMenus) {
        var obj = state.sidebarMenus[key];
        for (let i = 0; i < obj.length; i++) {
          const element = obj[i];
          if (element.open) {
            if (key === action.payload.stateCategory) {
              return update(state, {
                sidebarMenus: {
                  [key]: {
                    [i]: {
                      open: { $set: false },
                    },
                    [sup_index]: {
                      open: { $set: !action.payload.menu.open },
                    },
                  },
                },
              });
            } else {
              return update(state, {
                sidebarMenus: {
                  [key]: {
                    [i]: {
                      open: { $set: false },
                    },
                  },
                  [action.payload.stateCategory]: {
                    [sup_index]: {
                      open: { $set: !action.payload.menu.open },
                    },
                  },
                },
              });
            }
          }
        }
      }
      return update(state, {
        sidebarMenus: {
          [action.payload.stateCategory]: {
            [sup_index]: {
              open: { $set: !action.payload.menu.open },
            },
          },
        },
      });
    case TOGGLE_SUB_MENU:
      let sub_index = state.subAdminSidebarMenu[
        action.payload.stateCategory
      ].indexOf(action.payload.menu);
      for (var key in state.subAdminSidebarMenu) {
        var objSub = state.subAdminSidebarMenu[key];
        for (let i = 0; i < objSub.length; i++) {
          const element = objSub[i];
          if (element.open) {
            if (key === action.payload.stateCategory) {
              return update(state, {
                subAdminSidebarMenu: {
                  [key]: {
                    [i]: {
                      open: { $set: false },
                    },
                    [sub_index]: {
                      open: { $set: !action.payload.menu.open },
                    },
                  },
                },
              });
            } else {
              return update(state, {
                subAdminSidebarMenu: {
                  [key]: {
                    [i]: {
                      open: { $set: false },
                    },
                  },
                  [action.payload.stateCategory]: {
                    [sub_index]: {
                      open: { $set: !action.payload.menu.open },
                    },
                  },
                },
              });
            }
          }
        }
      }
      return update(state, {
        subAdminSidebarMenu: {
          [action.payload.stateCategory]: {
            [sub_index]: {
              open: { $set: !action.payload.menu.open },
            },
          },
        },
      });
    case TOGGLE_ADMIN_MENU:
      let admin_index = state.AdminSidebarMenu[
        action.payload.stateCategory
      ].indexOf(action.payload.menu);
      for (var key in state.AdminSidebarMenu) {
        var objAdmin = state.AdminSidebarMenu[key];
        for (let i = 0; i < objAdmin.length; i++) {
          const element = objAdmin[i];
          if (element.open) {
            if (key === action.payload.stateCategory) {
              return update(state, {
                AdminSidebarMenu: {
                  [key]: {
                    [i]: {
                      open: { $set: false },
                    },
                    [admin_index]: {
                      open: { $set: !action.payload.menu.open },
                    },
                  },
                },
              });
            } else {
              return update(state, {
                AdminSidebarMenu: {
                  [key]: {
                    [i]: {
                      open: { $set: false },
                    },
                  },
                  [action.payload.stateCategory]: {
                    [admin_index]: {
                      open: { $set: !action.payload.menu.open },
                    },
                  },
                },
              });
            }
          }
        }
      }
      return update(state, {
        AdminSidebarMenu: {
          [action.payload.stateCategory]: {
            [admin_index]: {
              open: { $set: !action.payload.menu.open },
            },
          },
        },
      });
    case TOGGLE_CLIENT_MENU:
      let client_index = state.ClientSidebarMenu[
        action.payload.stateCategory
      ].indexOf(action.payload.menu);
      for (var key in state.ClientSidebarMenu) {
        var objClient = state.ClientSidebarMenu[key];
        for (let i = 0; i < objClient.length; i++) {
          const element = objClient[i];
          if (element.open) {
            if (key === action.payload.stateCategory) {
              return update(state, {
                ClientSidebarMenu: {
                  [key]: {
                    [i]: {
                      open: { $set: false },
                    },
                    [client_index]: {
                      open: { $set: !action.payload.menu.open },
                    },
                  },
                },
              });
            } else {
              return update(state, {
                ClientSidebarMenu: {
                  [key]: {
                    [i]: {
                      open: { $set: false },
                    },
                  },
                  [action.payload.stateCategory]: {
                    [client_index]: {
                      open: { $set: !action.payload.menu.open },
                    },
                  },
                },
              });
            }
          }
        }
      }
      return update(state, {
        ClientSidebarMenu: {
          [action.payload.stateCategory]: {
            [client_index]: {
              open: { $set: !action.payload.menu.open },
            },
          },
        },
      });
    case AGENCY_TOGGLE_MENU:
      let agencyMenuIndex = state.agencySidebarMenu[
        action.payload.stateCategory
      ].indexOf(action.payload.menu);
      for (var id in state.agencySidebarMenu) {
        var object = state.agencySidebarMenu[id];
        for (let i = 0; i < object.length; i++) {
          const element = object[i];
          if (element.open) {
            if (id === action.payload.stateCategory) {
              return update(state, {
                agencySidebarMenu: {
                  [id]: {
                    [i]: {
                      open: { $set: false },
                    },
                    [agencyMenuIndex]: {
                      open: { $set: !action.payload.menu.open },
                    },
                  },
                },
              });
            } else {
              return update(state, {
                agencySidebarMenu: {
                  [id]: {
                    [i]: {
                      open: { $set: false },
                    },
                  },
                  [action.payload.stateCategory]: {
                    [agencyMenuIndex]: {
                      open: { $set: !action.payload.menu.open },
                    },
                  },
                },
              });
            }
          }
        }
      }
      return update(state, {
        agencySidebarMenu: {
          [action.payload.stateCategory]: {
            [agencyMenuIndex]: {
              open: { $set: !action.payload.menu.open },
            },
          },
        },
      });
    case CHANGE_CURRENT_LOCATION_PATH_NAME:
      return {
        ...state,
        currentLocationPathName: { ...action.payload },
      };
    default:
      return { ...state };
  }
};
