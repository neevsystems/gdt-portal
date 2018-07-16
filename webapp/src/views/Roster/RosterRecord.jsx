import React from "react";
import { Grid,TextField ,Checkbox,FormControlLabel,
  FormControl,MenuItem,Select,Chip,InputLabel,Input,MenuProps} from "material-ui";
import {  RegularCard, ItemGrid,Button} from "components";
import {  Edit,Delete, Save} from "@material-ui/icons";
import {getUser,createUser,updateUser,getEnvronments,getCompanies} from '../../services/rosterService';
const title = [
    { value: 'Mr.', label: 'Mr.'},
    { value: 'Mrs.', label: 'Mrs.'},
    { value: 'Miss.', label: 'Miss.'}
  ];
  const loginUserEmail='ashok.kumar@neevsystems.com';
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
          userName:'', 
          passphrase:'', 
          password:'', 
          userStatus:'', 
          email:'', 
          businessPhone:'', 
          mobilePhone:'', 
          homeMobile:'', 
          emailNotifications:'', 
          ticketRequester:'', 
          notifierOnly:'', 
          roles:'', 
          company:'', 
          envronment:'',
          envronmentArray:[],
          userType: '',
          domainName:''
        },
        companies:[],
        envronments:[],
        userTypesArray:[{value:'Customer_Standard',text:'Customer_Standard'},],
        rolesList:[{value:'Admin',roleName:'Admin'},{value:'Employee',roleName:'Employee'}],
        
        selectedDomainVal:0,
      }
      this.getUserById=this.getUserById.bind(this);
      this.getEnvronments=this.getEnvronments.bind(this);
      this.getCompanies=this.getCompanies.bind(this);

      this.saveUser=this.saveUser.bind(this);
    
    }
   /*  handleChange = event => {
      this.setState({ name: event.target.value });
    }; */
    
    componentDidMount(){
      let id=parseInt(this.props.match.params.uid ||0);
      this.getCompanies(loginUserEmail);
     
      if(id>0){
        this.getUserById(id);
      }
    }   
    getUserById(id){
      let state=this;      
      getUser(id).then((resp)=>{
        resp.data.user.envronmentArray=resp.data.user.envronment.split(',');
        state.setState({user:resp.data.user});
      }).catch(function(error){
        console.log(error);
      });
    }
    getCompanies(eid){
      let state=this;      
      getCompanies(eid).then((resp)=>{
        state.setState({companies:resp.data.result});
      }).catch(function(error){
        console.log(error);
      });
    }
    getEnvronments(sysid,eid){
      let state=this;      
      getEnvronments(sysid,eid).then((resp)=>{
        state.setState({envronments:resp.data.result});
      }).catch(function(error){
        console.log(error);
      });
    }
    saveUser(){
      let state=this;
      let user=JSON.parse( JSON.stringify( state.state.user ) );
      user.envronment=state.state.user.envronmentArray.join(',');
      
      if(state.state.user.id<=0){        
      createUser(user).then((resp)=>{
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
        updateUser(user).then((resp)=>{
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
      var userobj = {...this.state.user}
      userobj[e.target.name] = e.target.value;
      this.setState({user:userobj});
      if(e.target.name=='company'){
       // this.state.domainName=e.target.text
        this.getEnvronments(e.target.value,loginUserEmail);
      }
    };
    checkboxChangd  (e)  {    
      var user = {...this.state.user}        
      user[e.target.name] = e.target.checked;
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
                  name="title"
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
                  name="firstName"
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
                  name="middleName"
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
                  name="lastName"
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
                <ItemGrid xs={12} sm={12} md={3}>
                <TextField
                  id="mobilePhone"
                  name="mobilePhone"
                  label="Mobile Phone"
                  margin="normal"
                  onChange={this.handleChange.bind(this)}
                  value= {stateObj.state.user.mobilePhone}
                  fullWidth
                  required
                />     
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={3}>
                <TextField
                  id="homeMobile"
                  name="homeMobile"
                  label="Home Phone"
                  margin="normal"
                  onChange={this.handleChange.bind(this)}
                  value= {stateObj.state.user.homeMobile}
                  fullWidth
                /> 
                                            
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={3}>
                <TextField
                  id="businessPhone"
                  name="businessPhone"
                  label="Business Phone"
                  margin="normal"
                  onChange={this.handleChange.bind(this)}
                  value= {stateObj.state.user.businessPhone}
                  fullWidth
                /> 
                                            
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={3}>
                <TextField
                  id="email"
                  name="email"
                  label="E-Mail Id"
                  margin="normal"
                  type='email'
                  onChange={this.handleChange.bind(this)}
                  value= {stateObj.state.user.email}
                  fullWidth
                  required
                />                
                </ItemGrid>
               {/*  <ItemGrid xs={12} sm={12} md={4}>
                <TextField
                  id="userName"
                  name="userName"
                  label="User Name"
                  margin="normal"
                  onChange={this.handleChange.bind(this)}
                  value= {stateObj.state.user.userName}
                  fullWidth
                  required
                />
                
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={4}>
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  margin="normal"
                  type="password"
                  onChange={this.handleChange.bind(this)}
                  value= {stateObj.state.user.password}
                  fullWidth
                  required
                />
                
                </ItemGrid> */}              
                 
                
                
                <ItemGrid xs={12} sm={12} md={3}>
                <FormControlLabel
                    control={
                      <Checkbox id="emailNotifications" name="emailNotifications" onChange={this.checkboxChangd.bind(this)}
                      checked={stateObj.state.user.emailNotifications}
                      required
                      />
                    }
                    label="Email Notifications"
                  />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={3}>
                <FormControlLabel
                    control={
                      <Checkbox id="ticketRequester" name="ticketRequester" onChange={this.checkboxChangd.bind(this)}
                      checked={stateObj.state.user.ticketRequester}
                      required
                      />
                    }
                    label="Ticket Requester"
                  />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={3}>
                <FormControlLabel
                    control={
                      <Checkbox id="notifierOnly" name="notifierOnly" onChange={this.checkboxChangd.bind(this)}
                      checked={stateObj.state.user.notifierOnly}
                      required
                      />
                    }
                    label="Notifier Only"
                  />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={3}>
                <FormControlLabel
                    control={
                      <Checkbox id="userStatus" name="userStatus" onChange={this.checkboxChangd.bind(this)}
                      checked={stateObj.state.user.userStatus}
                      required
                      />
                    }
                    label="User Status"
                  />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={3}>
                <TextField
                  id="passphrase"
                  name="passphrase"
                  label="Pass phrase"
                  margin="normal"
                  type='password'
                  onChange={this.handleChange.bind(this)}
                  value= {stateObj.state.user.passphrase}
                  fullWidth
                  required
                />               
                </ItemGrid> 
                <ItemGrid xs={12} sm={12} md={3}>
                <TextField
                  select
                  id="userType"
                  name="userType"
                  label="User Type"
                  margin="normal"
                  onChange={this.handleChange.bind(this)}
                  value= {stateObj.state.user.userType}
                  fullWidth
                >
                    {stateObj.state.userTypesArray.map(function(item,key) {
                  return <MenuItem key={key} value={item.value}>{item.text}</MenuItem>
                  })}
                </TextField>
                </ItemGrid>

                <ItemGrid xs={12} sm={12} md={3}>
                <TextField
                  select
                  id="roles"
                  name="roles"
                  label="Roles"
                  margin="normal"
                  onChange={this.handleChange.bind(this)}
                  value= {stateObj.state.user.roles}
                  fullWidth
                >
                    {stateObj.state.rolesList.map(function(item,key) {
                  return <MenuItem key={key} value={item.value}>{item.roleName}</MenuItem>
                  })}
                </TextField>

                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={3}>
                <TextField
                  select
                  id="company"
                  name="company"
                  label="Company"
                  margin="normal"
                  onChange={this.handleChange.bind(this)}
                  value= {stateObj.state.user.company}
                  fullWidth
                > 
                    {stateObj.state.companies.map(function(item,key) {
                  return <MenuItem key={key} value={item['company.sys_id']}>{item['company.name']}</MenuItem>
                  })}
                </TextField>

               
                </ItemGrid>

                <ItemGrid xs={12} sm={12} md={12}>
                    <FormControl fullWidth >
                      <InputLabel >Environment</InputLabel>
                      <Select
                      fullWidth
                      name="envronmentArray"
                      multiple
                      value={stateObj.state.user.envronmentArray||[]}
                      onChange={stateObj.handleChange.bind(this)}
                      input={<Input id="select-multiple-chip" />}
                      renderText={selected => (
                        <div>
                          {selected.map(value => <Chip key={value} label={value} />)}
                        </div>
                      )}
                      
                    >
            {stateObj.state.envronments.map(item => (
              <MenuItem
                
                value={item['sys_id']}
                
              >
                {item['u_name']}
              </MenuItem>
            ))}
          </Select>
                                                                       
                  </FormControl>
                </ItemGrid>
              </Grid>
              
            </div>
          }
          footer={<div><Button style={{'background-color':'#1A237E'}} variant="contained" color="primary" onClick={this.saveUser} >Save</Button>
          <Button style={{'background-color':'#1A237E'}} variant="contained" color="primary" onClick={this.onCancelBtnClicks.bind(this)} >Cancel</Button></div>}
          />
            </ItemGrid>
      </Grid>

        </div>);
    }
}
export default RosterRecord;