var ldap = require('ldapjs');
var ssha = require('node-ssha256');
var client = ldap.createClient({
  url: 'ldap://c1dc01.gdt.ms'
});

  client.bind('SVC_QTSPortalLDAP@GDT', 'JiD6T79lLuS$yvv!JWnA4D$2', function (err) {
   if(!err){
    var opts = {
      filter: '(objectclass=user)',
      scope: 'sub',
      attributes: ['objectGUID','mail']
    };
    client.search('OU=QTS Customers,DC=gdt,DC=ms', opts, function (err, search) {
      search.on('searchEntry', function (entry) {
        var user = entry.object;
        console.log(user.mail);
      });
      search.on('end', function(result) {

        client.unbind(function(err) {
            process.exit();
          });
      });
    });

  }
  else{
    console.log(err);
  }
  })

  client.bind('SVC_QTSPortalLDAP@GDT', 'JiD6T79lLuS$yvv!JWnA4D$2', function (err) {
    if(!err){
    var entry = {
      objectClass: ['user','organizationalPerson','person','top'],
      objectCategory: 'CN=Person,CN=Schema,CN=Configuration,DC=gdt,DC=ms',
      mail: 'James3JJordan@teleworm.us',
      givenName: 'James3',
      sn: 'Jordan',
      telephoneNumber: 'Crystal Coms',
      };
      client.add('CN=JamesNew1 J. Jordan,OU=Crystal Coms,OU=QTS Customers,DC=gdt,DC=ms', entry, function(err) {
        if(err) console.log('Error',err);
        else console.log('Added');
        client.unbind(function(err) {
          process.exit();
        });
      });
    }
  });


  client.bind('SVC_QTSPortalLDAP@GDT', 'JiD6T79lLuS$yvv!JWnA4D$2', function (err) {
    if(!err){
      var change = new ldap.Change({
        operation: 'replace',
        modification: {
          telephoneNumber: 'NEW',
        }
      });

      client.modify('CN=JamesNew1 J. Jordan,OU=Crystal Coms,OU=QTS Customers,DC=gdt,DC=ms', change, function(err) {
        if(err) console.log('Error',err);
        else console.log('changed');
        client.unbind(function(err) {
          process.exit();
        });
      });


    }
  });


