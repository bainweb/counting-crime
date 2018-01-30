const _ = require('lodash');
const Models = require('./Models');

module.exports = { save };

function save(data) {
  const promises = _.map(data, function(row) {
    return Models.Booking.findOne({
      bookingNumber: row.bookingNumber,
      department: row.department
    }).then(function(booking) {
      if (booking) { return Promise.resolve(); }
      console.log('New perp',row.firstName,row.lastName);
      return new Models.Booking(row).save();
    });
  });
  return Promise.all(promises);
}