module.exports = { fetch };

const _ = require('lodash');
const fs = require('q-io/fs');
const mkdirp = require('mkdirp-promise');
const wget = require('node-wget-promise');

const Config = require('./Config');
const Models = require('./Models');

// fetch and store up to [limit] mugshots 
function fetch(limit) {

  return findBookings().then(fetchAndSave);

  function findBookings() {
    return Models.Booking.find({img: null}).limit(limit || 1);
  }

  function fetchAndSave(bookings) {
    return Promise.all(_.map(bookings, fetchOneAndSave));
  }

  function fetchOneAndSave(booking) {
    const filename = booking._id + '.' + booking.imgUrl.replace(/.*\./,'');
    const url = '/img/mugs/' + booking.department + '/';
    const dir = Config.path.static + url;


    return mkdirp(dir).then(() => {
      return wget(
        booking.imgUrl,
        { output: dir + filename }
      );
    }).then(function() {
      booking.img = url + filename;
      return booking.save();
    }).then(() => { console.log(booking.img); });
  }
}