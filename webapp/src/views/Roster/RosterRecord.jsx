import React from "react";
import { Grid,TextField ,Checkbox,FormControlLabel,FormControl,MenuItem} from "material-ui";
  import {  RegularCard, ItemGrid,Button} from "components";
  import {  Edit,Delete, Save} from "@material-ui/icons";
  import {getUser,createUser,updateUser} from '../../services/rosterService';
  const title = [
    { value: 'Mr.', label: 'Mr.'},
    { value: 'Mrs.', label: 'Mrs.'},
    { value: 'Miss.', label: 'Miss.'}
  ];
 class RosterRecord extends React.Component {
    constructor(props){
      super(props);
      this.state={
        user:{
          id:0,
          title:'',
          firstName:'',
          middleName:'',
          lastName:'',
          mobile:'',
          phone:'',
          email:'',
          passphrase:'',
          isAdmin:false,
          isActive:true

        }
      }
      this.getUserById=this.getUserById.bind(this);
      this.saveUser=this.saveUser.bind(this);
    }
    
    componentWillMount(){
      let id=parseInt(this.props.match.params.uid ||0);
      if(id>0)
      this.getUserById(id);
    }
    getUserById(id){
      let state=this;      
      getUser(id).then((resp)=>{
        state.setState({user:resp.data.user});
      }).catch(function(error){
        console.log(error);
      });
    }
    saveUser(){
      let state=this;
      if(state.state.user.id<=0){        
      createUser(state.state.user).then((resp)=>{
        if(resp.data.success){
          alert(resp.data.message);
          state.props.history.push('/home/roster');
        }
        else{
          alert(resp.data.error);
          state.props.history.push('/home/roster');
        }

      }).catch((error)=>{
        console.log(error);
        state.props.history.push('/home/roster');
      });

      }
      else{
        updateUser(state.state.user).then((resp)=>{
          if(resp.data.success){
            alert(resp.data.message);
            state.props.history.push('/home/roster');
          }
          else{
            alert(resp.data.error);
            state.props.history.push('/home/roster');
          }
  
        }).catch((error)=>{
          console.log(error);
          state.props.history.push('/home/roster');
        });
      }
    }
    handleChange  (e)  {    
      var user = {...this.state.user}
      user[e.target.id] = e.target.value;
      this.setState({user});
    };
    checkboxChangd  (e)  {    
      var user = {...this.state.user}
      switch(e.target.id){
        case 'isAdmin':
          if(e.target.checked){
            user[e.target.id] = e.target.checked;
            user['isEmployee'] = false;
          }else{
            user[e.target.id] = e.target.checked;
            user['isEmployee'] = true;
          }
        break;
        case 'isActive' :
          user[e.target.id] = e.target.checked;
        break;
      }
      this.setState({user});
    };
    onCancelBtnClicks(){
      this.props.history.push('/home/roster');
    }
    render() {
      let stateObj=this;
        return (<div>
            <Grid container>
      <ItemGrid xs={12} sm={12} md={12}>
      <RegularCard
          cardTitle="User"
          content={
            <div>
                <Grid container>
                <ItemGrid xs={12} sm={12} md={2}>
                <TextField
                  select
                  id="title"
                  label="Title"
                  margin="normal"
                  onChange={this.handleChange.bind(this)}
                  value= {stateObj.state.user.title}
                  fullWidth
                >
                  {title.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                
                </TextField>
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={4}>
                <TextField
                  id="firstName"
                  label="First Name"
                  margin="normal"
                  onChange={this.handleChange.bind(this)}
                   value={stateObj.state.user.firstName}
                  fullWidth
                  required
                />            
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={3}>
                <TextField
                  id="middleName"
                  label="Middle Name"
                  margin="normal"
                  onChange={this.handleChange.bind(this)}
                  value= {stateObj.state.user.middleName}
                  fullWidth
                  
                />  
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={3}>
                <TextField
                  id="lastName"
                  label="Last Name"
                  margin="normal"
                  onChange={this.handleChange.bind(this)}
                  value= {stateObj.state.user.lastName}
                  fullWidth
                  required
                />                         
                </ItemGrid>
              </Grid>
              <Grid container>
                <ItemGrid xs={12} sm={12} md={4}>
                <TextField
                  id="mobile"
                  label="Mobile Phone"
                  margin="normal"
                  onChange={this.handleChange.bind(this)}
                  value= {stateObj.state.user.mobile}
                  fullWidth
                  required
                />     
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={4}>
                <TextField
                  id="phone"
                  label="Home Phone"
                  margin="normal"
                  onChange={this.handleChange.bind(this)}
                  value= {stateObj.state.user.phone}
                  fullWidth
                /> 
                                            
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={4}>
                <TextField
                  id="email"
                  label="E-Mail Id"
                  margin="normal"
                  onChange={this.handleChange.bind(this)}
                  value= {stateObj.state.user.email}
                  fullWidth
                  required
                />
                
                </ItemGrid>
              </Grid>
              <Grid container>                
                <ItemGrid xs={12} sm={12} md={4}>
                <TextField
                  id="passphrase"
                  label="Pass phrase"
                  margin="normal"
                  onChange={this.handleChange.bind(this)}
                  value= {stateObj.state.user.passphrase}
                  fullWidth
                  required
                />
                
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={6}>
                <FormControlLabel
                    control={
                      <Checkbox id="isAdmin" onChange={this.checkboxChangd.bind(this)}
                      checked={stateObj.state.user.isAdmin}     
                      required                   
                      />
                    }
                    label="Is Admin"
                  />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={6}>
                <FormControlLabel
                    control={
                      <Checkbox id="isActive" onChange={this.checkboxChangd.bind(this)}
                      checked={stateObj.state.user.isActive}
                      required
                      />
                    }
                    label="Is Active"
                  />
                </ItemGrid>
              </Grid>
              
            </div>
          }
          footer={<div><Button style={{'background-color':'#333333'}} variant="contained" color="primary" onClick={this.saveUser} >Save</Button>
          <Button style={{'background-color':'#333333'}} variant="contained" color="primary" onClick={this.onCancelBtnClicks.bind(this)} >Cancel</Button></div>}
          />
            </ItemGrid>
      </Grid>

        </div>);
    }
}
export default RosterRecord;