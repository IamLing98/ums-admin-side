/**
 * Nav Menu Item
 */
import React, { Fragment, Component } from 'react';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import classnames from 'classnames';
import Chip from '@material-ui/core/Chip';

class NavMenuItem extends Component {

   componentDidMount() {
      this.updateDimensions();
      window.addEventListener("resize", this.updateDimensions);
   }

   componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
   }

   updateDimensions = () => {
      this.setState({ windowWidth: $(window).width() });
   }

   render() {
      const { menu } = this.props;
      return (
         <li className="nav-item">
            {menu.child_routes !== null ?
               <Fragment>
                  <a href="javascript:void(0);" className="nav-link">
                     <i className={menu.menu_icon}></i>
                     <span>{menu.menu_title} </span>
                     {menu.new_item && menu.new_item === true ?
                        <Chip label="new" className="new-item" color="secondary" />
                        :
                        ''
                     }
                  </a>
                  <ul className={classnames("list-unstyled sub-menu-child", { 'deep-level': menu.child_routes.length > 10 })}>
                     {menu.child_routes.map((subMenu, subKey) => {
                        if (!subMenu.child_routes) {
                           return (
                              <li className='nav-item' key={subKey}>
                                 <NavLink to={subMenu.path} className="nav-link no-arrow" activeClassName="active">
                                    <span>{subMenu.menu_title} </span> 
                                    {subMenu.new_item && subMenu.new_item === true ?
                                       <Chip label="new" className="new-item" color="secondary" />
                                       :
                                       ''
                                    }
                                 </NavLink>
                              </li>
                           )
                        }
                        return (
                           <li className='nav-item' key={subKey}>
                              <a href="javascript:void(0);" className="nav-link">
                                 <span>{subMenu.menu_title} </span> 
                              </a>
                              <ul className="list-unstyled sub-menu-sub-child">
                                 {subMenu.child_routes.map((nestedMenu, nestedKey) => (
                                    <li className="nav-item" key={nestedKey}>
                                       <NavLink to={nestedMenu.path} className="nav-link" activeClassName="active">
                                          <span>{nestedMenu.menu_title}  </span> 
                                       </NavLink>
                                    </li>
                                 ))}
                              </ul>
                           </li>
                        );
                     })}
                  </ul>
               </Fragment> :
               <NavLink to={menu.path} className="nav-link no-arrow">
                  <i className={menu.menu_icon}></i>
                 <span >{menu.menu_title}</span>{menu.menu_title}  
               </NavLink>
            }
         </li>
      );
   }
}

export default NavMenuItem;
