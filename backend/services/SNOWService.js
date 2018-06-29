var rp = require('request-promise');
var querystring = require("querystring");
const getChangeEvents = async function(){

const company = querystring.escape('General Datatech LP');
var auth = 'Basic ' + Buffer.from(CONFIG.SnowUserName + ':' + CONFIG.SnowPassword).toString('base64');
    const options = {
        uri: `${CONFIG.SnowURL}/api/now/table/change_request?sysparm_query=company.name%3D${company}&sysparm_display_value=true&sysparm_display_value=true&sysparm_fields=work_start%2Creason%2Cwork_end%2Ctype%2Cshort_description%2Cstart_date%2Cend_date%2Cnumber`,
        headers: {
            'Authorization': auth
        },
        json: true // Automatically parses the JSON string in the response
    };
    [err, output] = await to( rp(options));
    if(err) TE('user already exists with that phone number');
    return output;
    }

    module.exports.getChangeEvents=getChangeEvents;