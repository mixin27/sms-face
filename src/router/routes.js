import requiredAllAuth from "../components/hocs/AllAuth";

import Layout from "../layout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Notfound from "../pages/Notfound";

// Machine
import Machine from "../pages/Machine";
import NewMachine from "../pages/Machine/create";
import EditMachine from "../pages/Machine/edit";
import DetailMachine from "../pages/Machine/detail";

// Complain
import Complain from "../pages/Complain";
import NewComplain from "../pages/Complain/create";
import DetailComplain from "../pages/Complain/detail";
import EditComplain from "../pages/Complain/edit";

// Department
import Department from "../pages/Department";

// Position
import Position from "../pages/Position";

// Model
import Model from "../pages/Model";

// Employee
import Employee from "../pages/Employee";
import EmployeeDetail from "../pages/Employee/detail";
import NewEmployee from "../pages/Employee/create";
import EditEmployee from "../pages/Employee/edit";

// Assign To Schedule
import AssignToSchedule from "../pages/AssignToSchedule";
import DetailAssignSchedule from "../pages/AssignToSchedule/assign-view";
import AcceptAssignSchedule from "../pages/AssignToSchedule/assign-accept";

// Schedule
import Schedule from "../pages/Schedule";
import EditSchedule from "../pages/Schedule/edit";
import DetailSchedule from "../pages/Schedule/view";

// Machine History
import DetailMachineHistory from "../pages/MachineHistory/view";

// ServiceMan
import Job from '../pages/Job';
import Profile from "../pages/Profile";
import EditProfile from "../pages/Profile/edit";
import DailyReport from "../pages/DailyReport";
import DailyReportView from "../pages/DailyReport/view"
import JobWeekly from "../pages/Job/job-weekly";
import JobAll from "../pages/Job/job-all";
import JobDetail from "../pages/Job/detail";

import Account from "../pages/UserManagement/Account";
import AccountCreate from "../pages/UserManagement/Account/create";
import AccountEdit from "../pages/UserManagement/Account/edit";

import Module from "../pages/UserManagement/Module";
import NewModule from "../pages/UserManagement/Module/create";
import EditModule from "../pages/UserManagement/Module/edit";

import Role from "../pages/UserManagement/Role";
import RoleEdit from "../pages/UserManagement/Role/edit";
import TermsAndConditions from "../pages/TermsAndConditions";


export default [
  {
    component: Layout,
    routes: [
      {
        component: requiredAllAuth(Dashboard),
        path: "/",
        exact: true
      },
      {
        component: Login,
        path: "/login"
      },
      {
        component: requiredAllAuth(Employee),
        path: "/employees",
        exact: true
      },
      {
        component: requiredAllAuth(NewEmployee),
        path: "/employees/employee/new",
        exact: true
      },
      {
        component: requiredAllAuth(EditEmployee),
        path: "/employees/employee/edit/:id",
        exact: true
      },
      {
        component: requiredAllAuth(EmployeeDetail),
        path: "/employees/employee/view/:id",
        exact: true
      },
      {
        component: requiredAllAuth(EmployeeDetail),
        path: "/servicemen/serviceman/view/:id",
        exact: true
      },
      {
        component: requiredAllAuth(Position),
        path: "/positions",
        exact: true
      },
      {
        component: requiredAllAuth(Department),
        path: "/departments",
        exact: true
      },
      {
        component: requiredAllAuth(Model),
        path: "/models",
        exact: true
      },
      {
        component: requiredAllAuth(Machine),
        path: "/machines",
        exact: true
      },
      {
        component: requiredAllAuth(NewMachine),
        path: "/machines/machine/new",
        exact: true
      },
      {
        component: requiredAllAuth(EditMachine),
        path: "/machines/machine/edit/:id",
        exact: true
      },
      {
        component: requiredAllAuth(DetailMachine),
        path: "/machines/machine/view/:id",
        exact: true
      },
      {
        component: requiredAllAuth(Complain),
        path: "/complains",
        exact: true
      },
      {
        component: requiredAllAuth(NewComplain),
        path: "/complains/complain/new",
        exact: true
      },
      {
        component: requiredAllAuth(DetailComplain),
        path: "/complains/complain/view/:id",
        exact: true
      },
      {
        component: requiredAllAuth(EditComplain),
        path: "/complains/complain/edit/:id",
        exact: true
      },
      {
        component: requiredAllAuth(AssignToSchedule),
        path: "/assigntoschedule",
        exact: true
      },
      {
        component: requiredAllAuth(Schedule),
        path: "/schedule",
        exact: true
      },
      {
        component: requiredAllAuth(AcceptAssignSchedule),
        path: "/schedules/assign-accept/:id/:complain_no",
        exact: true
      },
      {
        component: requiredAllAuth(DetailAssignSchedule),
        path: "/schedules/assign-view/:id/:complain_no",
        exact: true
      },
      {
        component: requiredAllAuth(DetailSchedule),
        path: "/schedules/schedule/view/:id/:complain_no",
        exact: true
      },
      {
        component: requiredAllAuth(EditSchedule),
        path: "/schedules/schedule/edit/:id/:complain_no",
        exact: true
      },
      {
        component: requiredAllAuth(DetailMachineHistory),
        path: "/machineHistories/view/:id/:emp_code/:complain_no",
        exact: true
      },
      {
        component: requiredAllAuth(Account),
        path: "/account",
        exact: true
      },
      {
        component: requiredAllAuth(AccountCreate),
        path: "/account/new",
        exact: true
      },
      {
        component: requiredAllAuth(AccountEdit),
        path: "/account/edit/:id",
        exact: true
      },
      {
        component: requiredAllAuth(Module),
        path: "/module",
        exact: true
      },
      {
        component: requiredAllAuth(NewModule),
        path: "/module/new",
        exact: true
      },
      {
        component: requiredAllAuth(EditModule),
        path: "/module/edit/:id",
        exact: true
      },
      {
        component: requiredAllAuth(Role),
        path: "/role",
        exact: true
      },
      {
        component: requiredAllAuth(RoleEdit),
        path: "/role/edit/:id",
        exact: true
      },
      // Service Man
      {
        component: requiredAllAuth(Profile),
        path: "/profile",
        exact: true
      },
      {
        component: requiredAllAuth(EditProfile),
        path: "/profile/edit/:id",
        exact: true
      },
      {
        component: requiredAllAuth(Job),
        path: "/job",
        exact: true
      },
      {
        component: requiredAllAuth(DailyReport),
        path: "/daily-report",
        exact: true
      },
      {
        component: requiredAllAuth(DailyReportView),
        path: "/daily-report/view/:id",
        exact: true
      },
      {
        component: requiredAllAuth(JobWeekly),
        path: "/job-weekly",
        exact: true
      },
      {
        component: requiredAllAuth(JobAll),
        path: "/job-all",
        exact: true
      },
      {
        component: requiredAllAuth(JobDetail),
        path: "/job-detail/:id/:complain_no",
        exact: true
      },
      {
        component: requiredAllAuth(TermsAndConditions),
        path: "/terms-conditions",
        exact: true
      },
      {
        component: Notfound
      }
    ]
  }
];
