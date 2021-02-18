import { EducationRoutes ,ConfigRoutes, FinanceRoutes} from "./index"; 
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
  {
    path: "finance",
    component: FinanceRoutes,
  },
];
