import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import ServerError from "views/Error/ServerError.jsx";
import RedirectToLogin from "./RedirectToLogin"
import RedirectToLogout from "./RedirectToLogout"
import SSOHandler from "./SsoHandler"
const indexRoutes = [{ path: "/home", exact:false, component: Dashboard },
{ path: "/ServerError", exact:true, component: ServerError },
{ path: "/login",exact:true, component: RedirectToLogin },
{ path: "/logout",exact:true, component: RedirectToLogout },

{
    path: "/ssohandler/:token/:email",
    hide:true,
    exact:true,
    component: SSOHandler
  },
{ path: "/",exact:false, component: Dashboard },
];

export default indexRoutes;
