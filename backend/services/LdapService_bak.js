const ldapClient = require("promised-ldap");
const ldap = require("ldapjs");
const getClient = async function(){
  var client = new ldapClient({ url: CONFIG.ldapURL });
  await client.bind(ldapUserName, ldpaPassword);
  return client;
}
const search = async function() {
  var client = await getClient();
   var opts = {
    filter: "(objectclass=user)",
    scope: "sub",
    attributes: ["objectGUID", "mail"]
  };
  result = await client.search("OU=QTS Customers,DC=gdt,DC=ms", opts);
  await client.unbind();
  console.log(result.entries);
};
module.exports.search = search;
const add = async function() {
  var client = await getClient();
  var entry = {
    objectClass: ["user", "organizationalPerson", "person", "top"],
    objectCategory: "CN=Person,CN=Schema,CN=Configuration,DC=gdt,DC=ms",
    mail: "James4JJordan@teleworm.us",
    givenName: "James4",
    sn: "Jordan",
    telephoneNumber: "Crystal Coms"
  };
  await client.add(
    "CN=JamesNew1 J. Jordan,OU=Crystal Coms,OU=QTS Customers,DC=gdt,DC=ms",
    entry
  );
  await client.unbind();
};
module.exports.add = add;
const update = async function() {
  var client = await getClient();
  var change = new ldap.Change({
    operation: "replace",
    modification: {
      telephoneNumber: "NEW"
    }
  });

  await client.modify(
    "CN=JamesNew4 J. Jordan,OU=Crystal Coms,OU=QTS Customers,DC=gdt,DC=ms",
    change
  );
  await client.unbind();
};
module.exports.update = update;

