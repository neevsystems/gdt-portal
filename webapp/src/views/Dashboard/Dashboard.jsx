import React from "react";
// react plugin for creating charts

import PropTypes from "prop-types";
import {Link} from 'react-router-dom';

import { withStyles, Grid, Card,
  CardContent,
  CardHeader,
  IconButton,AppBar,Tabs,Tab,Badge, ListItem,List,Icon} from "material-ui";
import {ItemGrid,RegularCard} from "components";
import dashboardStyle from "assets/jss/material-dashboard-react/dashboardStyle";
import {dashboardLinks} from '../../util/constants';
import {getOpenTickets,getResolvedTickets} from "../../services/dashboardService";
import Pagination from "../Dashboard/Pagination";
import Typography from '@material-ui/core/Typography';

class TabContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {this.props.children}
      </Typography>
    );
  }
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};
class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state={
      email:'EdithJTowle@jourrapide.com',
      tabVal:0,
      openTickets:[],
      openTicketCount:0,
      resolvTickets:[],
      resolveTicketCount:0,
    }

    this.getOpenTickets=this.getOpenTickets.bind(this);
    this.getResolveTickets=this.getResolveTickets.bind(this);
  }


  getOpenTickets(){
    let stateObj=this
    getOpenTickets(stateObj.state.email).then(
      function(resp){
        stateObj.setState({openTickets:resp.data.openTickets.result});
        stateObj.setState({openTicketCount:resp.data.openTickets.result.length});
        console.log("RESULT 1: ----"+stateObj.state.openTicketCount);
        console.log("RESULT er: -----"+stateObj.state.openTickets);

      }).catch(function(error){
        console.log(error)
      })

  }
  getResolveTickets(){
    let stateObj=this
    getResolvedTickets(stateObj.state.email).then(
      function(resp){
        stateObj.setState({resolvTickets:resp.data.resTickets.result});
        console.log("RESULT 2: "+stateObj.state.resolvTickets);
        stateObj.setState({resolveTicketCount:resp.data.resTickets.result.length});
        console.log("RESULT 3: "+stateObj.state.resolveTicketCount);
        
      }).catch(function(error){
        console.log(error)
      })

  }
  componentDidMount(){
    this.getOpenTickets();
    this.getResolveTickets();
  }
  handleChange = (event, value) => {
    this.setState({ tabVal: value });
  };
 
  render() {
let stateObj=this;
const divStyle = {
  top: '-6px !important',
  right: '-28px !important'
};
//const { value } = this.state;
const { tabVal } = this.state
    return (
      <div>
      
      <Grid container>
      <ItemGrid xs={12} sm={12} md={6}>
      <RegularCard
          cardTitle="Incidents"         
          content={ 
            <div>
              <Grid container>
              
              <a href={dashboardLinks.create_instance}  target='_blank'><Icon>+</Icon> Create New Incident</a>
              
              <AppBar position="static" >
              {/* <Tabs value={stateObj.state.tabVal} onChange={this.handleChange}> */}
              <Tabs value={tabVal} onChange={this.handleChange}>
              <Tab value="open"
                label={
                  <Badge  color="secondary" badgeContent={stateObj.state.openTicketCount}>
                   {'My Open      '}      
                  </Badge>
                }
              >
               <Card >
                  <CardContent>  <p >
            <table>
              
            </table>
          </p></CardContent></Card>
              </Tab>
              <Tab value="resolved"
                label={
                  <Badge  color="secondary" badgeContent={stateObj.state.resolveTicketCount}>
                   {' My Resolved    '}
                  </Badge>
                }
              >
               <Card >
                  <CardContent> <p >
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </p></CardContent></Card>
              </Tab>
              
              
             
        </Tabs>
    
      </AppBar>  
      {/* <Pagination /> */}
      {console.log("result dashboard resolvTickets"+this.state.resolvTickets)}
        {tabVal === 'open' && <TabContainer><Pagination TabData={this.state.openTickets}/> </TabContainer>}
    {tabVal === 'resolved' && <TabContainer><Pagination TabData={this.state.resolvTickets}/> </TabContainer>}

                  </Grid> 

            </div>
          }
          />
        </ItemGrid>

         <ItemGrid xs={12} sm={12} md={6}>
      <RegularCard

          cardTitle="Submit a Request"          
          content={              
                <List>
                  <ListItem><a href={dashboardLinks.dns_change}  target='_blank'>DNS Change</a></ListItem>
                  <ListItem><a href={dashboardLinks.firewall_role_change}  target='_blank'>Firewall Rule Change</a></ListItem>
                  <ListItem><a href={dashboardLinks.temp_access_req}  target='_blank'>Temp Access Request</a></ListItem>
                  <ListItem><a href={dashboardLinks.make_other_req}  target='_blank'>Make Other Requests</a></ListItem>
                </List>              
          } />


      </ItemGrid>
        </Grid>
        
         
        </div>
    
    );
  }
}
export default withStyles(dashboardStyle)(Dashboard);
