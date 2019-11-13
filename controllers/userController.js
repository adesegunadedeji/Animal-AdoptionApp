// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');
// const bcrypt = require('bcryptjs');

// // NEW ROUTE
// router.get("/new", (req, res)=>{
//     try{
//         res.render("user/new.ejs");
//     }catch(err){
//         res.send(err)
//         console.log(err)
//     }
// })
// // ROUTE TO FIRST PAGE
// router.get('/landing', (req, res)=>{
//     res.render('/landing.ejs')
// })

// // create new user route
// router.post('/', async (req, res) =>{
//     try{
//         const salt = bcrypt.genSaltSync();
//         // console.log(req.body)
//         req.body.password = bcrypt.hashSync(req.body.password, salt);
//         const newUser = await User.create(req.body);
//         req.session.userId = newUser._id;
//         res.redirect('/about');
//         console.log(newUser);
//     }catch(err){
//         console.log(err)
//         res.send(err)
//     }
// })

// // log in get route render login.ejs 
// router.get('/login', (req, res)=>{
//    res.render('user/login.ejs')
// });

// // // log in post route
// router.post('/login', async (req, res)=>{
    
//     try{
//         const userFromDb = await User.findOne({username: req.body.username})
//         const passwordIsValid = bcrypt.compareSync(req.body.password, userFromDb.password)

//         if(passwordIsValid){
//                 req.session.userId = userFromDb._id;
//                 res.redirect('/about')
//                 console.log(userFromDb)
//             }else{
//                 res.send('<a href="/">wrong password</a>')
//             }
//     }catch(err){
//         res.send(err)
//         console.log(err)
//     }
// })

// module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// NEW ROUTE
router.get("/new", (req, res)=>{
    try{
        res.render("user/new.ejs");
    }catch(err){
        res.send(err)
        console.log(err)
    }
})
// ROUTE TO FIRST PAGE
router.get('/landing', (req, res)=>{
    res.render('/landing.ejs')
})

// create new user route
router.post('/', async (req, res) =>{
    try{
        const salt = bcrypt.genSaltSync();
        // console.log(req.body)
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        const newUser = await User.create(req.body);
        req.session.userId = newUser._id;
        res.redirect('/about');
        console.log(newUser);
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

// log in get route render login.ejs 
router.get('/login', (req, res)=>{
   res.render('user/login.ejs')
});

// // log in post route
router.post('/login', async (req, res)=>{
    
    try{
        const userFromDb = await User.findOne({username: req.body.username})
        const passwordIsValid = bcrypt.compareSync(req.body.password, userFromDb.password)

        if(passwordIsValid){
                req.session.userId = userFromDb._id;
                res.redirect('/about')
                console.log(userFromDb)
            }else{
                res.send('<a href="/">wrong password</a>')
            }
    }catch(err){
        res.send(err)
        console.log(err)
    }
})

module.exports = router;