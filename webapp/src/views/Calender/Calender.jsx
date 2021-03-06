import React from "react";
import { Grid,Card,CardContent } from "material-ui";
import {
    ItemGrid
  } from "components";
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import getAllEvents from '../../services/calenderService';
class Calender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        events:[],		
        }

        this.getCalAllEvents=this.getCalAllEvents.bind(this);
      }
      getCalAllEvents(){
        var state=this;
        getAllEvents().then(function (response) {
          console.log(response);        
          
          state.setState({events:response.data.events});
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      componentWillMount(){
        this.getCalAllEvents();
      }
      
     
      render() {
        return (
            <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
        <Card>
        <CardContent>
            <FullCalendar
                 id = "cal"
             header = {{
                left: 'prev,next today myCustomButton',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            }}
             defaultDate={new Date()}
            navLinks= {true} // can click day/week names to navigate views
            contentHeight= {'auto'}
            eventLimit= {true} // allow "more" link when too many events
            events = {this.state.events}	
        />
        </CardContent>
          </Card>
          </ItemGrid>
          </Grid>
        );
      }
    }
  
  export default Calender;