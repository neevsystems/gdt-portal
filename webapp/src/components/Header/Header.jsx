import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu } from "@material-ui/icons";
import {
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Hidden,
  Button
} from "material-ui";
import cx from "classnames";
import {HeaderLinks,CustomerDropDown } from "components";

import headerStyle from "assets/jss/material-dashboard-react/headerStyle.jsx";

function Header({ ...props }) {
  function makeBrand() {
    var name;
    props.routes.map((prop, key) => {
      if (matchUrl(prop.path , props.location.pathname)) {
      
        name = prop.navbarName;
      }
      return null;
    });
    return name;
  }
  function matchUrl(propPath,locPath){
    let slashCount=0;
    let propArray= ((propPath.split(':')[0]).substr(1,(propPath.split(':')[0]).length-2)).split('/');
    let locArray=(locPath.substr(1,locPath.length-2).split('/'));
    let matchCount=0;
    propArray.forEach(function(item,key){
      if(item==locArray[key]){
        matchCount=matchCount+1;
      }
    });

    if(propArray.length==matchCount)
    return true;
    else
    return false;
  }
  const { classes, color } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });
  
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Button href="/#" className={classes.title}>
            {makeBrand()?makeBrand():'<p>To be added</p>'}
          </Button>
        </div>
        <Hidden smDown implementation="css">
         <CustomerDropDown />  
        </Hidden>
        <Hidden mdUp>
          <IconButton
            className={classes.appResponsive}
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle)(Header);
