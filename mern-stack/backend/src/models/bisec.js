
const { Schema, model } = require('mongoose');

const BisecSchema = new Schema(
    {
        XL : Number ,
        XR : Number 

    }, {
        timestamps: true
    });

module.exports = model('bisec', BisecSchema);