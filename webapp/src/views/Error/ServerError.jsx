import React from "react";
// react plugin for creating charts
import { withStyles } from "material-ui";

import dashboardStyle from "assets/jss/material-dashboard-react/dashboardStyle";

class ServerError extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    return (
      <div>
       SERVER ERROR
      </div>
    );
  }
}
export default withStyles(dashboardStyle)(ServerError);
