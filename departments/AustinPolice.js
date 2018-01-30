const _ = require('lodash');
const Bookings = require('../common/Bookings');
const nodeFetch = require('node-fetch');
const moment = require('moment');

module.exports = { fetchAndSave };

function fetchAndSave() {
  return fetch().then(Bookings.save);
}

function fetch() {
  const url = 'http://www.ci.austin.tx.us/police/mug_shots/createexport.cfm?st=byPerson&last_name=&first_name=&booking_number=&booking_date=&booking_date_end=&submit=Submit';
  const options = {
    headers: {
      'Cookie': 'MUG_SHOT_ACK=true'
    }
  };
  
  return nodeFetch(url, options).then(
    res => res.text()
  ).then(raw => {
    const data = [];
    _.each(raw.split('\r\n'), (row, i) => {
      if (!row || !i) { return; }
      row = row.split(',');
      row = _.zipObject(
        ['id','lastName','firstName','bookingNumber','bookingDate','charge','imgUrl'],
        row
      );
      row.department = 'Austin Police';
      row.bookingDate = moment(row.bookingDate, 'MM/DD/YYYY');
      data.push(row);
    });
    console.log(data.length, 'found in Austin Police');
    return Promise.resolve(data);
  }).catch(
    console.error
  );
}