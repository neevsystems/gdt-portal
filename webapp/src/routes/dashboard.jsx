import Roster from "views/Roster/Roster.jsx";
import FileExchange from "views/FileExchange/FileExchange.jsx";
import Calender from "views/Calender/Calender.jsx";
import LandingView from "views/LandingView/LandingView.jsx";
import RosterRecord from "views/Roster/RosterRecord.jsx";
import UploadFiles from "views/FileExchange/UploadFile";
import DashboardPage from 'views/Dashboard/Dashboard.jsx';
import SSOHandler from "./SsoHandler";
import {
  Dashboard,
  Person,
  Schedule,
  Devices,
  TrackChanges,
  Home,
  Help,
  LiveHelp,
  CreateNewFolder,

} from "@material-ui/icons";

const dashboardRoutes = [
  
  {
    path: "/home/dashboard",
    sidebarName: "Home",
    navbarName: "Dashboard",
    icon: Home,
    component: DashboardPage
  },
  {
    path: "/home/assetmanager",
    sidebarName: "Asset Manager",
    navbarName: "Asset Manager",
    icon: Devices,
    isLauncher: true,
    // url: "https://172.16.28.220",
    url: "https://demo.macaw.io/app-dimensions",
  },
  {
    path: "/home/monitoring",
    sidebarName: "Monitoring",
    navbarName: "Monitoring",
    icon: TrackChanges,
    isLauncher: true,
    url: "https://demo.macaw.io/home",
  },
  {
    path: "/home/servicedesk",
    sidebarName: "Service Desk",
    navbarName: "Service Desk",
    icon: Dashboard,
    isLauncher: true,
    url: "https://gdtdtest.service-now.com/incident_list.do",
  },
  {
    path: "/home/calender",
    sidebarName: "Calender",
    navbarName: "Calender",
    icon: Schedule,
    isLauncher:true,
    url: "https://gdtdtest.service-now.com/sys_report_display.do?sysparm_report_id=112b30c7db0797006dcf38fbfc9619a7",
  },

  {
    path: "/home/fileexchange",
    sidebarName: "File exchange",
    navbarName: "File exchange",
    icon: CreateNewFolder,
    component: FileExchange
  },
  {
    path: "/home/roster",
    sidebarName: "Roster",
    navbarName: "Roster",    
    icon: Person,
    component: Roster
  },

  {
    path: "/home/rosterrecord/:uid",
    sidebarName: "Roster",
    navbarName: "Roster",
    hide:true,
    icon: Person,
    component: RosterRecord
  },
  {
    path: "/home/uploadfiles",
    sidebarName: "Upload Files",
    navbarName: "UploadFiles",
    hide:true,
    icon: Person,
    component: UploadFiles
  },
  {
    path: "/home/kcenter",
    sidebarName: "Knowledge center",
    navbarName: "Knowledge center",
    icon: LiveHelp,
    isLauncher: true,
    url: "http://www.google.com",
  },
  { redirect: true, path: "/home/servererror", to: "/servererror", navbarName: "Redirect" } ,
  { redirect: true, path: "/", to: "/home/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;