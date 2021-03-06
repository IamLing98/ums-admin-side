/**
 * Page Title Bar Component
 * Used To Display Page Title & Breadcrumbs
 */
import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

// get display string
const getDisplayString = (sub) => {
   const arr = sub.split("-");
   if (arr.length > 1) {
      return <span>{`sidebar.${arr[0].charAt(0) + arr[0].slice(1) + arr[1].charAt(0).toUpperCase() + arr[1].slice(1)}`}</span>   
   } else {
      return <span>{`sidebar.${sub.charAt(0) + sub.slice(1)}`} </span>  
   }

};

// get url string
const getUrlString = (path, sub, index) => {
   if (index === 0) {
      return '/';
   } else {
      return '/' + path.split(sub)[0] + sub;
   }
};

const PageTitleBar = ({ title, match, enableBreadCrumb }) => {
   const path = match.path.substr(1);
   const subPath = path.split('/');
   return (
      <div className="page-title d-flex justify-content-between align-items-center" style={{height:"100%", verticalAlign:"middle", margin:"auto"}}>
         {title &&
            <div className="page-title-wrap" style={{verticalAlign:"middle"}}>
               {/* <i className="ti-angle-left"></i> */}
               <h3 className="" style={{height:"100%", verticalAlign:"middle"}}>{title}</h3>
            </div>
         }
         {/* {enableBreadCrumb &&
            <Breadcrumb className="mb-0 tour-step-7" tag="nav">
               {subPath.map((sub, index) => {
                  return <BreadcrumbItem active={subPath.length === index + 1}
                     tag={subPath.length === index + 1 ? "span" : Link} key={index}
                     to={getUrlString(path, sub, index)}>{getDisplayString(sub)}</BreadcrumbItem>
               }
               )}
            </Breadcrumb>
         } */}
      </div>
   )
};

// default props value
PageTitleBar.defaultProps = {
   enableBreadCrumb: true
}

export default PageTitleBar;
