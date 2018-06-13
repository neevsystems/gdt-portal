const multer = require('multer');

const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./documents");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count

module.exports.uploadFiles=function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
};

