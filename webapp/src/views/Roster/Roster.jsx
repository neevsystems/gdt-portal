import React from "react";
import { Grid,Table, TableHead, TableRow,TableCell, TableBody  } from "material-ui";
import {
  RegularCard,
 ItemGrid
} from "components";
import getAllUsers from '../../services/rosterService';


  class Roster extends React.Component {
    constructor(props){
      super(props);
      this.state={
        userList:[]
      }

      this.getUserList=this.getUserList.bind(this);
    }
    getUserList(){
      var state=this;
      getAllUsers().then(function (response) {
        console.log(response);
        
        
        state.setState({userList:response.data.users});
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    componentWillMount(){
      this.getUserList();
    }
  
    render() {
      return (
    <Grid container>
      <ItemGrid xs={12} sm={12} md={12}>
        <RegularCard
          cardTitle="User"
          
          content={
            <Table>
             <TableHead>
             <TableRow>
                <TableCell>Name</TableCell>
                <TableCell >Email</TableCell>
                <TableCell >Phone</TableCell>
                <TableCell >Action</TableCell>
          </TableRow>
             </TableHead>
             <TableBody>
             {this.state.userList.map(function(n,key) {
            return (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                 {n.first+' '+n.last}
                </TableCell>
                <TableCell >{n.email}</TableCell>
                <TableCell >{n.phone}</TableCell>
                <TableCell>
               <button>edit</button>
                </TableCell>
              </TableRow>
            );
          })}

             </TableBody>
          </Table>
         }
        />
      </ItemGrid>
         
    </Grid>
  );
}
}

export default Roster;
