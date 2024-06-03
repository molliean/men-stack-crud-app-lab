const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const morgan = require('morgan')
const methodOverride = require('method-override')
const path = require('path');

const ActressModel = require('./models/actress');

const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', function(){
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

//====Middleware
app.use(express.urlencoded({extended: false})); // parses form request to give us req.body
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, "public")))

//====Create route
app.get('/actresses/new', (req, res)=>{
    res.render('actresses/new.ejs')
})

app.post('/actresses', async (req, res) => {
    req.body.isWinner = !!req.body.isWinner
    console.log(req.body)
    const actress = await ActressModel.create(req.body)
    console.log(actress, "<---this is the created actress")
    res.redirect('/actresses')
})


//====Index route
app.get('/actresses', async (req,res)=>{
    const actressDocs = await ActressModel.find({})
    console.log(actressDocs) 
    res.render('actresses/index.ejs', {actressDocs: actressDocs})
})

//====Show route
app.get('/actresses/:actressId', async (req, res)=>{
    const actressDoc = await ActressModel.findById(req.params.actressId);
    console.log(actressDoc, "<-- Actress Doc")
    res.render('actresses/show.ejs', {actressDoc: actressDoc})
})

//====Delete route
app.delete('/actresses/:actressId', async (req, res) => {
    const deletedActress = await ActressModel.findByIdAndDelete(req.params.actressId);
    res.redirect('/actresses');
})

//====Update route
//====First, get actress from database and show form with prefilled info
app.get('/actresses/:actressId/edit', async (req, res) => {
    const foundActress = await ActressModel.findById(req.params.actressId);
    console.log(foundActress)
    res.render('actresses/edit.ejs', {foundActress: foundActress})
})
//====Then update the info and submit to db
app.put('/actresses/:actressId', async (req, res) => {
    req.body.isWinner = !!req.body.isWinner
    const updatedActress = await ActressModel.findByIdAndUpdate(req.params.actressId, req.body)
    res.redirect(`/actresses/${req.params.actressId}`);
})




//====
app.get("/", (req, res) => {
    res.render('index.ejs');
})

app.listen(3000, function(){
    console.log('Listening on port 3000')
})
