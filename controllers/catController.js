const express = require('express');
const router = express.Router();
const Cats = require('../models/cats.js');

// INDEX ROUTE
router.get('/', async (req, res) =>{
    try {
        const cats = await Cats.find();
        res.render('./cats/index.ejs', {
           // catImage : req.file.filename,
            cats : cats
        });
    }catch(err){
        console.log(err);
        res.send(err)
    }
})

// NEW ROUTE
router.get('/new', (req, res) =>{
    res.render('./cats/new.ejs', {
        
    });
})

// CREATE/POST ROUTE
// router.post('/', async (req, res)=>{
//     const catImage = req.file.filename;
//     console.log(catImage);
//     try {
//         const cat = await Cats.create({ name: req.body.name, age: req.body.age, gender: req.body.gender,description: req.body.description, image: catImage, creator: res.locals.currentUser });
//         //console.log(cat);
//         console.log(res.locals.currentUser);
//         res.redirect('/cats');
//         //console.log(req.body);
//     }catch(err){
//         res.send(err)
//         //console.log(err)
//     }
//  })





 
// SHOW ROUTE
router.get('/:id', async (req, res) =>{
    const cat = await Cats.findById(req.params.id);
    //const catImage = await Cats.find(req.file.filename)
    //console.log(cat);
    console.log("REQ>SESSIONS CAT CONTROLLER",req.session)
    console.log("CATS RES>LOCALS ",res.locals)
    console.log("CATS IN SHOW ROUTE",cat)
    res.render('./cats/show.ejs', {
        cat : cat,
        currentUser : res.locals.currentUser
    })
})

// EDIT ROUTE
router.get('/:id/edit', async (req, res)=>{
    const cat = await Cats.findById(req.params.id);
    res.render('./cats/edit.ejs', {
        catId : req.params.id,
        cat : cat
    })
})
// UPDATE ROUTE
router.put('/:id', async (req, res) =>{
    const catImage = req.file.filename;
    try{
        const cats = await Cats.findByIdAndUpdate(req.params.id,{ name: req.body.name, age: req.body.age, gender: req.body.gender,description: req.body.description, image: catImage }, {new: true}, );
        console.log("CATS IN UPDATE ROUTE",cats);
        res.redirect('/cats');
    }catch(err){
        console.log(err)
    }
})
// DELETE ROUTE
router.delete('/:id', async (req, res) =>{
    const cat = await Cats.findByIdAndDelete(req.params.id);
    res.redirect('/cats');
})

module.exports = router;