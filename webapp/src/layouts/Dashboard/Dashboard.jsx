import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { withStyles } from "material-ui";

import { Header, Footer, Sidebar } from "components";

import dashboardRoutes from "routes/dashboard.jsx";

import appStyle from "assets/jss/material-dashboard-react/appStyle.jsx";

import logo from "assets/img/gif-gdt-logo-1280.gif";
import {login} from '../../services/rosterService.js';

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(sessionStorage.getItem('jwttoken') );
  console.log(sessionStorage.getItem('jwttoken')?'found':'notfound' );
  return (<Route {...rest} render={(props) => (
    sessionStorage.getItem('jwttoken') 
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />)
}
const switchRoutes = (
  <Switch> 
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key}  />;
    else {
      console.log(prop.path,prop.isPublic);
    if (prop.isPublic) return (<Route path={prop.path} component={prop.component} key={key} />);
      else (<PrivateRoute path={prop.path} component={prop.component} key={key} />);
    }
    })}
  </Switch>
);

class App extends React.Component {
  state = {
    mobileOpen: false
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  componentDidMount() {
    if(navigator.platform.indexOf('Win') > -1){
      // eslint-disable-next-line
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  componentDidUpdate() {
    this.refs.mainPanel.scrollTop = 0;
  }
  componentWillMount(){
   
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={"Neev Soft"}
          logo={logo}
           image={true}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer /> : null}
        </div>
      </div>
    );
  }
}
export default withStyles(appStyle)(App);
