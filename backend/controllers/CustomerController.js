const Customer          = require('../models').Customer;

const getall = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let customers,err;
    [err, customers] = await to(Customer.findAll());
    if(err)
        return ReE(res, err, 422);
    else
        return ReS(res, {customers:customers}, 200);
}
module.exports.getall = getall;