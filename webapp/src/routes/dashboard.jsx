import Roster from "views/Roster/Roster.jsx";
import FileExchange from "views/FileExchange/FileExchange.jsx";
import Calender from "views/Calender/Calender.jsx";
import LandingView from "views/LandingView/LandingView.jsx";
import RosterRecord from "views/Roster/RosterRecord.jsx";
import UploadFiles from "views/FileExchange/UploadFile";
import SSOHandler from "./SsoHandler"
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
    path: "/home/assetmanager",
    sidebarName: "Asset Manager",
    navbarName: "Asset Manager",
    icon: Devices,
    isLauncher: true,
    url: "https://gdtdev.service-now.com/cmdb_ci_list.do",
  },
  {
    path: "/home/monitoring",
    sidebarName: "Monitoring",
    navbarName: "Monitoring",
    icon: TrackChanges,
    isLauncher: true,
    url: "https://demo.macaw.io",
  },
  {
    path: "/home/servicedesk",
    sidebarName: "Service Desk",
    navbarName: "Service Desk",
    icon: Dashboard,
    isLauncher: true,
    url: "https://gdtdev.service-now.com/incident_list.do",
  },
  {
    path: "/home/calender",
    sidebarName: "Calender",
    navbarName: "Calender",
    icon: Schedule,
    component: Calender
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
  { redirect: true, path: "/", to: "/home/calender", navbarName: "Redirect" }
];

export default dashboardRoutes;