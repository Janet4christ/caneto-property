
const contractSource = `
contract AeCommerce =
  
  record purchase =
    { buyerAddress : address,
      amount       : int }
      
  record state =
    { purchases       : map(int, purchase),
      purchasesLength : int }
      
  entrypoint init() =
    { purchases = {},
      purchasesLength = 0 }
      
  entrypoint getPurchase(index : int) : purchase =
    switch(Map.lookup(index, state.purchases))
      None    => abort("There was no purchase with this index registered.")
      Some(x) => x
      
  payable stateful entrypoint registerPurchase(amount' : int) =
    Chain.spend(ak_2bKhoFWgQ9os4x8CaeDTHZRGzUcSwcXYUrM12gZHKTdyreGRgG,Call.value)
    let purchase = { buyerAddress = Call.caller, amount = amount'}
    let index = getPurchasesLength() + 1
    put(state{ purchases[index] = purchase, purchasesLength = index })
    
  entrypoint getPurchasesLength() : int =
    state.purchasesLength
`;

const contractAddress = 'ct_s3komLvSKPyWBMB5uMnMEGk2rNaB2AVfcbb6dHMYaEurV5qUC';
var client = null;
var total = 0;

async function contractCall(func, args, value) {
  const contract = await client.getContractInstance(contractSource, {contractAddress});
  const calledSet = await contract.call(func, args, {amount: value}).catch(e => console.error(e));
  return calledSet;
}
      //On load actions
      $(document).ready(function () {
          //Initialize select2
          window.setTimeout(function(){ $('#modal-info').modal('show'); }, 1000);
      });
  
     //Register process
      $("#register-submit").click(function (e) {
      e.preventDefault();
  
     var hasError = false;
  
      //Checking if firstname is inputted
      var firstname = $("#firstname").val();
     if(firstname === '') {
          $("label[for='firstname']").empty().append("Please enter a first name.");
          $("label[for='firstname']").removeClass("feedback-success");
          $("#firstname").focus();
        hasError = true;
          return false;
      } else {
          $("label[for='firstname']").empty().append("All good!");
          $("label[for='firstname1']").empty().append('<h3>' + firstname + '</h3>');

     }
  
      //Checking if surname is inputted
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


      //Checking if amount is inputted
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

        //Checking if amount contains at least one numbers
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


     //Checking if mobile is inputted
     var amount = $("#mobile").val();
     if(amount === '') {
         $("label[for='mobile']").empty().append("Please enter mobile number.");
         $("#mobile").focus();
       hasError = true;
         return false;
     } else {
         $("label[for='mobile']").empty().append("All good!");
         
         
     }

      //Checking if mobile contains at least one numbers
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
    
      //Checking if email is inputted
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
  
      //Checking if apartment-id is inputted
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
  
      //If there are no errors, initialize the Ajax call
      if(hasError == false){
      jQuery.ajax({
     type: "POST",
  
      //URL to POST data to
     url: "",
  
      //Data posted
      data:'register_firstname=' + firstname +
           '&register_amount='  + amount +
           '&register_surname='  + surname +
           '&register_gender='   + mobile +
           '&register_email='    + email +
           '&register_password=' + apartment ,
  
      //If action completed, do the following
      success:function(){
          $("#error").hide();
        $("#hide").hide();
          $("#FormSubmit").hide();
        $("#register-submit").hide();
          $("#myModal").show();
        $("#success").append('');
        $("#success-button").show();
      },
  
      //If action failed, do the following
      error:function (xhr, ajaxOptions, thrownError){
          $("#success").hide();
          $("#error").show();
          $("#error").empty().append(thrownError);
      }
     });
      }
     return true;
     });



