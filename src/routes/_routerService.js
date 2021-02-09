import { EducationRoutes ,ConfigRoutes} from "./index"; 
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
    component: ConfigRoutes,
  },
];
