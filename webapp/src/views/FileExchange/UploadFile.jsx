import React from "react";
import {
  Grid, Table, TableHead, TableRow, TableCell, TableBody,TextField,Input,InputAdornment,
  TableFooter, TablePagination, IconButton, InputLabel, Checkbox, FormControlLabel
} from "material-ui";
import { RegularCard, ItemGrid, CustomInput, Button } from "components";
import { Edit, Delete, CloudUpload, AttachFile } from "@material-ui/icons";
import {saveDocument} from "../../services/documentsService.js";

class UploadFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0, filename: '',filedesc:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.documentOnsubmit=this.documentOnsubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  handleChange = (event, value) => {
    this.setState({ value });
    this.setState({ filename: this.myInput.value });
  };
  handleTextChange=(event)=>{
    this.setState({filedesc: event.target.value});
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  documentOnsubmit=(event)=>{
    var state=this;
    event.preventDefault();
    if(this.myInput.files.length>0){
    const formData = new FormData();    
    formData.append('fileName',this.myInput.files[0].name);
    formData.append('fileFor','customer1');
    formData.append('fileFrom','GDT');
    formData.append('fileDesc',state.state.filedesc);
    formData.append('files',this.myInput.files[0]);
    saveDocument(formData).then(function (response) {
     alert("File uploaded sucessfully!.");
     state.props.history.push('/home/fileexchange');
    })
    .catch(function (error) {
      console.log(error);
      alert("Somthing went wrong. try again");
      state.props.history.push('/home/fileexchange');
    });
  }
    return false;
  }
  render() {
    var state=this;
    return (<div>
       <form id="frmDocumet" method="POST" name="frmDocumet" onSubmit={this.documentOnsubmit}  >
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>

          <RegularCard
            cardTitle="Upload File"
            content={
              <div>
               
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={8}>
                  <Grid container spacing={2} alignItems="flex-end">
                  <Grid item xs={10} sm={10} md={11}>
                  <Input fullWidth
                  id="fileName" name="fileName"
                 value= {this.state.filename}
                      disabled
                      placeholder="Select File"
                    />
                    </Grid>
                      <Grid item>
                      <IconButton onClick={(e) => this.myInput.click()}>
                      <AttachFile />
                      <input id="files"  name="files" type="file" ref={(ref) => this.myInput = ref} style={{ display: 'none' }} onChange={this.handleChange} />
                    </IconButton>
                        </Grid>
                    </Grid>
                    </ItemGrid>
                </Grid>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={8}>
                  <TextField fullWidth
                      id="fileDesc"
                      label="Description"
                      margin="normal"
                      onChange={(e)=>{state.handleTextChange(e);}}
                      name="fileDesc"
                    />
                  </ItemGrid>
                </Grid>
               
              </div>
            }
            footer={<div><Button type="submit" style={{ 'background-color': '#333333' }} 
             variant="contained" color="primary" >Save</Button>
              <Button style={{ 'background-color': '#333333' }} variant="contained" color="primary" 
              onClick={()=>{state.props.history.push('/home/fileexchange');}}
              >Cancel</Button></div>}

          />

        </ItemGrid>
      </Grid>
      </form>
    </div>);
  }
}
export default UploadFiles;