import React from "react";

import { withStyles, Grid, Card,
  CardContent,
  CardHeader,
  IconButton,Table, TableHead, TableRow,TableCell, TableBody } from "material-ui";
  import {
    AttachFile,
    CloudDownload,
    CloudUpload,
    InsertDriveFile
  } from "@material-ui/icons";

import {ItemGrid,RegularCard} from "components";
import dashboardStyle from "assets/jss/material-dashboard-react/dashboardStyle";

class FileExchange extends React.Component {
  constructor(props){
    super(props);
    this.state={
      files:[{filename:'test.png', size:'100kb',createdon:'01-01-2018'}
    ,{filename:'test2.png', size:'100kb',createdon:'01-01-2018'},
    {filename:'test3.png', size:'100kb',createdon:'01-01-2018'}
    ,{filename:'test4.png', size:'100kb',createdon:'01-01-2018'},
    {filename:'test5.png', size:'100kb',createdon:'01-01-2018'}
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
                <TableCell>File</TableCell>
                <TableCell >Size</TableCell>
                <TableCell >Created On</TableCell>
                <TableCell ></TableCell>
          </TableRow>
             </TableHead>
             <TableBody>
             {this.state.files.map(function(n,key) {
            return (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                <InsertDriveFile /> {n.filename}
                </TableCell>
                <TableCell >{n.size}</TableCell>
                <TableCell >{n.createdon}</TableCell>
                <TableCell>
                <IconButton>
                  <CloudDownload />
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
