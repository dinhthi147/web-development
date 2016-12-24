function SubmitUpdateInfo(){
	var displayName = document.getElementById("displayName").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var address = document.getElementById("address").value;

  var post = {
  	name: displayName,
    email: email,
    phone: phone,
    address: address
  };

  var xmlHttp = new XMLHttpRequest();
  //Set http packet to send
  xmlHttp.open("POST", '/auth/updateUserInfo', true ); // false for synchronous request, using false with GET
  xmlHttp.setRequestHeader("Content-type", "application/json");
  xmlHttp.send(JSON.stringify(post));
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.status == 200) {
			var res = JSON.parse(xmlHttp.responseText);
			if (res.message == "success") {
				var xmlHttp2 = new XMLHttpRequest();
				 //Set http packet to send
				xmlHttp2.open("GET", '/auth/profile', true );
				xmlHttp2.send();
				xmlHttp2.onreadystatechange = function(){
				 	if (xmlHttp2.status == 200) {
				 		var res = JSON.parse(xmlHttp2.responseText);
						sessionStorage.removeItem('user');
				 		sessionStorage.setItem('user',JSON.stringify(res.user));
				 	}
				 }
				window.alert('success');
			} else {
				window.alert('failure');
			}
		}
	}
}

window.onload = function(){
	var xmlHttp = new XMLHttpRequest();
	 //Set http packet to send
	xmlHttp.open("GET", '/auth/profile', true );
	xmlHttp.send();
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.status == 200) {
			var res = JSON.parse(xmlHttp.responseText);
			var data = JSON.parse(JSON.stringify(res.user));
			document.getElementById("displayName").value = data.displayName;
			document.getElementById("email").value = data.email;
			document.getElementById("phone").value = data.phone;
			document.getElementById("address").value = data.address;
		}
	 }
}
