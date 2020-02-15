
const contractSource = `
contract CanetoAE =
  
  //Payrent data 
  record payrent =
    { tenantAddress : address,
      firstname    : string,
      surname      : string,
      amount       : int, 
      mobile       : int,
      email        : string,
      apartment    : string
    }
      
  record state =
    { payrents       : map(int, payrent),
      payrentsLength : int }
      
  entrypoint init() =
    { payrents = {},
      payrentsLength = 0 }

   
  entrypoint getPayrent(payrentId: int) : payrent = 
    state.payrents[payrentId]
      
  entrypoint getPayrents(index : int) : payrent =
    switch(Map.lookup(index, state.payrents))
      None    => abort("There was no rent paid.")
      Some(x) => x
      
  payable stateful entrypoint registerPayrent(firstname' : string, surname' : string, amount' : int, mobile' : int,
                                              email' : string, apartment': string) =
    Chain.spend(ak_2bKhoFWgQ9os4x8CaeDTHZRGzUcSwcXYUrM12gZHKTdyreGRgG,Call.value)
    let payrent = { tenantAddress = Call.caller, firstname = firstname',
                                                surname   = surname',
                                                amount    = amount',
                                                mobile    = mobile',
                                                email     = email',
                                                apartment = apartment'
                  }
    let index = getPayrentsLength() + 1
    put(state{ payrents[index] = payrent, payrentsLength = index })
    
  entrypoint getPayrentsLength() : int =
    state.payrentsLength
`;

const contractAddress = 'ct_RjDYEWVrcUfoSS2iujhMEWJTwji1rEx2WD3Cd3MKA94Qhmy8M';
var client = null;
var total = 0;

async function contractCall(func, args, value) {
  const contract = await client.getContractInstance(contractSource, {contractAddress});
  const calledSet = await contract.call(func, args, {amount: value}).catch(e => console.error(e));
  return calledSet;
}
  
//JQuery Register process
$("#register-submit").click(function (e) {
e.preventDefault();


client = await Ae.Aepp();
  await contractCall('register-submit',[ amount], amount*1000000000000000000);


var hasError = false;

//Checking if firstname is entered
var firstname = $("#firstname").val();
if(firstname === '') {
    $("label[for='firstname']").empty().append("Please enter a first name.");
    $("#firstname").focus();
  hasError = true;
    return false;
} else {
    $("label[for='firstname']").empty().append("All good!");
    $("label[for='firstname1']").empty().append('<h3>' + firstname + '</h3>');

}

//Checking if surname is entered
var surname = $("#surname").val();
if(surname === '') {
    $("label[for='surname']").empty().append("Please enter a surname.");
    $("#surname").focus();
  hasError = true;
    return false;
} else {
    $("label[for='surname']").empty().append("All good!");
    $("label[for='surname1']").empty().append('<h3>' + surname + '</h3>');
    
}


//Checking if amount is entered
var amount = $("#amount").val();
if(amount === '') {
    $("label[for='amount']").empty().append("Please enter rent amount.");
    $("#amount").focus();
  hasError = true;
    return false;
} else {
    $("label[for='amount']").empty().append("All good!");
    $("label[for='amount1']").empty().append('<h3>' + amount + '</h3>');
    
}

  //Checking if amount contains at least numbers
var numbers = new RegExp('[0-9]');

amount = $("#amount").val();
if(amount.match(numbers)) {
    $("label[for='amount']").empty().append("All good!");
} else {

    $("label[for='amount']").empty().append("Amount must contain only numbers,<br>Please try again.");
    $("#amount").focus();
  hasError  = true;
  return false;
}


//Checking if mobile number is entered
var amount = $("#mobile").val();
if(amount === '') {
    $("label[for='mobile']").empty().append("Please enter mobile number.");
    $("#mobile").focus();
  hasError = true;
    return false;
} else {
    $("label[for='mobile']").empty().append("All good!");
    
    
}

//Checking if mobile contains at least numbers
var numbers = new RegExp('[0-9]');

mobile = $("#mobile").val();
if(mobile.match(numbers)) {
    $("label[for='mobile']").empty().append("All good!");
    $("label[for='mobile1']").empty().append('<h3>' + mobile + '</h3>');
} else {

    $("label[for='mobile']").empty().append("Mobile must contain only numbers,<br>Please try again.");
    $("#mobile").focus();
  hasError  = true;
  return false;
}

//Checking if email is entered
var email = $("#email").val();
if(email === '') {
    $("label[for='email']").empty().append("Please enter an email address.");
    $("#email").focus();
  hasError = true;
    return false;
} else {
    $("label[for='email']").empty().append("All good!");
    $("label[for='email1']").empty().append('<h3>' + email + '</h3>');
    
}

//Checking if apartment-id is entered
var apartment = $("#apartment-id").val();
if(apartment === '') {
    $("label[for='apartment-id']").empty().append("Please enter Apartment-Id.");
    $("#apartment-id").focus();
  hasError  = true;
  return false;
} else {
    $("label[for='apartment-id']").empty().append("All good!");
    
}

//Checking if apartment-id is more than 6 characters long
apartment = $("#apartment-id").val();
if (apartment.length < 8) {
    $("label[for='apartment-id']").empty().append("Apartment-Id must be at least 8 characters long. Please try again.");
    $("#apartment-id").focus();
  hasError  = true;
  return false;
} else {
    $("label[for='apartment-id']").empty().append("All good!");
    
}


//Checking if apartment-id contains at least one number, one lowercase and one uppercase letter
var upperCase= new RegExp('[A-Z]');
var lowerCase= new RegExp('[a-z]');
var numbers = new RegExp('[0-9]');

apartment = $("#apartment-id").val();
if(apartment.match(upperCase) && apartment.match(lowerCase) && apartment.match(numbers)) {
    $("label[for='apartment-id']").empty().append("All good!");
    $("label[for='apartment-id1']").empty().append('<h3>' + apartment + '</h3>');
} else {

    $("label[for='apartment-id']").empty().append("Apartment-Id must contain at least one number,<br>one lowercase and one uppercase letter. Please try again.");
    $("#apartment-id").focus();
  hasError  = true;
  return false;
}


if(hasError == false){
jQuery.ajax({
type: "POST",


//All Data posted
data:'register_firstname=' + firstname +
      '&register_amount='  + amount +
      '&register_surname='  + surname +
      '&register_mobile='   + mobile +
      '&register_email='    + email +
      '&register_apartment=' + apartment ,


});
}
return true;
});



