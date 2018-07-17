const TestUsers          = require('../models').TestUsers;
const Customers          = require('../models').Customer;

const getUserAccessDetails = async function(req, res){
    res.setHeader('Content-Type', 'application/json'); 
       let eid=req.params.eid
    let tuser,err1;    
    [err1, tuser] = await to(TestUsers.findOne({where:{email:eid}}));
    if(err1)
        return ReE(res, err1, 422);        
    let err2,tcustomer
    [err2, tcustomer] = await to(Customers.findOne({where:{id:tuser.customerId}})); 
    let err3,accessCompany
    if(tcustomer.isCustomer){        
        [err3,accessCompany]=await to(Customers.findOne({where:{isCustomer:false}}));
    }
    else{
        if(tuser.role=='ADMIN'){
            [err3,accessCompany]=await to(Customers.findAll({where:{isCustomer:true}}));
        }
        else{
            [err3,accessCompany]=await to(Customers.findAll({where:{isComplaince:false}}));
        }
    }
       
    return ReS(res, {testuser:tuser,company:tcustomer,accesscompanys:accessCompany}, 200);
}
module.exports.getUserAccessDetails = getUserAccessDetails;