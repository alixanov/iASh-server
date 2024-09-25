const { Schema, model } = require("mongoose");
const SotilganMaxsulot = new Schema({
     nomi: {
          type: String,
          required: true,
     },
     kelgannarxi: {
          type: String,
          required: true,
     },
     sotishnarxi: {
          type: String,
          required: true,
     },
     soni: {
          type: String,
          required: true,
     },
     unit: {
          type: String, // Добавляем поле для единицы измерения
          enum: ['kg', 'pcs'], // Указываем возможные значения: килограммы или штуки
          required: true,
     },
     barcode: {
          type: Number,
          required: true,
     },
     saleDate: {
          type: Date,
          default: Date.now,
     },
});

module.exports = model("SotilganMaxsulot", SotilganMaxsulot);
