import React from "react";
import { Grid,Table, TableHead, TableRow,TableCell, TableBody ,
    TableFooter,TablePagination,IconButton,InputLabel,Checkbox,FormControlLabel} from "material-ui";
  import {  RegularCard, ItemGrid,CustomInput,Button} from "components";
  import {  Edit,Delete, CloudUpload,AttachFile} from "@material-ui/icons";
  
 class UploadFiles extends React.Component {
    constructor(props){
      super(props);
      this.state={value:0,filename:''
    };
    this.handleChange=this.handleChange.bind(this);
    }
     handleChange = (event, value) => {
        this.setState({ value });
       this.setState({filename:this.myInput.value});
      };
    
      handleChangeIndex = index => {
        this.setState({ value: index });
      }; 
    render() {
        return (<div>
            <Grid container>
      <ItemGrid xs={12} sm={12} md={12}>
        
         <RegularCard
          cardTitle="Upload File"
          content={
            <div>
                <Grid container>                
                <ItemGrid xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </ItemGrid>
              </Grid>
             
              <Grid container>
                <ItemGrid xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Description"
                    id="desc"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </ItemGrid>
              </Grid>
              <Grid container>
                <ItemGrid xs={12} sm={12} md={6}>
                <input type='text' style={{'width':'50%'}} value={this.state.filename} disabled={true} />
                <IconButton  onClick={(e) => this.myInput.click() }>
              <AttachFile  />
              <input id="myInput" type="file" ref={(ref) => this.myInput = ref} style={{ display: 'none' }} onChange={this.handleChange} />            
              </IconButton>
             
                </ItemGrid>
               
                   
              </Grid>
            </div>
          }
          footer={<div><Button style={{'background-color':'#333333'}} variant="contained" color="primary" >Save</Button>
          <Button style={{'background-color':'#333333'}} variant="contained" color="primary" >Cancel</Button></div>}
          
          />
           
            </ItemGrid>
      </Grid>

        </div>);
    }
}
export default UploadFiles;