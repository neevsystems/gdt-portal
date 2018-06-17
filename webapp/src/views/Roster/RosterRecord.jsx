import React from "react";
import { Grid,Table, TableHead, TableRow,TableCell, TableBody ,
    TableFooter,TablePagination,IconButton,InputLabel,Checkbox,FormControlLabel} from "material-ui";
  import {  RegularCard, ItemGrid,CustomInput,Button} from "components";
  import {  Edit,Delete, Save} from "@material-ui/icons";
  
 class RosterRecord extends React.Component {
    constructor(props){
      super(props);
    }
    render() {
        return (<div>
            <Grid container>
      <ItemGrid xs={12} sm={12} md={12}>
      <RegularCard
          cardTitle="User"
          content={
            <div>
                <Grid container>
                <ItemGrid xs={12} sm={12} md={1}>
                  <CustomInput
                    labelText="Title"
                    id="title"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="First Name"
                    id="fname"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Middle Name"
                    id="mname"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Last Name"
                    id="lname"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </ItemGrid>
              </Grid>
             
              <Grid container>
                <ItemGrid xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Mobile Phone"
                    id="mobile-phone"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Home Phone"
                    id="home-phone"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="E-Mail Id"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </ItemGrid>
              </Grid>
              <Grid container>
                <ItemGrid xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Pass phrase"
                    id="pass-phrase"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={6}>
                <FormControlLabel style={{'margin-top': '34px'}}
                    control={
                        <Checkbox color="default" />
                    }
                    label="Is Admin" />
               
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={6}>
                <FormControlLabel style={{'margin-top': '34px'}}
                    control={
                        <Checkbox color="default" />
                    }
                    label="Is Active" />
               
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
export default RosterRecord;