const ldapClient = require("promised-ldap");
const ldap = require("ldapjs");
const object_Class=["user", "organizationalPerson", "person", "top"];
const obeject_Category="CN=Person,CN=Schema,CN=Configuration,DC=gdt,DC=ms";

const getClient = async function(){
    var client = new ldapClient({ url: CONFIG.ldapURL });
    await client.bind(CONFIG.ldapUserName, CONFIG.ldpaPassword);
    return client;
}
const add = async function(userobj) {
    var client = await getClient();
    var entry = {
      objectClass: object_Class,
      objectCategory: obeject_Category,
      mail: userobj.email,//"James4JJordan@teleworm.us",
      givenName: "James4",
      sn: userobj.lastName,//"Jordan",
      telephoneNumber:userobj.businessPhone// "Crystal Coms"
    };
    var fullName=userobj.firstName+' '+userobj.middleName+' '+userobj.lastName;
    var err,obj
    [err,obj]=await to(client.add(
        fullName+",OU=Crystal Coms,OU=QTS Customers,DC=gdt,DC=ms",
        entry
    )) ;
    if(err){
        return false;
    }
    await client.unbind();
    return true;
  };
  module.exports.add = add;