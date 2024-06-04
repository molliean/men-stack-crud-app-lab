const ActressModel = require('../models/actress');

module.exports = {
    index,
    new: newActress,
    create,
    show,
    edit,
    update,
    delete: deleteOne
}

async function index (req,res) {
    try {
        const actressDocs = await ActressModel.find({})
        console.log(actressDocs) 
        res.render('actresses/index.ejs', {actressDocs: actressDocs})
    } catch (error) {
        res.send(error);
    }
}

async function newActress (req, res) {
    res.render('actresses/new.ejs')
}

async function create (req, res) {
    try {
        req.body.isWinner = !!req.body.isWinner
        console.log(req.body)
        const actress = await ActressModel.create(req.body)
        console.log(actress, "<---this is the created actress")
        res.redirect('/actresses')
    } catch (error) {
        res.send(error)
    }
}

async function show (req, res) {
    try {
        const actressDoc = await ActressModel.findById(req.params.actressId);
        console.log(actressDoc, "<-- Actress Doc")
        res.render('actresses/show.ejs', {actressDoc: actressDoc})
    } catch (error) {
        res.send(error);
    }
}

async function edit (req, res) {
    try {
        const foundActress = await ActressModel.findById(req.params.actressId);
        console.log(foundActress)
        res.render('actresses/edit.ejs', {foundActress: foundActress}) 
    } catch (error) {
        res.send(error);
    }
}

async function update (req, res) {
    try {
        req.body.isWinner = !!req.body.isWinner
        const updatedActress = await ActressModel.findByIdAndUpdate(req.params.actressId, req.body)
        res.redirect(`/actresses/${req.params.actressId}`);
    } catch (error) {
        res.send(error);
    }
}

async function deleteOne (req, res) {
    try {
        const deletedActress = await ActressModel.findByIdAndDelete(req.params.actressId);
        res.redirect('/actresses');
    } catch (error) {
        res.send(error);
    }

}