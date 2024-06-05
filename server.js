const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const morgan = require('morgan')
const methodOverride = require('method-override')
const path = require('path');
const actCtrl = require('./controllers/actresses')
//const ActressModel = require('./models/actress');
const authController = require('./controllers/auth')
const session = require('express-session');

const app = express();
require('./config/database')

//====Middleware
app.use(express.urlencoded({extended: false})); 
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, "public")))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/auth", authController);

//====Index route
app.get('/actresses', actCtrl.index)
//====Create route
app.get('/actresses/new', actCtrl.new)
app.post('/actresses', actCtrl.create)
//====Show route
app.get('/actresses/:actressId', actCtrl.show);
//====Update route
//====First, get actress from database and show form with prefilled info
app.get('/actresses/:actressId/edit', actCtrl.edit);
//====Then update the info and submit to db
app.put('/actresses/:actressId', actCtrl.update);
//====Delete route
app.delete('/actresses/:actressId', actCtrl.delete)

//====Index route
app.get("/", (req, res) => {
    res.render("index.ejs", {
      user: req.session.user,
    });
  });
  

app.listen(3000, function(){
    console.log('Listening on port 3000')
})
