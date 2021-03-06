import React from "react";
import classNames from "classnames";
import {connect} from 'react-redux';
import { Manager, Target, Popper } from "react-popper";
import {
  withStyles, IconButton,  MenuItem,  MenuList,  Grow,  Paper,  ClickAwayListener,  
  Hidden,FormControl,Select,Button,Chip,Avatar} from "material-ui";
import { Person, Dashboard, Search,ExitToApp } from "@material-ui/icons";
import headerLinksStyle from "assets/jss/material-dashboard-react/headerLinksStyle";
import {getAllCustomers} from "../../services/customerService.js";
import {logout} from "../../services/rosterService.js";
import defaultImage from '../../assets/img/profile.png';
//const logoutEmail='EdithJTowle@jourrapide.com';

class CustomerDropDown extends React.Component {
  constructor(prop){
    super(prop);
    this.state={
      customers:[],      
      selectedCustomerVal:0,
    }

    this.getCustomers=this.getCustomers.bind(this);
    //this.setSelectedCustomer=this.setSelectedCustomer.bind(this);
  }
  state = {
    open: false
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  getCustomers(){
    let stateObj=this;
    getAllCustomers().then(function(resp){
      stateObj.setState({customers:resp.data.customers});
      if(stateObj.state.customers.length>0){
        stateObj.setState({selectedCustomerVal:stateObj.state.customers[0].id});
        stateObj.setSelectedCustomer(stateObj.state.customers[0].id);
      }

    }).catch(function (error) {
      console.log(error);
    });
  }
  /* setSelectedCustomer(cid){
    this.props.dispatch({
      type:'SELECT_CUST',
     data: cid}); 
  
  }*/
  handleChange(event){
    this.setState({selectedCustomerVal:event.target.value});
   // this.setSelectedCustomer(event.target.value);
  }
  onLogoutClick(){
    var state=this;
    sessionStorage.clear();
    state.props.history.push('/logout');
   
  }
 
  componentWillMount(){
   // this.getCustomers();
  }
 
  render() {
    let objState=this;
    const { classes } = this.props;
    const { open } = this.state;
    return (

      <div>
        
       {/*  <FormControl style={{paddingRight: "20px", width:"150px"}}>
          <Select
            onChange={objState.handleChange.bind(this)}
            value= {objState.state.selectedCustomerVal}
            displayEmpty
            name="Customers" >
            {objState.state.customers.map(function(item,key) {
            return <MenuItem key={key} value={item.id}>{item.customerName}</MenuItem>
            })}
          </Select>
        </FormControl> */}
        
        <Manager >
          <Target>
           
          <Chip label={Object.keys(this.props.accessData).length>0?this.props.accessData.testuser.userName:''} avatar={<Avatar src={defaultImage} />}
         onClick={this.handleClick} aria-owns={open ? "menu-list" : null}
         aria-haspopup="true" >
          
            {/* <Button variant="fab" mini
                           
              aria-owns={open ? "menu-list" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={classes.button}
            > 
              <Person className={classes.links} />*/}
             
              <Hidden mdUp>
                <p onClick={this.handleClick} className={classes.linkText}>
                  Notification
                </p>
              </Hidden>
              </Chip>
            {/* </Button> */}
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={
              classNames({ [classes.popperClose]: !open }) +
              " " +
              classes.pooperResponsive
            }
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow
                in={open}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <MenuList role="menu">                   
                    <MenuItem
                      onClick={this.onLogoutClick.bind(this)}
                      className={classes.dropdownItem} >
                      <ExitToApp />  Logout
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager> 
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
      accessData: state
  }
}

export default connect(mapStateToProps)( withStyles(headerLinksStyle)(CustomerDropDown));
