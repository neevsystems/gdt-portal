import Dashboard from "layouts/Dashboard/Dashboard.jsx";


const indexRoutes = [{ path: "/home", exact:false, component: Dashboard },
{ path: "/login",exact:true, component: Dashboard },{ path: "/",exact:false, component: Dashboard }];

export default indexRoutes;
