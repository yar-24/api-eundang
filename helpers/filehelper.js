'use strict';
const multer = require('multer');

const storage = multer.diskStorage({
});

// const storageMusic = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'FolderMusics');
//     },
//     filename: (req, file, cb) => {
//         cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
//     }
// })
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
        || file.mimetype === 'image/jpeg' || file.mimetype === 'audio/mpeg' || file.mimetype === "audio/mp3"){
            cb(null, true);
        }else {
            cb(null, false);
        }
}

const fileUploads = multer({storage: storage, fileFilter: filefilter });
// const folderMusics = multer({storage: storageMusic, fileFilter: filefilter });
const comments = multer({storage: storage});

module.exports = {fileUploads, comments}