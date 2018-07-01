import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch,Redirect } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.2.0";
import "assets/css/material-design-iconic-font.min.css?v=1.2.0";

import indexRoutes from "routes/index.jsx";

const hist = createBrowserHistory();


const PrivateRoute = ({component: Component, ...rest}) =>(
  <Route
      {...rest}
      render={props =>
          sessionStorage.getItem("jwttoken")  ? (
              <Component {...props} />
          ) : (
              <Redirect
                  to={{
                      pathname: "/login",
                      state: {from: props.location}
                  }}
              />
          )
      }
  />
);




ReactDOM.render(

  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
console.log('TEST',prop.path,prop.exact);
        return (prop.exact)? <Route exact  path={prop.path} component={prop.component} key={key} />
        //:<Route  path={prop.path} component={prop.component} key={key}  />;
        :<PrivateRoute  path={prop.path} component={prop.component} key={key}  />;
      })}
    </Switch>
  </Router>,
  document.getElementById("root")
);
