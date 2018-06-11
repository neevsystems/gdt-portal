import React from "react";
import {  withStyles } from "material-ui";

import footerStyle from "assets/jss/material-dashboard-react/footerStyle";

function Footer({ ...props }) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          
        </div>
        <p className={classes.right}>
          <span>
          Copyright &copy; {1900 + new Date().getYear()}{" "} General Datatech, LP. All rights reserved.
          </span>
        </p>
      </div>
    </footer>
  );
}
export default withStyles(footerStyle)(Footer);
