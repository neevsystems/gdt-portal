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

class FileExchange extends React.Component {
  constructor(props){
    super(props);
    this.state={
      files:[{filename:'Installer.doc', description:'Installer',uploadedon:'01-01-2018'}
    ,{filename:'Network.png', description:'Network',uploadedon:'01-02-2018'},
    {filename:'Arch.png', description:'Architecture',uploadedon:'23-03-2018'}
    ,{filename:'Update.pdf', description:'Update instructions',uploadedon:'23-04-2018'},
    {filename:'Checklist.xls', description:'Policy check list',uploadedon:'18-05-2018'}
    ],
   
    
    }
    this.uploadFile=this.uploadFile.bind(this);
  }
  uploadFile(){
    this.props.history.push('/home/uploadfiles');
  }
  
  
  render() {
    const { classes } = this.props;
   
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
                <TableCell ></TableCell>
          </TableRow>
             </TableHead>
             <TableBody>
             {this.state.files.map(function(n,key) {
            return (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                 {n.filename}
                </TableCell>
                <TableCell >{n.description}</TableCell>
                <TableCell >{n.uploadedon}</TableCell>
                <TableCell>
                <IconButton>
                  <CloudDownload />
              </IconButton>
              <IconButton>
                  <Delete />
              </IconButton>
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
