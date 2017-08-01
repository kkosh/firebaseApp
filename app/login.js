var username;
var password;
var firstname;
var lastname;
var email;
var arrData = [];
var flag = true;


function validation() {

  error = document.querySelectorAll('[divError]');
	var inputCheck = document.querySelectorAll('input');
	if(error.length > 0)	{
	for(var j = 0;j< error.length; j++){
	error[j].remove();
	}
   }

  for(var i = 0; i<inputCheck.length; i++) {
	if(inputCheck[i].value == ''){
	var erroMsg = '<span divError>Please enter value</span>';
	inputCheck[i].insertAdjacentHTML('afterend', erroMsg);
	}
  }

  if(error.length>0) {
      return false;
    } else {
      return true;
    }
}


window.onload = function() {

    var firebaseData = firebase.database().ref().child("login");
    firebaseData.on('value', function(receiveData) {
    arrData =  JSON.parse(receiveData.val());
    html = "<table><thead><th>Username</th><th>Password</th><th>Firstname</th><th>Lastname</th><th>Email</th><tbody>";

    for(var i = 0; i < arrData.length; i++){
	html += "<tr>";
	html += "<td>" + arrData[i].username + "</td>";
	html += "<td>" + arrData[i].password + "</td>";
	html += "<td>" + arrData[i].firstname + "</td>";
	html += "<td>" + arrData[i].lastname + "</td>";
	html += "<td>" + arrData[i].email + "</td>";
	html += "</tr>";
   	}
    html += "</tbody><table>";
   	document.getElementById("output").innerHTML = html;
    });
};


function createObject(oUsername,oPassword, oFirstname, oLastname, oEmail ) {
	this.username = oUsername;
	this.password = oPassword;
	this.firstname = oFirstname;
	this.lastname = oLastname;
	this.email = oEmail;
}


document.getElementById('btnSub').onclick = function() {

  if(!validation()){
	username = document.getElementById('txtUsername').value;
	password = document.getElementById('pwd').value;
	firstname = document.getElementById('txtFirstname').value;
	lastname = document.getElementById('txtLastname').value;
	email = document.getElementById('txtEmail').value;

	if (username !== '' && password !== '' && firstname !== '' && lastname !== ''&& email !== '') {
	  arrData[arrData.length] = new createObject(username,password, firstname, lastname, email);
	  var firebaseRef = firebase.database().ref();
	  firebaseRef.child("login").set(JSON.stringify(arrData));
    }

  html = "<table><thead><th>Username</th><th>Password</th><th>Firstname</th><th>Lastname</th><th>Email</th><tbody>";

  for(var i = 0; i < arrData.length; i++){
	html += "<tr>";
	html += "<td>" + arrData[i].username + "</td>";
	html += "<td>" + arrData[i].password + "</td>";
	html += "<td>" + arrData[i].firstname + "</td>";
	html += "<td>" + arrData[i].lastname + "</td>";
	html += "<td>" + arrData[i].email + "</td>";
	html += "</tr>";
   }
   html += "</tbody><table>";
   document.getElementById("output").innerHTML = html;
   }
}
