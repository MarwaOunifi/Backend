const multer = require('multer');
const path = require('path');
const fs = require('fs');

var storage = multer.diskStorage(
    {
     destination: function (req, file, cb) {
         cb(null, 'public/files')
     },
     filename: function (req, file, cb) {
        const uploadfile = 'pulic/files';
        const originalName =file.originalname;
        const fileExtension = path.extname(originalName);
        const filename = originalName;
        const fileIndex = 0;

        while (fs.existsSync(path.join(uploadpath , filename))){
            const baseName = path.basename(originalName, fileExtension);
            fileName = `${baseName}_${fileIndex}${fileExtension}`;
            fileIndex++;
        }
        cb(null, filename);
     }
    }
)

const uploadfile = multer({ storage: storage });
module.exports = uploadfile;
