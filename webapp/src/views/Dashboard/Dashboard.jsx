import React from "react";
// react plugin for creating charts
import {Link} from 'react-router-dom';
import { withStyles, Grid, Card,
  CardContent,
  CardHeader,
  IconButton,AppBar,Tabs,Tab,Badge, ListItem,List} from "material-ui";
import {ItemGrid,RegularCard} from "components";
import dashboardStyle from "assets/jss/material-dashboard-react/dashboardStyle";

import {getOpenTickets,getResolvedTickets} from "../../services/dashboardService";

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

      }).catch(function(error){
        console.log(error)
      })

  }
  getResolveTickets(){
    let stateObj=this
    getResolvedTickets(stateObj.state.email).then(
      function(resp){
        stateObj.setState({resolvTickets:resp.data.resTickets.result});
        stateObj.setState({resolveTicketCount:resp.data.resTickets.result.length});

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
    return (
      <div>
      
      <Grid container>
      <ItemGrid xs={12} sm={12} md={6}>
      <RegularCard
          cardTitle="Incidents"         
          content={ 
            <div>
              <Grid container>
              <AppBar position="static" >
              <Tabs value={stateObj.state.tabVal} onChange={this.handleChange}>
              <Tab
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
              <Tab
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
                  </Grid>

            </div>
          }
          />
        </ItemGrid>

         <ItemGrid xs={12} sm={12} md={6}>
      <RegularCard
          cardTitle="Submit a Request"
          
          content={<div>
             <List>
               <ListItem >
               <a href='https://gdtdtest.service-now.com/com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=5c2aebefdb8bd7006dcf38fbfc96196d' target='_blank'>DNS Change</a></ListItem>
               <ListItem><a href='https://gdtdtest.service-now.com/com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=ffa750c3db87d700097b3a0f9d961959'  target='_blank'>Firewall Rule Change</a></ListItem>
               <ListItem><a href='https://gdtdtest.service-now.com/com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=c2f0a073db4fd7006dcf38fbfc9619eb'  target='_blank'>Temp Access Request</a></ListItem>
               <ListItem><a href='https://gdtdtest.service-now.com/com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=8697f3e7dbcbd7006dcf38fbfc9619a6'  target='_blank'>Make Other Requests</a></ListItem>
             </List>
          </div>}
          />

      </ItemGrid>
        </Grid>
        
         
        </div>
    
    );
  }
}
export default withStyles(dashboardStyle)(Dashboard);
