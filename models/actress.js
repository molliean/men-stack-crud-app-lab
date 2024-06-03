const mongoose = require('mongoose');

const actressSchema = new mongoose.Schema({
    name: String,
    birthplace: String,
    isWinner: Boolean
})

const Actress = mongoose.model('Actress', actressSchema)

module.exports = Actress;