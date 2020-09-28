
import Dashboard from 'Routes/dashboard';
import EducationProgram from "Routes/EducationProgram"
import Students from "Routes/Student";
import Class from "Routes/Class";
import Teachers from "Routes/Teachers";

export default [
   {
      path: 'dashboard',
      component: Dashboard
   },
   {
      path: 'education-program',
      component: EducationProgram
   },
   
   {
      path: 'yearclass',
      component: Class
   },
   {
      path: 'students',
      component: Students
   },
   {
      path:'teachers',
      component:Teachers
   },
]
