const multer = require('multer');
const fs = require('fs-extra');
const Document          = require('../models').Document;
module.exports.uploadFiles= function (req, res) {
    var document={};
    const Storage = multer.diskStorage({
        destination: function (req, file, callback) {        
            document={
                fileName:req.body.fileName,
                fileFor:req.body.fileFor,
                fileFrom:req.body.fileFrom,
                fileDesc:req.body.fileDesc,
                filePath: req.protocol + '://' + req.get('host')+CONFIG.FILE_PATH.substr(1,CONFIG.FILE_PATH.length) +'/'+file.originalname
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

const moveFile=async function(fromFile,toFile){
    try {
        await fs.move(fromFile, toFile)
        console.log('success!')
        return true;
      } catch (err) {
        console.error(err)
        return false;
      }
}
const archiveFile=async function(req,res){

}
module.exports.archiveFile = archiveFile;
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