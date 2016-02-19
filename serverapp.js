var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var employeeInfo = require('./routes/employee_info');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//bring in employee info route
app.use('/employee_info', employeeInfo);

app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Marshmallows toasting on port: ', app.get('port'));
});
