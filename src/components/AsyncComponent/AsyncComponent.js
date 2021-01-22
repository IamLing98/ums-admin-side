/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from '../RctPageLoader/RctPageLoader';
// home dashboard

// education programs  

const AsyncEducationProgramsComponent = Loadable({
   loader: () => import("Routes/EducationPrograms"),
   loading: () => <RctPageLoader />
});


//subject

const AsyncSubjectsComponent = Loadable({
   loader: () => import("Routes/Subjects"),
   loading: () => <RctPageLoader />
});

 
// student 
const AsyncStudentComponent = Loadable({
   loader: () => import('Routes/Students'),
   loading: () => <RctPageLoader />
});


// class
const AsyncYearClassComponent = Loadable({
   loader: () => import('Routes/Class'),
   loading: () => <RctPageLoader />
});


//teacher
 const AsyncTeachersComponent = Loadable({
   loader: () => import('Routes/Teachers/Components'),
   loading: () => <RctPageLoader />
});


//schedule
const AsyncScheduleComponent = Loadable({
   loader: () => import('Routes/Schedule'),
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
   AsyncEducationProgramsComponent, 

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
   AsyncAdminLoginComponent,
   AsyncSessionPage404Component,
   AsyncSessionPage500Component,
};
