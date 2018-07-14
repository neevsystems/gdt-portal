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
      givenName: CONFIG.ldapUserName,
      sn: userobj.lastName,//"Jordan",
      telephoneNumber:userobj.businessPhone// "Crystal Coms"
    };
    var fullName=userobj.firstName+' '+userobj.middleName+' '+userobj.lastName;
    var err,obj
    [err,obj]=await to(client.add(
       // "CN="+fullName+",OU="+userobj.domain+",OU=QTS Customers,DC=gdt,DC=ms",
       "CN="+fullName+",OU=Crystal Coms,OU=QTS Customers,DC=gdt,DC=ms",
        entry
    )) ;
    if(err){
        return false;
    }
    await client.unbind();
    return true;
  };

  module.exports.addLdapUser = add;

  const update = async function(userobj) {
    var client = await getClient();
    var change = new ldap.Change({
      operation: "replace",
      modification: {
        telephoneNumber: userobj.businessPhone
      }
    });
    var fullName=userobj.firstName+' '+userobj.middleName+' '+userobj.lastName;
    
    
    var err,obj
    [err,obj]= await to(client.modify(
      //"CN="+fullName+",OU="+userobj.domain+",OU=QTS Customers,DC=gdt,DC=ms",
      "CN="+fullName+",OU=Crystal Coms,OU=QTS Customers,DC=gdt,DC=ms",
      change
    ));
    if(err){
      return false;
  }
    await client.unbind();
    return true;
  };
  module.exports.update = update;

  const search = async function(email) {
    var client = await getClient();
     var opts = {
    
      filter: "(mail="+email+")",
      scope: "sub",
      attributes: ["objectGUID", "mail","cn"]
    };
    result = await client.search("OU=QTS Customers,DC=gdt,DC=ms", opts);
    await client.unbind();
    console.log(result.entries);
  };
  module.exports.search = search;