import React from "react";
import { Grid } from "material-ui";
import {
    ItemGrid
  } from "components";
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
class Calender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        events:[
                    {
                        title: 'All Day Event',
                        start: '2018-05-01'
                    },
                    {
                        title: 'Long Event',
                        start: '2018-05-07',
                        end: '2018-05-10'
                    },
                    {
                        id: 999,
                        title: 'Repeating Event',
                        start: '2018-06-09T16:00:00'
                    },
                    {
                        id: 999,
                        title: 'Repeating Event',
                        start: '2018-06-16T16:00:00'
                    },
                    {
                        title: 'Conference',
                        start: '2018-06-11',
                        end: '2018-06-13'
                    },
                    {
                        title: 'Meeting',
                        start: '2018-06-12T10:30:00',
                        end: '2018-06-12T12:30:00'
                    },
                    {
                        title: 'Birthday Party',
                        start: '2018-06-13T07:00:00'
                    },
                    {
                        title: 'Click for Google',
                        url: 'http://google.com/',
                        start: '2018-06-28'
                    }
                ],		
        }
      }
     
      render() {
        return (
            <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
         
            <FullCalendar
                 id = "cal"
             header = {{
                left: 'prev,next today myCustomButton',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            }}
             defaultDate={new Date()}
            navLinks= {true} // can click day/week names to navigate views
            editable= {true}
            eventLimit= {true} // allow "more" link when too many events
            events = {this.state.events}	
        />
          
          </ItemGrid>
          </Grid>
        );
      }
    }
  
  export default Calender;