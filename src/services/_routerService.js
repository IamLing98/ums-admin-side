import EducationProgram from "Routes/EducationProgram";
import EducationProgramsHome from "Routes/EducationPrograms"
import Students from "Routes/Student";
import Class from "Routes/Class";
import Teachers from "Routes/Teachers";
import Schedule from "Routes/Schedule";
import Config from "Routes/Config";
export default [
  {
    path: "dashboard",
    component: EducationProgramsHome,
  },
  
  {
    path: "education",
    component: EducationProgramsHome,
  },
  {
    path: "education-program",
    component: EducationProgram,
  },

  {
    path: "yearclass",
    component: Class,
  },
  {
    path: "students",
    component: Students,
  },
  {
    path: "teachers",
    component: Teachers,
  },
  {
    path: "schedule",
    component: Schedule,
  },
  {
    path: "config",
    component: Config,
  },
  
];
