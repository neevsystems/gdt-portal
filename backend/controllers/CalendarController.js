
const getCalenderDetails =async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    console.log('TEST1');
    return res.json({success:true, message:'it worked', data:'user name is :'});
}

module.exports.getCalenderDetails = getCalenderDetails