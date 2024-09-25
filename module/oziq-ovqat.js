const { Schema, model } = require("mongoose");

const OziqOvqatAdd = new Schema({
     nomi: { type: String, required: true },
     kelgannarxi: { type: String, required: true },
     sotishnarxi: { type: String, required: true },
     soni: { type: String, required: true },
     barcode: { type: Number, required: true },
     unit: { type: String, enum: ["pcs", "kg"], required: true } // Added unit field
});

module.exports = model("OziqOvqatAdd", OziqOvqatAdd);
