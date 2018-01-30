/*
https://github.com/sleepokay/average_faces
https://cmusatyalab.github.io/openface/
 */

// 3rd party modules
require('console-decor')();
const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const sass = require('node-sass-middleware');
const schedule = require('node-schedule');

// custom modules
const Config = require('./common/Config');
const Mugshots = require('./common/Mugshots');

// department specific crawlers
const AustinPolice = require('./departments/AustinPolice');

mongoose.Promise = global.Promise;
mongoose.connect(Config.mongo.uri, Config.mongo.options);

AustinPolice.fetchAndSave();
Mugshots.fetch();
schedule.scheduleJob('1 * * * *', AustinPolice.fetchAndSave);
schedule.scheduleJob('* * * * *', Mugshots.fetch);

const app = express();
const port = process.argv[2] || 8000;

app.set('view engine', 'pug');

app.use('/css', sass({
  src: __dirname + '/sass',
  dest: __dirname + '/static/css',
  debug: true,
  outputStyle: 'compressed'
}));

app.use(express.static(__dirname + '/static'));

app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res) {
  res.render('index');
});

app.listen(port);
