//Global Variables

//default values
let loans = [
    { loan_year: 2020, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2021, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2022, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2023, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2024, loan_amount: 10000.00, loan_int_rate: 0.0453 }
]; 
//loan accumulator var
let loanWithInterest = 0;
//accumulated interest
let int = 0;
//array displaying each year's payments, interest, and yearly balance
let payments;

// ===== FUNCTIONS =====

// ----- Plain JavaScript Functions -----

// -------------------------------------------------------
function toComma(value) {
  //add commas, 100000 = 100,000
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// -------------------------------------------------------
let toMoney = (value) => {
  //only allow 2 demical points, first dollar sign is escaped with backslash so $ goes through,
  //second $ is the start of a template literal
  return `\$${toComma(value.toFixed(2))}`; 
}

// -------------------------------------------------------
let saveForm = () => {
  //save entered data to local storage
  localStorage.setItem(`as06`, JSON.stringify(loans));
}

// -------------------------------------------------------
let loadForm = () => {
  //load entered data from local storage
  if(localStorage.getItem(`as06`) != null){
    //if data was saved
     loans = JSON.parse(localStorage.getItem(`as06`));
    //update form function
     updateForm();
  } else {
    //if no data was saved
     alert(`Error: no saved values`);
  }
}

// ----- JQUERY Functions -----

// -------------------------------------------------------
// display the entry form
function loadDoc() {
    
  // pre-fill defaults for first loan year
  var defaultYear = loans[0].loan_year;
  $("#loan_year0" + 1).val(defaultYear++);
  var defaultLoanAmount = loans[0].loan_amount;
  $("#loan_amt0" + 1).val(defaultLoanAmount.toFixed(2));
  var defaultInterestRate = loans[0].loan_int_rate;
  $("#loan_int0" + 1).val(defaultInterestRate);
  var loanWithInterest 
    = loans[0].loan_amount * (1 + loans[0].loan_int_rate);
  $("#loan_bal0" + 1).text(toMoney(loanWithInterest));
    
  // pre-fill defaults for other loan years
  for(var i=2; i<6; i++) {
    $(`#loan_year0${i}`).val(defaultYear++);
    $(`#loan_year0${i}`).attr("disabled","true");
    $(`#loan_year0${i}`).css({
      "backgroundColor":"grey","color":"white"
    });
    $(`#loan_amt0${i}`).val(defaultLoanAmount.toFixed(2));
    $(`#loan_int0${i}`).val(defaultInterestRate);
    $(`#loan_int0${i}`).attr("disabled","true");
    $(`#loan_int0${i}`).css({
      "backgroundColor":"grey","color":"white"
    });
    loanWithInterest 
      = (loanWithInterest + defaultLoanAmount) 
      * (1 + defaultInterestRate);
    $("#loan_bal0" + i).text(toMoney(loanWithInterest));
  } // end: "for" loop
    
  $("input[type=text]").focus(function() {
    $(this).select();
    $(this).css("background-color", "yellow");
  }); 
  $("input[type=text]").blur(function() {
    $(this).css("background-color", "white");
    updateLoansArray();
  });
    
  // set focus to first year: messes up codepen
  $("#loan_year01").focus();

} // end: function loadDoc()

// -------------------------------------------------------
function updateLoansArray() {
  
  // regex tester web site: https://www.regexpal.com/
  //accepts int years from 1900 to 2099
  //cannot begin with zero
  let yearP = /^(19|20)\d{2}$/;
  //accepts digits as well as 2 digits for decimals.
  //cannot begin with zero, if there is a period, must have 1-2 digits too
  let amtP = /^([1-9][0-9]*)+(.[0-9]{1,2})?$/;
  //accepts ints with more than one digit but no more than six
  //when followed by period, voids above condition
  //accepts "0." followed by up to 5 digits
  let intP = /^(0|)+(.[0-9]{1,5})?$/;

  //assume input is valid
  let valid = true;
  //if input is not numeric, make valid false and change input box bg to red
  if(!yearP.test($(`#loan_year01`).val())){
    valid = false;
    $(`#loan_year01`).css("background-color", "red");
  }
  for (i = 1; i < 6; i++) {
    if(!amtP.test($(`#loan_amt0${i}`).val())) {
      valid = false;
      $(`#loan_amt0${i}`).css("background-color", "red");
    } 
  }
  if(!intP.test($(`#loan_int01`).val())) {
    valid = false;
    $(`#loan_int01`).css("background-color", "red");
  }

  //if data is checked and valid
  if(valid) {

    //take valid numeric input and store it
    loans[0].loan_year = parseInt($("#loan_year01").val());
    for(var i=1; i<5; i++) {
      loans[i].loan_year = loans[0].loan_year + i;
    }
    for(i = 1; i<6; i++){
      let amt = parseFloat($(`#loan_amt0${i}`).val()).toFixed(2);
      loans[i-1].loan_amount = amt;
    }
    let rate = parseFloat($("#loan_int01").val());
    for(i=0; i<5; i++){
      loans[i].loan_int_rate = rate;
    }
    
    updateForm();
    
  } // end: if
  
} // end: function updateLoansArray()

// -------------------------------------------------------
let updateForm = () => {
  //refreshes loan information on the table
  loanWithInterest = 0;
  let totalAmt = 0;
  for(i = 1; i < 6; i++) {
    $(`#loan_year0${i}`).val(loans[i - 1].loan_year);
    let amt = loans[i - 1].loan_amount;
    $(`#loan_amt0${i}`).val(amt);
    totalAmt += parseFloat(amt);
    $(`#loan_int0${i}`).val(loans[i - 1].loan_int_rate);
    loanWithInterest 
      = (loanWithInterest + parseFloat(amt)) 
      * (1 + loans[0].loan_int_rate);
    $("#loan_bal0" + i).text(toMoney(loanWithInterest));
  }
  int = loanWithInterest - totalAmt;
  $(`#loan_int_accrued`).text(toMoney(int));
  
} // end: function updateForm()
  

// ----- ANGULAR -----

//when recalculate is clicked $scope.populate() updates $scope.payments
//angular then updates expressions in {{}}
var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
  $scope.payments = [];
  $scope.populate = function () {
    
    updateForm();
    
    let total = loanWithInterest;
    let iRate = loans[0].loan_int_rate;
    let r = iRate / 12;
    let n = 11;
    //loan payment formula
    //https://www.thebalance.com/loan-payment-calculations-315564
    let pay = 12 * (total / ((((1+r)**(n*12))-1)/(r *(1+r)**(n*12))));
    for (let i = 0; i < 10; i++) {
      total -= pay 
      let int = total * (iRate); 
      $scope.payments[i] = {
        "year":loans[4].loan_year + i + 1,
        "payment": toMoney(pay), 
        "amt": toMoney(int),
        "ye": toMoney(total += int)
      }
    }
    $scope.payments[10] = {
      "year":loans[4].loan_year + 11,
      "payment": toMoney(total),
      "amt": toMoney(0),
      "ye":toMoney(0)
    }
  }
});
