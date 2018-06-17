import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import ServerError from "views/Error/ServerError.jsx";
import RedirectToLogin from "./RedirectToLogin"

const indexRoutes = [{ path: "/home", exact:false, component: Dashboard },
{ path: "/ServerError", exact:true, component: ServerError },
{ path: "/login",exact:true, component: RedirectToLogin },

{ path: "/",exact:false, component: Dashboard },
];

export default indexRoutes;
