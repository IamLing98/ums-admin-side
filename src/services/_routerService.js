
import Dashboard from 'Routes/dashboard';
import Tasks from "Routes/tasks";
import Users from "Routes/users";
import Maps from "Routes/maps";
import FormBuilder from "Routes/form-builder";
import InvoicesCreate from "Routes/Invoices";
import EducationProgram from "Routes/EducationProgram"

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
      path: 'tasks',
      component: Tasks
   },
   {
      path: 'users',
      component: Users
   },
   {
      path: 'location',
      component: Maps
   },
   {
      path: 'form-builder',
      component: FormBuilder
   },
   {
      path: 'invoices',
      component: InvoicesCreate
   }
]
