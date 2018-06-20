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
  LiveHelp,
  CreateNewFolder,

} from "@material-ui/icons";

const dashboardRoutes = [
  {
    path: "/home/landingPage",
    sidebarName: "Home Page",
    navbarName: "Home Desk",
    icon: Home,
    hide: true,
    component: LandingView
  },
  {
    path: "/home/assetmanager",
    sidebarName: "Asset Manager",
    navbarName: "Asset Manager",
    icon: Devices,
    isLauncher: true,
    url: "http://www.google.com",
  },
  {
    path: "/home/monitoring",
    sidebarName: "Monitoring",
    navbarName: "Monitoring",
    icon: TrackChanges,
    isLauncher: true,
    url: "http://www.google.com",
  },
  {
    path: "/home/servicedesk",
    sidebarName: "Service Desk",
    navbarName: "Service Desk",
    icon: Dashboard,
    isLauncher: true,
    url: "http://www.google.com",
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
    path: "/home/rosterrecord",
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
    path: "/home/helpcenter",
    sidebarName: "Help center",
    navbarName: "Help center",
    icon: LiveHelp,
    isLauncher: true,
    url: "http://www.google.com",
  },

  { redirect: true, path: "/home/servererror", to: "/servererror", navbarName: "Redirect" } ,
  { redirect: true, path: "/", to: "/home/landingPage", navbarName: "Redirect" }
];

export default dashboardRoutes;