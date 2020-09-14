
import Dashboard from 'Routes/dashboard';
import FormBuilder from "Routes/form-builder";
import EducationProgram from "Routes/EducationProgram"
import Students from "Routes/Students";
import Class from "Routes/Class";

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
      path: 'class',
      component: Class
   },
   {
      path: 'students',
      component: Students
   },
   {
      path: 'form-builder',
      component: FormBuilder
   }
]
