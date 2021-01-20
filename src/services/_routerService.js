import {EducationRoutes} from "../routes/index"; 
import Config from "Routes/Config";
export default [
  {
    path: "dashboard",
    component: EducationRoutes,
  },
  
  {
    path: "education",
    component: EducationRoutes,
  }, 
  {
    path: "config",
    component: Config,
  },
  
];
