// use dotenv to import configs from the .env file

require('dotenv').config()

var aws = require('aws-sdk')
const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const multer = require('multer');
const multerS3 = require('multer-s3')
var s3 = new aws.S3({ /* ... */ })
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Configuration
const PORT = process.env.PORT
const mongoURI = process.env.MONGODB_URI


const userController = require('./controllers/userController.js')
const catController = require('./controllers/catController.js')
const dogController = require('./controllers/dogController.js')
const session = require('express-session');

//SET Storage Engine
const storage = multer.diskStorage({

    destination:'./public/uploads/', 
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() +
         path.extname(file.originalname));
    }
})

//INIT Upload.
const upload = multer({
    storage: storage,
    fileFilter : function(req, file, cb){
    checktypeofFile(file,cb)
}
}).single('image')



// const upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: 'animaladoption-app',
//       fileFilter: function (req, file, cb) {
//         cb(null, {fieldName: file.fieldname});
//         checktypeofFile(file,cb);
//       },
//       key: function (req, file, cb) {
//         cb(null, Date.now().toString())
//       }
//     })
//   }).single('image')

//Middleware to use Storage for Upload for Multer.
app.use(upload)


//  Check to  make Sure File Matches image Extensions of jpg,png, jpeg 
function checktypeofFile(file,cb){

    const fileTypes = /jpg|jpeg|gif|png/;//Types of Files Allowed
    //Check extension Matches fileTypes
    console.log(file);
    
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    //console.log(extName);

    //check MimeType
    const mimeType = fileTypes.test(file.mimetype);
    //console.log(mimeType);

    if(extName && mimeType){
        return cb(null,true);
    }
    else {
            cb("Error: Allows Image Files Only")
        }
}

// Database config and connection
mongoose.connect(mongoURI, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to mongo')
})

// configure sessions
// secret is stored in .env
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  }))

app.use(methodOverride('_method')); //For put and Delete
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next)=>{
    res.locals.currentUser = req.session.userId
    console.log(res.locals.currentUser);
    next();
})
app.use("/user", userController);
app.use('/cats', catController);
app.use('/dogs', dogController);
app.use('/images', express.static('images'));
app.use('/static', express.static('static'));
app.use('/public/uploads', express.static('public/uploads')); //For Images users will upload

// routes
app.get('/', (req, res) =>{
    res.render('landing.ejs');
})

app.get('/about', (req, res)=>{
    res.render('about.ejs')
})

app.listen(process.env.PORT, () => {
    console.log('listening on port 3000');
  })



