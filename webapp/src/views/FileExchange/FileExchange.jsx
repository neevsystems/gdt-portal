import React from "react";
import {connect} from 'react-redux';
import { withStyles, Grid, Card,
  CardContent,
  CardHeader,
  IconButton,Table, TableHead, TableRow,TableCell, TableBody,Select,MenuItem } from "material-ui";
  import {
    CloudDownload,
    CloudUpload,
  } from "@material-ui/icons";

import {ItemGrid,RegularCard} from "components";
import dashboardStyle from "assets/jss/material-dashboard-react/dashboardStyle";
import {getAllDocuments,archivedFile,getDocument} from "../../services/documentsService.js";
import {getAllCustomers} from "../../services/customerService.js";
//import { connect } from 'react-redux';
const loginUsrCompany='GDT';
class FileExchange extends React.Component {
  constructor(props){
    super(props);
    this.state={
      files:[],
      selectedCustomer:0,
      customers:[]
    }
    this.uploadFile=this.uploadFile.bind(this);
    this.getAllDocs=this.getAllDocs.bind(this);
    this.archFile=this.archFile.bind(this);
    this.downloadFile=this.downloadFile.bind(this);
    this.getCustomers=this.getCustomers.bind(this);
  }
  uploadFile(){
    this.props.history.push('/home/uploadfiles');
  }
  downloadFile(fid,filename){
    getDocument(fid).then(
      function(resp){
        //window.open(resp.data);
        var element = document.createElement("a");
        var file = new Blob([resp.data], {type: resp.headers['content-type']});
        element.href = URL.createObjectURL(file);
        element.download = filename;
        element.click();
      }
    ).catch(function(error){
      console.log(error)
    })

  }
  getAllDocs(fFor,fFrom){
    var state=this;
    getAllDocuments(fFor,fFrom).then(function (response) {
      console.log(response); 
      state.setState({files:response.data.documents});
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  archFile(fid){
    var r = window.confirm("Do you want to archive the file ?");
    if(r==true){
      archivedFile(fid).then((resp)=>{
        if(resp.data.success)
        {
          alert("File Archived Successfully.");
          this.getAllDocs(this.state.selectedCustomer,'GDT');
        }
        else
        alert("Archive File Failed. Contact Administrator");
      }).catch(function(error){
        console.log(error);
      })
    }
  }
  componentWillMount(){
    this.getCustomers();
    let cid=(this.state.selectedCustomer)==''?0:(this.state.selectedCustomer||0);
    let userCompany=(this.props.accessData.testuser)?this.props.accessData.testuser.customerId:0
    this.getAllDocs(cid,userCompany);
  }
  
  
  onCustomerChange(event){
    this.setState({selectedCustomer:event.target.value}); 
    let cid=(event.target.value)==''?0:(event.target.value||0); 
    let userCompany=(this.props.accessData.testuser)?this.props.accessData.testuser.customerId:0
    this.getAllDocs(cid,userCompany); 
  }

  getCustomers(){
    let stateObj=this;
    let customerList=[];

    if(stateObj.props.accessData.accesscompanys!=undefined){
      if(Array.isArray(stateObj.props.accessData.accesscompanys)){
        customerList=stateObj.props.accessData.accesscompanys;
      }else{
        customerList= [stateObj.props.accessData.accesscompanys];
      }
    }
    stateObj.setState({customers:customerList});
    // getAllCustomers().then(function(resp){
    //   stateObj.setState({customers:resp.data.customers});
    //   if(stateObj.state.customers.length>0){
    //     //stateObj.setState({selectedCustomer:stateObj.state.customers[0].id});
    //   }

    // }).catch(function (error) {
    //   console.log(error);
    // });


  }
  
  render() {
    const { classes } = this.props;
   var stateObj=this;
    return (
      <div>
        <Grid container>
      <ItemGrid xs={12} sm={12} md={12}>
      <RegularCard
          cardTitle="File List"
          headerCardAction={
              <div>
                 <Select style={{'color': 'white',   'min-width': '150px'}}
                  onChange={stateObj.onCustomerChange.bind(this)}
                  value= {stateObj.state.selectedCustomer}
                  displayEmpty
                  name="Customers" >
                  {stateObj.state.customers.map(function(item,key) {
                  return <MenuItem key={key} value={item.id}>{item.customerName}</MenuItem>
                  })}
               </Select> 

                <IconButton onClick={this.uploadFile }>
                <CloudUpload style={{color:"#fff"}} />
                </IconButton> 

                           
              </div>
            }
          content={      
           <Table>
             <TableHead>
             <TableRow>
                <TableCell>Name</TableCell>
                <TableCell >Description</TableCell>
                <TableCell >Uploaded On</TableCell>
                <TableCell >Updated By</TableCell>
                {/* <TableCell >Archived</TableCell> */}
                <TableCell ></TableCell>
          </TableRow>
             </TableHead>
             <TableBody>
             {this.state.files.map(function(n,key) {
            return (
              <TableRow key={key}>
              
                <TableCell component="th" scope="row">
                 {n.fileName}
                </TableCell>
                <TableCell >{n.fileDesc}</TableCell>
                <TableCell >{new Date(n.createdAt).getFullYear()+'-'+(new Date(n.createdAt).getMonth()+1)+"-"+new Date(n.createdAt).getDate()}</TableCell>
                <TableCell >{n.fileFrom}</TableCell>
                {/* <TableCell >{n.isArchived?'Y':'N'}</TableCell> */}
                <TableCell>
                <IconButton onClick={()=>{stateObj.downloadFile(n.id,n.fileName)}}>
                  <CloudDownload />
              </IconButton>
             {/* {n.isArchived?null:(<IconButton onClick={()=>{stateObj.archFile(n.id);}} >
                  <Delete />
              </IconButton>)}  */}
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
      
       
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
      accessData: state
  }
}

export default connect(mapStateToProps)(withStyles(dashboardStyle)(FileExchange));

