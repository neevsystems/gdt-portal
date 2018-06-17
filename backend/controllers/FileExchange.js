const multer = require('multer');
const Document          = require('../models').Document;
module.exports.uploadFiles= function (req, res) {
    var document={};
    const Storage = multer.diskStorage({
        destination: function (req, file, callback) {            
            console.log(req.body,':request ')
            document={
                fileName:req.body.fileName,
                fileFor:req.body.fileFor,
                fileFrom:req.body.fileFrom,
                fileDesc:req.body.fileDesc,
                filePath:CONFIG.FILE_PATH+'/'+file.originalname
            };
            callback(null,CONFIG.FILE_PATH);
        },
        filename: function (req, file, callback) {
            callback(null,file.originalname);
        }
    });
    var upload = multer({ storage: Storage }).any(); //Field name and max count  
    upload(req, res, async function (err) {
        [err, doc] = await to(Document.create(document));
        if(err) 
            return ReE(res, err, 422);
        return ReS(res, {message:'File uploaded sucessfully!.', document:doc}, 201);
    });
};

const getall = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let docs,err;
    [err, docs] = await to(Document.findAll());
    if(err) 
        return ReE(res, err, 422);
    else
        return ReS(res, {documents:docs}, 200);
}
module.exports.getall = getall;