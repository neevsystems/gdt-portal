import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import cx from "classnames";
import {
  withStyles,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from "material-ui";

import {
  Launch
} from "@material-ui/icons";
import {connect} from 'react-redux';
import sidebarStyle from "assets/jss/material-dashboard-react/sidebarStyle.jsx";
import '../Sidebar/Sidebar.css';
//import { Icon } from "material-ui";

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }
  const { classes, color, logo, image, logoText, routes,accessData } = props;
  var links = (
    <List className={classes.list}>
      {routes
        .filter((item)=>!item.hide)
        .map((prop, key) => {
        if (prop.redirect) return null;
        const listItemClasses = cx({
          [" " + classes[color]]: activeRoute(prop.path)
        });
        const whiteFontClasses = cx({
          [" " + classes.whiteFont]: activeRoute(prop.path)
        });
        if (prop.isLauncher) {
          return (
            <a href={prop.url}  target="_blank"  key={key}>
              <ListItem button className={classes.itemLink + listItemClasses}>
                <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                  <prop.icon />
                </ListItemIcon>
                <ListItemText
                  primary={prop.sidebarName}
                  className={classes.itemText + whiteFontClasses}
                  disableTypography={true}
                />
                <ListItemSecondaryAction>
                    <IconButton aria-label="link" className={classes.itemIcon + whiteFontClasses}>
                      <Launch />
                    </IconButton>
                  </ListItemSecondaryAction>
              </ListItem>
              </a>
          );
        } else {
         if(['NONADMIN', 'ADMIN', 'USER'].includes((accessData.testuser?accessData.testuser.role: '')) &&(prop.sidebarName=='Roster'))
          return null;
            else{
            return (
            
            (  <NavLink
              to={prop.path}
              className={classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                  <prop.icon />
                </ListItemIcon>
                <ListItemText
                  primary={prop.sidebarName}
                  className={classes.itemText + whiteFontClasses}
                  disableTypography={true}
                />
              </ListItem>

            </NavLink>)
          );
        }
        }
        
     

      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a href="/" className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={logo} alt={logoText} className={classes.img} />
        </div>
        
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            { /* <HeaderLinks /> */}
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
  return {
    accessData: state
  }
}

export default connect(mapStateToProps)(withStyles(sidebarStyle)(Sidebar));