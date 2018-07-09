import React from "react";

import { withStyles, Grid, Card,
  CardContent,
  CardHeader,
  IconButton,Table, TableHead, TableRow,TableCell, TableBody } from "material-ui";
  import {
    CloudDownload,
    CloudUpload,
  } from "@material-ui/icons";

import {ItemGrid,RegularCard} from "components";
import dashboardStyle from "assets/jss/material-dashboard-react/dashboardStyle";
import {getAllDocuments,archivedFile,getDocument} from "../../services/documentsService.js";
import { connect } from 'react-redux';
class FileExchange extends React.Component {
  constructor(props){
    super(props);
    this.state={
      files:[]
    }
    this.uploadFile=this.uploadFile.bind(this);
    this.getAllDocs=this.getAllDocs.bind(this);
    this.archFile=this.archFile.bind(this);
    this.downloadFile=this.downloadFile.bind(this);
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
          this.getAllDocs(this.props.selectedCustomer,'GDT');
        }
        else
        alert("Archive File Failed. Contact Administrator");
      }).catch(function(error){
        console.log(error);
      })
    }
  }
  componentDidMount(){
    let cid=(this.props.selectedCustomer)==''?0:(this.props.selectedCustomer||0);
    this.getAllDocs(cid,'GDT');
  }
  
  componentDidUpdate( prevProps, prevState){
    if(prevProps.selectedCustomer!=this.props.selectedCustomer)
    this.getAllDocs(this.props.selectedCustomer,'GDT');
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
      selectedCustomer: state
  }
}
export default connect(mapStateToProps)(withStyles(dashboardStyle)(FileExchange));

