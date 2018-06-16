import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import ServerError from "views/Error/ServerError.jsx";

const indexRoutes = [{ path: "/home", exact:false, component: Dashboard },
{ path: "/ServerError", exact:true, component: ServerError },
{ path: "/login",exact:true, component: Dashboard },{ path: "/",exact:false, component: Dashboard }];

export default indexRoutes;
