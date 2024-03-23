import path from 'path'
import multer from 'multer'

const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 1024*1024*100},// 100 mb maximum is the limit for upload
    
    storage: multer.diskStorage({
        destination: 'uploads/' ,
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        },
    }),
    fileFilter: (req, file, cb)=>{
        let ext =path.extname(file.originalname)
        if(
            ext !=='.jpg' &&
            ext !=='.jpeg' &&
            ext !=='.png' &&
            ext !=='.mp4' &&
            ext !=='.webp'
        ){
            cb(new Error(`Unsupported file type: ${ext}`), false)
            return
        }
        cb(null, true)
    },
    
})
  
export default upload