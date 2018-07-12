var rp = require('request-promise');
var querystring = require("querystring");

const getOpenTickets=async function(myUser){
    //const company = querystring.escape('General Datatech LP');
   // const email=querystring.escape(myUser.email);
    var auth = 'Basic ' + Buffer.from(CONFIG.SERVICE_AC_USERNAME + ':' + CONFIG.SERVICE_AC_PASSWORD).toString('base64');   
const options = {
    url:`${CONFIG.SERVICE_AC_URL}/api/now/table/incident?sysparm_query=stateIN1%2C11%2C2%2C3%2C4%2C5&sysparm_display_value=true&sysparm_exclude_reference_link=true`,
   //uri: `${CONFIG.SERVICE_AC_URL}/api/now/table/incident?sysparm_query=active%3Dtrue%5EstateNOT%20IN8%2C6%2C7%5Eassigned_to.email%3D${email}&sysparm_display_value=true&sysparm_exclude_reference_link=true&sysparm_fields=number%2Cshort_description%2Cdescription`,
   headers: {
        'Authorization': auth
    },
    json: true // Automatically parses the JSON string in the response
};
let err,output;
[err, output] = await to( rp(options));
if(err) TE(err);
return output;

}
module.exports.getOpenTickets=getOpenTickets;

const getResolvedTickets=async function(myUser){
    //const company = querystring.escape('General Datatech LP');
    //const email=querystring.escape(myUser.email);
    var auth = 'Basic ' + Buffer.from(CONFIG.SERVICE_AC_USERNAME + ':' + CONFIG.SERVICE_AC_PASSWORD).toString('base64');   
const options = {
   // uri: `${CONFIG.SERVICE_AC_URL}/api/now/table/incident?sysparm_query=stateIN6%2C7%5Eassigned_to.email%3D${email}&sysparm_display_value=true&sysparm_exclude_reference_link=true&sysparm_fields=number%2Cshort_description%2Cdescription`,
   url:`${CONFIG.SERVICE_AC_URL}/api/now/table/incident?sysparm_query=state%3D6&sysparm_display_value=true&sysparm_exclude_reference_link=true`,
   headers: {
        'Authorization': auth
    },
    json: true // Automatically parses the JSON string in the response
};
[err, output] = await to( rp(options));
if(err) TE('user already exists with that phone number');
return output;

}
module.exports.getResolvedTickets=getResolvedTickets;

const getDomainsByUser=async function(email){
    const _email=querystring.escape(email);
    var auth = 'Basic ' + Buffer.from(CONFIG.SERVICE_AC_USERNAME + ':' + CONFIG.SERVICE_AC_PASSWORD).toString('base64');   
    const options = {
        url:`${CONFIG.SERVICE_AC_URL}/api/now/table/sys_user?sysparm_query=email%3D${_email}&sysparm_display_value=true&sysparm_exclude_reference_link=true&sysparm_fields=sys_domain.name%2Csys_domain.sys_id`,
        headers: {
            'Authorization': auth
        },
        json: true // Automatically parses the JSON string in the response
    };
    [err, output] = await to( rp(options));
    if(err) TE(err);
    return output;

} 
module.exports.getDomainsByUser=getDomainsByUser;

const getCompanies=async function(sys_id,email){
    const _email=querystring.escape(email);
    var auth = 'Basic ' + Buffer.from(CONFIG.SERVICE_AC_USERNAME + ':' + CONFIG.SERVICE_AC_PASSWORD).toString('base64');   
    const options = {
        url:`${CONFIG.SERVICE_AC_URL}/api/now/table/sys_user?sysparm_query=sys_domain%3D${sys_id}%5Eemail%3D${_email}&sysparm_display_value=true&sysparm_exclude_reference_link=true&sysparm_fields=company.name%2Ccompany.sys_id`,
        headers: {
            'Authorization': auth
        },
        json: true // Automatically parses the JSON string in the response
    };
    [err, output] = await to( rp(options));
    if(err) TE(err);
    return output;
}
module.exports.getCompanies=getCompanies;