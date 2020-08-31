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


// module -
const AsyncModuleComponent = Loadable({
   loader: () => import("Routes/EducationProgram/Module"),
   loading: () => <RctPageLoader />,
});

const AsyncProgramsComponent = Loadable({
   loader: () => import("Routes/EducationProgram/Programs"),
   loading: () => <RctPageLoader />,
});

const AsyncEducationProgramDetailComponent = Loadable({
   loader: () => import('Routes/EducationProgram/Programs/Components/EducationProgramDetails'),
   loading: () => <RctPageLoader/>
});
//tasks
const AysncTasksApprovedComponent = Loadable({
   loader: () => import('Routes/tasks/approved'),
   loading : () => <RctPageLoader/>
});
const AsyncInProgressComponent = Loadable({
   loader: () => import('Routes/tasks/InProgress'),
   loading: () => <RctPageLoader/>
});

const AysncTasksPendingComponent = Loadable({
   loader: () => import('Routes/tasks/pending'),
   loading : () => <RctPageLoader/>
});
const AysncTasksRejectedComponent = Loadable({
   loader: () => import('Routes/tasks/rejected'),
   loading : () => <RctPageLoader/>
});
const AysncAssignTaskComponent = Loadable({
   loader: () => import('Routes/tasks/AssignTasks'),
   loading : () => <RctPageLoader/>
});
const AysncCreateTaskComponent = Loadable({
   loader: () => import('Routes/tasks/CreateTasks'),
   loading : () => <RctPageLoader/>
});
const AysncCompletedTaskComponent = Loadable({
   loader: () => import('Routes/tasks/completed'),
   loading : () => <RctPageLoader/>
});
const AysncClientTaskComponent = Loadable({
   loader: () => import('Routes/tasks/ClientTasks'),
   loading : () => <RctPageLoader/>
});
//login
const AsyncAdminLoginComponent = Loadable({
   loader: () => import('Routes/login'),
   loading: () => <RctPageLoader/>
});
//user management
const AsyncClientListComponent = Loadable({
   loader: () => import('Routes/users/client-list'),
   loading: () => <RctPageLoader/>
});
const AsyncSurveyorListComponent = Loadable({
   loader: () => import('Routes/users/surveyor-list'),
   loading: () => <RctPageLoader/>
});
const AsyncUserProfileComponent = Loadable({
   loader: () => import('Routes/users/user-profile'),
   loading: () => <RctPageLoader/>
});
const AsyncUserProfile1Component = Loadable({
   loader: () => import('Routes/users/user-profile-1'),
   loading: () => <RctPageLoader/>
});

const AsyncUserManagementCreateUserComponent = Loadable({
   loader: () => import('Routes/users/user-management/create-user'),
   loading: () => <RctPageLoader/>
});

//error
const AsyncSessionPage404Component = Loadable({
   loader: () => import('Routes/session/404'),
   loading: () => <RctPageLoader/>
});
const AsyncSessionPage500Component = Loadable({
   loader: () => import('Routes/session/500'),
   loading: () => <RctPageLoader/>
});
//location
const AsyncGooleMapsComponent = Loadable({
   loader: () => import('Routes/maps/google-map'),
   loading: () => <RctPageLoader/>
});
const AsyncFormBuilderComponent = Loadable({
   loader: () => import('Routes/form-builder/builder'),
   loading: () => <RctPageLoader/>
});
//forgot pass
const AsyncForgotPassComponent = Loadable({
   loader: () => import('Routes/session/forgot-password'),
   loading: () => <RctPageLoader/>
});
const AsyncInvoicesCreateComponent = Loadable({
   loader: () => import('Routes/Invoices/create'),
   loading: () => <RctPageLoader/>
});


export {
   AsyncEducationProgramDetailComponent,
   AsyncModuleComponent,
   AsyncProgramsComponent,
   AsyncForgotPassComponent,
   AsyncInvoicesCreateComponent,
   AsyncHomeDashboardComponent,
   AsyncFormBuilderComponent,
   AysncCompletedTaskComponent,
   AsyncGooleMapsComponent,
   AysncTasksApprovedComponent,
   AysncCreateTaskComponent,
   AsyncInProgressComponent,
   AysncAssignTaskComponent,
   AysncTasksPendingComponent,
   AysncTasksRejectedComponent,
   AsyncAdminLoginComponent,
   AsyncClientListComponent,
   AsyncSurveyorListComponent,
   AsyncUserProfile1Component,
   AsyncUserManagementCreateUserComponent,
   AsyncUserProfileComponent,
   AsyncSessionPage404Component,
   AsyncSessionPage500Component,
   AysncClientTaskComponent,
   AsyncClientHomeDashboardComponent
};
