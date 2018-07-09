const ServiceAcSerivce = require('../services/ServiceAcService');


const openTickets=async function(req,res){
    var user={
        email:req.params.eid
    };
        res.setHeader('Content-Type', 'application/json');
        let err,tickets;
        [err,tickets]=await to(ServiceAcSerivce.getOpenTickets(user)); 
      return ReS(res, {openTickets:tickets}, 200);

}
module.exports.openTickets = openTickets;
const resolvedTickets=async function(req,res){
    var user={
        email:req.params.eid
    };
        res.setHeader('Content-Type', 'application/json');
        let err,tickets;
        [err,tickets]=await to(ServiceAcSerivce.getResolvedTickets(user)); 
      return ReS(res, {resTickets:tickets}, 200);
    
}
module.exports.resolvedTickets = resolvedTickets;