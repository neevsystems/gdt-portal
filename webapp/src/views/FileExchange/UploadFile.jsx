import React from "react";
import {
  Grid, Table, TableHead, TableRow, TableCell, TableBody,
  TableFooter, TablePagination, IconButton, InputLabel, Checkbox, FormControlLabel
} from "material-ui";
import { RegularCard, ItemGrid, CustomInput, Button } from "components";
import { Edit, Delete, CloudUpload, AttachFile } from "@material-ui/icons";
import {saveDocument} from "../../services/documentsService.js";

class UploadFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0, filename: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.documentOnsubmit=this.documentOnsubmit.bind(this);
  }
  handleChange = (event, value) => {
    this.setState({ value });
    this.setState({ filename: this.myInput.value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  documentOnsubmit=()=>{
    var fromData=document.getElementsByName("frmDocumet");
    var state=this;
    saveDocument(fromData).then(function (response) {
      console.log(response); 
     
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (<div>
       <from name="frmDocumet" method="POST" onSubmit={(e)=>{e.preventDefault(); this.documentOnsubmit();}} >
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>

          <RegularCard
            cardTitle="Upload File"
            content={
              <div>
               
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <input type='text' name="fileName" style={{ 'width': '50%' }} value={this.state.filename} disabled={true} />
                    <IconButton onClick={(e) => this.myInput.click()}>
                      <AttachFile />
                      <input id="myInput"  name="files" type="file" ref={(ref) => this.myInput = ref} style={{ display: 'none' }} onChange={this.handleChange} />
                    </IconButton>
                  </ItemGrid>
                </Grid>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <CustomInput  name="fileDesc"
                      labelText="Description"
                      id="desc"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                </Grid>
               
              </div>
            }
            footer={<div><Button type="submit" style={{ 'background-color': '#333333' }}
             variant="contained" color="primary" >Save</Button>
              <Button style={{ 'background-color': '#333333' }} variant="contained" color="primary" >Cancel</Button></div>}

          />

        </ItemGrid>
      </Grid>
      </from>
    </div>);
  }
}
export default UploadFiles;