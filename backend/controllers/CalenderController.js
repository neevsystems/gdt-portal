const getall = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
   // let users,err;
   // [err, users] = await to(User.findAll());
    //if(err) 
     //   return ReE(res, err, 422);
   // else
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