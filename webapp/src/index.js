import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch,Redirect } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.2.0";
import "assets/css/material-design-iconic-font.min.css?v=1.2.0";

import indexRoutes from "routes/index.jsx";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import userAccessReducer from '../src/views/reducer/userAccessReducer';

const store = createStore(userAccessReducer);


const hist = createBrowserHistory();
export function onEnter(nextState, transition, callback) {
  const { pathname } = nextState.location
  const isLoggedIn = sessionStorage.getItem('loggedin') === 'true'
  if ( !isLoggedIn) {
    transition('/login') //redirect to Home component
  }
  return callback() // go as it is.
}

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
<Provider store={store}>
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {

        return (prop.exact)? <Route exact  path={prop.path} component={prop.component} key={key} />
        :<Route  path={prop.path} component={prop.component} key={key}  />;
        //:<PrivateRoute  path={prop.path} component={prop.component} key={key}  />;
      })}
    </Switch>
  </Router>
  </Provider>
  ,
  document.getElementById("root")
);
