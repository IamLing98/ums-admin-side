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

const AsyncEducationProgramsComponent = Loadable({
   loader: () => import("Routes/EducationPrograms/Components"),
   loading: () => <RctPageLoader />
});


//subject

const AsyncSubjectsComponent = Loadable({
   loader: () => import("Routes/Subjects"),
   loading: () => <RctPageLoader />
});



const AsyncEducationProgramComponent = Loadable({
   loader: () => import("Routes/EducationProgram/AsyncEducationProgramsComponent"),
   loading: () => <RctPageLoader />,
});

const AsyncEducationProgramDetailComponent = Loadable({
   loader: () => import("Routes/EducationProgram/AsyncEducationProgramsComponent"),
   loading: () => <RctPageLoader />
});

// student 
const AsyncStudentComponent = Loadable({
   loader: () => import('Routes/Student/Components'),
   loading: () => <RctPageLoader />
});

// class
const AsyncYearClassComponent = Loadable({
   loader: () => import('Routes/Class/Components'),
   loading: () => <RctPageLoader />
});

//teacher
 const AsyncTeachersComponent = Loadable({
   loader: () => import('Routes/Teachers/Components'),
   loading: () => <RctPageLoader />
});

//schedule
const AsyncScheduleComponent = Loadable({
   loader: () => import('Routes/Schedule/Components'),
   loading: () => <RctPageLoader />
});

//login
const AsyncAdminLoginComponent = Loadable({
   loader: () => import('Routes/login'),
   loading: () => <RctPageLoader />
});

// CONFIG - Room
const AsyncRoomConfigComponent = Loadable({
   loader: () => import('Routes/Config/RoomConfigComponents/index.js'),
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

//forgot pass
const AsyncForgotPassComponent = Loadable({
   loader: () => import('Routes/session/forgot-password'),
   loading: () => <RctPageLoader />
});


export {
   //student
   AsyncStudentComponent,
   
   //education program
   AsyncEducationProgramDetailComponent,
   AsyncEducationProgramsComponent,
   AsyncEducationProgramComponent,

   //class
   AsyncYearClassComponent,

   //teachers
   AsyncTeachersComponent,
   
   //schedule
   AsyncScheduleComponent,

   //Room Config
   AsyncRoomConfigComponent,

   //Subjects

   AsyncSubjectsComponent,

   AsyncForgotPassComponent,
   AsyncHomeDashboardComponent,
   AsyncAdminLoginComponent,
   AsyncSessionPage404Component,
   AsyncSessionPage500Component,
   AsyncClientHomeDashboardComponent
};
