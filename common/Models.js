module.exports = (function () {
  const mongoose = require('mongoose');

  const schemas = {
    Booking: mongoose.Schema({
      id: { type: String },
      firstName: { type: String },
      lastName: { type: String},
      bookingNumber: { type: String },
      bookingDate: { type: Date },
      charge: { type: String },
      imgUrl: { type: String }, // [poorly named] url for the original mugshotimage
      img: { type: String }, // [poorly named] url for the local copy of the mugshot image
      department: { type: String, enum: ['Austin Police'] }
    })
  };

  const models = {
    Booking: mongoose.model('Booking', schemas.Booking)
  };

  return models;
})();

