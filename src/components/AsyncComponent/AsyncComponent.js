/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';

// home dashboard
const AsyncHomeDashboardComponent = Loadable({
   loader: () => import("Routes/dashboard/home"),
   loading: () => <RctPageLoader />,
});
const AsyncClientHomeDashboardComponent = Loadable({
   loader: () => import("Routes/dashboard/client-home"),
   loading: () => <RctPageLoader />,
});


// education programs 

const AsyncProgramsComponent = Loadable({
   loader: () => import("Routes/EducationProgram/Programs"),
   loading: () => <RctPageLoader />,
});

const AsyncEducationProgramDetailComponent = Loadable({
   loader: () => import('Routes/EducationProgram/Programs/Components/EducationProgramDetails'),
   loading: () => <RctPageLoader />
});

// student list
const AsyncStudentListComponent = Loadable({
   loader: () => import('Routes/Students/StudentList'),
   loading: () => <RctPageLoader />
});

// class
const AsyncYearClassComponent = Loadable({
   loader: () => import('Routes/Class/Components'),
   loading: () => <RctPageLoader />
});


//login
const AsyncAdminLoginComponent = Loadable({
   loader: () => import('Routes/login'),
   loading: () => <RctPageLoader />
});


//error
const AsyncSessionPage404Component = Loadable({
   loader: () => import('Routes/session/404'),
   loading: () => <RctPageLoader />
});
const AsyncSessionPage500Component = Loadable({
   loader: () => import('Routes/session/500'),
   loading: () => <RctPageLoader />
});

const AsyncFormBuilderComponent = Loadable({
   loader: () => import('Routes/form-builder/builder'),
   loading: () => <RctPageLoader />
});
//forgot pass
const AsyncForgotPassComponent = Loadable({
   loader: () => import('Routes/session/forgot-password'),
   loading: () => <RctPageLoader />
});


export {
   AsyncStudentListComponent,
   AsyncEducationProgramDetailComponent,
   AsyncProgramsComponent,

   //class
   AsyncYearClassComponent,

   AsyncForgotPassComponent,
   AsyncHomeDashboardComponent,
   AsyncFormBuilderComponent,
   AsyncAdminLoginComponent,
   AsyncSessionPage404Component,
   AsyncSessionPage500Component,
   AsyncClientHomeDashboardComponent
};
