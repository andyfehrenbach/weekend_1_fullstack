var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var connectionString = '';

if (process.env.DATABASE_URL !== undefined) {
  connectionString = process.env.DATABASE_URL + 'ssl'; //<---required for heroku
} else {
  connectionString = 'postgres://localhost:5432/weekend_1_fullstack'; //<--end of path is the name of the database.
}


router.post('/', function(req, res) {
  var addEmployee = {
    emp_firstname: req.body.empFirstName,
    emp_lastname: req.body.empLastName,
    emp_idnumber: req.body.empIdNumber,
    emp_jobtitle: req.body.empJobTitle,
    emp_salary: req.body.empSalary
  };

  pg.connect(connectionString, function(err, client) {
    client.query('INSERT INTO employees (emp_firstname, emp_lastname, emp_idnumber, emp_jobtitle, emp_salary) VALUES ($1, $2, $3, $4, $5) RETURNING id',
    [addEmployee.emp_firstname, addEmployee.emp_lastname, addEmployee.emp_idnumber, addEmployee.emp_jobtitle, addEmployee.emp_salary],
      function(err, result, done) {
        if (err) {
          console.log('error inserting data: ', err);
          res.send(false);
        } else {
          res.send(result);
        }
      });
  });
});

router.get('/', function(req, res) {
  var results = [];
    pg.connect(connectionString, function (err,client, done){
        var query = client.query ('SELECT * FROM employees;');

        query.on('row', function (row){
          console.log(row);
            results.push(row);
            console.log(results);
        });

        query.on ('end', function () {
           client.end();
            return res.json(results);
        });

        if (err) {
            console.log(err);
        }
    });
    console.log(results);
});

module.exports = router;
