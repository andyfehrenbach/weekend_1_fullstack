var salaryTotal = 0.00;
var empArray = [];



function appendDom(empInfo) {
  salary = parseFloat(empInfo.empSalary);

  $('#container').append('<div></div>');
  var $el = $('#container').children().last();
  $el.append('<p>' + 'Name: ' + empInfo.empFullName + ', ' +
    'ID Number: ' + empInfo.empIdNumber + ', ' +
    'Job Title: ' + empInfo.empTitle + ', ' +
    'Salary: $' + individualSalaries + '</p>' +
    '<button class="removeEmployee" data-id="' +
    (empArray.length - 1) + '"> Remove Me </button>');
}

function updateSalary(salary) {

  $('#salaryAmount').text('$ ' + salary);
}

$('#container').on('click', '.removeEmployee', function() {

  var index = $(this).data();
  var employee = empArray[index];

  salaryTotal -= Math.round(employee.empSalary) / 12);

console.log(employee);
});



$('#employeeForm').on('submit', function(event) {
  event.preventDefault();

  var values = {};

  $.each($('#employeeForm').serializeArray(), function(i, field) {
    values[field.name] = field.value;
  });

  salayTotal += parseFloat(values.empSalary);
  values.empSalary = parseFloat(values.empSalary)

  empArray.push(values);
  console.log('Employees: '
    empArray);


  $('#employeeForm').find('input[type=text]').val('');
  $('empFullName').focus();

  appendDom(values);
  updateSalary(values);


});

$('#container').on('click', '.removeEmployee', function() {
  $(this).parent.remove();
});
