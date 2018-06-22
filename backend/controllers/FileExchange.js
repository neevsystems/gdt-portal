const multer = require('multer');
const fs = require('fs-extra');
var path = require('path');

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
    console.log(req.params.id,' :resp');
    let doc,err;
    var archiveVirPath=req.protocol + '://' + req.get('host')+CONFIG.ARCHIVED_PATH.substr(1,CONFIG.ARCHIVED_PATH.length) +'/';
    [err,doc]=await to(Document.findOne({where:{id:req.params.id,isArchived:false}}));
    if((doc==undefined?null:doc)!=null ){
        let fname=doc.fileName;
        
        let sourceFile= path.join(__dirname,'../',doc.filePath.replace(req.protocol + '://' + req.get('host'),''));
        let destFile=path.join(__dirname,'../','/'+CONFIG.ARCHIVED_PATH.substr(1,CONFIG.ARCHIVED_PATH.length) +'/');
        moveFile(sourceFile,destFile+fname).then(async function(resdata){
            if(resdata==true){
                doc.isArchived=true;
                doc.filePath=archiveVirPath+fname;
                let uerr,udoc;
                [uerr,udoc]=await to(doc.save());
                if(err){                    
                    return ReE(res, err);
                }
                return ReS(res, {message :'Archived file successfully: '});
            }
            else{
                return ReE(res, 'Failed to Archive file');
            }
        })
    }
    else{
        return ReE(res, 'Failed to Archive file');
    }
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