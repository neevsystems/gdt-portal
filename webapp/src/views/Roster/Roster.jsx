import React from "react";
import { Grid,Table, TableHead, TableRow,TableCell, TableBody ,
  TableFooter,TablePagination,IconButton } from "material-ui";
import {  RegularCard, ItemGrid} from "components";
import {  Edit,Delete,PersonAdd} from "@material-ui/icons";
import {getAllUsers} from '../../services/rosterService';


  class Roster extends React.Component {
    constructor(props){
      super(props);
      this.state={
        userList:[],
        table:{
          page: 0,
          rowsPerPage: 10,
        }
      }
      this.getUserList=this.getUserList.bind(this);
      this.editUserClick=this.editUserClick.bind(this);
    }
    getUserList(){
      var state=this;
      getAllUsers().then(function (response) {
        state.setState({userList:response.data.users});
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    componentWillMount(){
      this.getUserList();
    }
    editUserClick(id){
    let routeUrl='/home/rosterrecord/'+id;
    this.props.history.push(routeUrl);
    }

    render() {
      let stateObj=this;
      return (

    <Grid container>
      <ItemGrid xs={12} sm={12} md={12}>
        <RegularCard
          cardTitle="Users List"
          headerCardAction={
            <div>
              <IconButton onClick={this.uploadFile }>
              <PersonAdd style={{color:"#fff"}} />

              </IconButton>

            </div>
          }
          content={
            <Table>
             <TableHead>
             <TableRow>
                <TableCell>Name</TableCell>
                <TableCell >Email</TableCell>
                <TableCell >User Type</TableCell>
                <TableCell >User Status</TableCell>
                <TableCell ></TableCell>
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
                <TableCell >Customer_Standard</TableCell>
                <TableCell >Active</TableCell>
                <TableCell>
              <IconButton onClick={()=>{stateObj.editUserClick(n.id)}}  > <Edit /></IconButton>
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
