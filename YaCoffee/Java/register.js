function register() {
  var pass = document.getElementById("password").value;
  var repass = document.getElementById("repassword").value;

  if (pass == repass){//Send register information if password and re-entered password match
    var post = {
      username: document.getElementById("username").value,
      password: pass,
      name: document.getElementById("name").value
    };

    var xmlHttp = new XMLHttpRequest();
    //Set http packet to send
    xmlHttp.open("POST", '/auth/signup', true ); // false for synchronous request, using false with GET
    xmlHttp.setRequestHeader("Content-type", "application/json");
    xmlHttp.send(JSON.stringify(post));
    //Proccess reponse from html

    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.status == 200) {
        var res = JSON.parse(xmlHttp.responseText);
        if (res.state == "success") {
  				var xmlHttp2 = new XMLHttpRequest();
  				 //Set http packet to send
  				xmlHttp2.open("GET", '/auth/profile', true );
  				xmlHttp2.send();
  				xmlHttp2.onreadystatechange = function(){
  				 	if (xmlHttp2.status == 200) {
  				 		var res = JSON.parse(xmlHttp2.responseText);
  				 		sessionStorage.setItem('user',JSON.stringify(res.user));
  				 		var a = sessionStorage.getItem('user');
  				 		console.log(a);
  				 	}
  				 }
  				window.alert('success');
          window.location.replace("/");
  			} else {
  				window.alert(res.message);
  			}
      }
    }

  } else {
    //Delete text and require user to enter password again
    document.getElementById("password").value = "";
    document.getElementById("repassword").value = "";
  }

}
