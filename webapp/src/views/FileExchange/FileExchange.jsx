import React from "react";

import { withStyles, Grid, Card,
  CardContent,
  CardHeader,
  IconButton,Table, TableHead, TableRow,TableCell, TableBody } from "material-ui";
  import {
    AttachFile,
    CloudDownload,
    CloudUpload,
    Delete,
    InsertDriveFile
  } from "@material-ui/icons";

import {ItemGrid,RegularCard} from "components";
import dashboardStyle from "assets/jss/material-dashboard-react/dashboardStyle";
import {getAllDocuments,archivedFile} from "../../services/documentsService.js";

class FileExchange extends React.Component {
  constructor(props){
    super(props);
    this.state={
      files:[]
    }
    this.uploadFile=this.uploadFile.bind(this);
    this.getAllDocs=this.getAllDocs.bind(this);
    this.archFile=this.archFile.bind(this);
  }
  uploadFile(){
    this.props.history.push('/home/uploadfiles');
  }
  getAllDocs(){
    var state=this;
    getAllDocuments().then(function (response) {
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
          this.getAllDocs();
        }
        else
        alert("Archive File Failed. Contact Administrator");
      }).catch(function(error){
        console.log(error);
      })
    }
  }
  componentWillMount(){
    this.getAllDocs();
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
                <TableCell >Archived</TableCell>
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
                <TableCell >{n.createdAt}</TableCell>
                <TableCell >{n.isArchived?'Y':'N'}</TableCell>
                <TableCell>
                <IconButton onClick={()=>{window.open(n.filePath);}}>
                  <CloudDownload />
              </IconButton>
             {n.isArchived?null:(<IconButton onClick={()=>{stateObj.archFile(n.id);}} >
                  <Delete />
              </IconButton>)} 
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
export default withStyles(dashboardStyle)(FileExchange);
