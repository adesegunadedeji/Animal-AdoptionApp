const express = require('express');
const router = express.Router();
const Cats = require('../models/cats.js');

// INDEX ROUTE
router.get('/', async (req, res) =>{
    try {
        const allCats = await Cats.find();
        res.render('./cats/index.ejs', {
            cats : allCats
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
router.post('/', async (req, res)=>{
    const catImage = req.file.location
    console.log(catImage);
    try {
        const newCat = await Cats.create({ name: req.body.name, age: req.body.age, gender: req.body.gender,description: req.body.description, image: catImage, creator: res.locals.currentUser });
        res.redirect('/cats');
        console.log("DOGIMAGE",newCat);
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
 })

 
// SHOW ROUTE
router.get('/:id', async (req, res) =>{
    const foundCat = await Cats.findById(req.params.id);
    res.render('./cats/show.ejs', {
        oneCat: foundCat
    })
})

// EDIT ROUTE
router.get('/:id/edit', async (req, res)=>{
    const foundCat = await Cats.findById(req.params.id);
    res.render('./cats/edit.ejs', {
       oneCat: foundCat
    })
})
// UPDATE ROUTE
router.put('/:id', async (req, res) =>{
    const catImage = req.file.location
    try{
        const cats = await Cats.findByIdAndUpdate(req.params.id,{ name: req.body.name, age: req.body.age, gender: req.body.gender,description: req.body.description, image: catImage }, {new: true});
        console.log("CATS IN UPDATE ROUTE",cats);
        res.redirect('/cats');
    }catch(err){
        console.log(err)
    }
})
// DELETE ROUTE
router.delete('/:id', async (req, res) =>{

    try{
    const cat = await Cats.findByIdAndDelete({_id: req.params.id});
    res.redirect('/cats');
}
catch(err){
    console.log(err);
      res.send(err);
  }

})

module.exports = router;