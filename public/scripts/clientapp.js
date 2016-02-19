  var totSalary = 0;
  var empArray = [];
  var salary;
  var removedEmployee;
  var individualSalary;
  var monthlySalary;

  $(document).ready(function() {
    getData();
    $('.removeEmployee').hide();
    $('#employeeForm').on('submit', addEmployeeInfo);
    $('#totalSalaryButton').on('click', appendSalaryToDom);
    $('#container').on('click', '.removeEmployee', removeEmployee);
  });

  //Start all Functions
  ///client-server functions here

  function addEmployeeInfo() {
    event.preventDefault();
    var values = {};

    //serializeArray
    $.each($('#employeeForm').serializeArray(), function(i, field) {
      values[field.name] = field.value;
    });
    //clear the field
    clearInputs();

    $.ajax({
      type: 'POST',
      url: '/employee_info',
      data: values,
      success: function(data) {
        getData();
      }

    });

    //run some functions
    // appendDom(values);
    // adjSalary();
    // appendSalaryToDom();



    // return totSalary;
  }


  function removeEmployee() {
    var salaryToRemove = $(this).parent().data("salaryValue");
    salaryToRemove = salaryToRemove / 12;
    totSalary -= salaryToRemove;
    $('.totalSalary').text('Monthly salary cost: $ ' + totSalary);
    $(this).parent().remove();
    console.log(totSalary);
  }

  function appendSalaryToDom() {
    $('.totalSalary').text('Monthly salary cost: $ ' + totSalary);
  }

  function clearInputs() {
    $('#employeeForm').find('input[type=text]').val('');
  }

  function getData() {
    $.ajax({
      type: 'GET',
      url: '/employee_info',
      success: function(data) {
        console.log(data);
        appendDom(data);

      }
    });
  }

  function appendDom(empInfo) {
    for (var i = 0; i < empInfo.length; i++){
      salary = parseInt(empInfo[i].emp_salary);
      console.log(empInfo[i].emp_firstname + salary);


      $('#container').append('<div class="employeeList"></div>');
      var $el = $('#container').children().last();
      $el.append('<p>' + 'Name: ' + empInfo[i].emp_firstname + ' ' + empInfo[i].emp_lastname + ', ' +
        'ID Number: ' + empInfo[i].emp_idnumber + ', ' +
        'Job Title: ' + empInfo[i].emp_jobtitle + ', ' +
        'Salary: $' + salary + '</p>' +
        '<button class="removeEmployee"><h2> Remove Employee</h2></button>');

      $el.data("salaryValue", salary);
      this.individualSalary = $el.data("salaryValue");

    //check
    console.log(this.individualSalary);

    monthlySalary = Math.round(individualSalary / 12);
    console.log(empInfo[i].emp_firstname + 'monthly ' + monthlySalary);


/////////
    //calculate total salary
    totSalary += monthlySalary;
    console.log(totSalary);
    }
  }
