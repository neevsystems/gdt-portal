import React from "react";
import classNames from "classnames";
import { Manager, Target, Popper } from "react-popper";
import {
  withStyles,
  IconButton,
  MenuItem,
  FormControl,
  Select
} from "material-ui";
import { Person, Notifications, Dashboard, Search } from "@material-ui/icons";
import headerLinksStyle from "assets/jss/material-dashboard-react/headerLinksStyle";
import {getAllCustomers} from "../../services/customerService.js";

class CustomerDropDown extends React.Component {
  constructor(prop){
    super(prop);
    this.state={
      customers:[],
      selectedCustomerVal:0
    }

    this.getCustomers=this.getCustomers.bind(this);
  }
  getCustomers(){
    let stateObj=this;
    getAllCustomers().then(function(resp){
      stateObj.setState({customers:resp.data.customers});

    }).catch(function (error) {
      console.log(error);
    });
  }
  handleChange(event){
    this.setState({selectedCustomerVal:event.target.value});
  }

  componentWillMount(){
    this.getCustomers();
  }
 
  render() {
    let objState=this;
   
    return (

      <div>
        <FormControl>
          <Select
            onChange={objState.handleChange.bind(this)}
            value= {objState.state.selectedCustomerVal}
            displayEmpty
            name="Customers" >
            {objState.state.customers.map(function(item,key) {
            return <MenuItem key={key} value={item.id}>{item.customerName}</MenuItem>
            })}
          </Select>
          
        </FormControl>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(CustomerDropDown);
