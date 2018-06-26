const snowService = require('../services/SNOWService');

const getall = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
   console.log(req.user);
   let events=[
    {
        title: 'All Day Event',
        start: '2018-05-01'
    },
    {
        title: 'Long Event',
        start: '2018-05-07',
        end: '2018-05-10'
    },
    {
        id: 999,
        title: 'Repeating Event',
        start: '2018-06-09T16:00:00'
    },
    {
        id: 999,
        title: 'Repeating Event',
        start: '2018-06-16T16:00:00'
    },
    {
        title: 'Conference',
        start: '2018-06-11',
        end: '2018-06-13'
    },
    {
        title: 'Meeting',
        start: '2018-06-12T10:30:00',
        end: '2018-06-12T12:30:00'
    },
    {
        title: 'Birthday Party',
        start: '2018-06-13T07:00:00'
    },
    {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2018-06-28'
    }
];


        return ReS(res, {events:events}, 200);
}

module.exports.getall = getall;
const getSNOWChangeEvents = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err,events;
    [err,events]=await to(snowService.getChangeEvents()); 
  return ReS(res, {events:reArrangeEvents(events.result)}, 200);
}
module.exports.getSNOWChangeEvents = getSNOWChangeEvents;
function reArrangeEvents(events){
    let resultEvents=[];    
    events.forEach(function (item) {
        let finalObj={}
        
        if(item.start_date!=""){
            finalObj.start=new Date(item.start_date);
        }
        else{
            if(item.work_start!=""){
                finalObj.start=new Date(item.work_start);
            }
        }
        if(item.end_date!=""){
            finalObj.end=new Date(item.end_date);
        }
        else{
            if(item.work_end!=""){
                finalObj.end=new Date(item.work_end);
            }
        }
        if(finalObj.start==undefined){
            if(finalObj.end!=undefined){
                finalObj.start=finalObj.end;
            }
        }
        else{
        if(finalObj.end==undefined){
            if(finalObj.start!=undefined){
                finalObj.end=finalObj.start;
            }
        }
    }
        finalObj.title=item.short_description;    
        finalObj.reason= item.reason;
        finalObj.short_description= item.short_description;
        finalObj.number= item.number;
        finalObj.type= item.type;
        if(finalObj.start!=undefined && finalObj.end!=undefined)
        resultEvents.push(finalObj);
    });

        return resultEvents;
      }


