window.fbAsyncInit = function() {
	FB.init({
		appId			: '1782878718649718',
		xfbml			: true,
		version		: 'v2.8'
	});
	FB.AppEvents.logPageView();
};

(function(d, s, id){
	 var js, fjs = d.getElementsByTagName(s)[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement(s); js.id = id;
	 js.src = "//connect.facebook.net/en_US/sdk.js";
	 fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.	See statusChangeCallback() for when this call is made.
function testAPI() {
	console.log('Welcome!	Fetching your information.... ');
	FB.api('/me', function(response) {
		console.log('Successful login for: ' + response.name);
		console.log('response: '  + JSON.parse(JSON.stringify(response)))
		document.getElementById('status').innerHTML =
			'Thanks for logging in, ' + response.name + '!';
	});
}

function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		testAPI();
	} else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.
		document.getElementById('status').innerHTML = 'Please log ' +
			'into this app.';
	} else {
		// The person is not logged into Facebook, so we're not sure if
		// they are logged into this app or not.
		document.getElementById('status').innerHTML = 'Please log ' +
			'into Facebook.';
	}
}

function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
		console.log(response.status);
	});

}

function SubmitLogin(){
	var uname = document.getElementById("uname").value;
  var pass = document.getElementById("psw").value;

  var post = {
  	username: uname,
    password: pass,
  };

  var xmlHttp = new XMLHttpRequest();
  //Set http packet to send
  xmlHttp.open("POST", '/auth/login', true ); // false for synchronous request, using false with GET
  xmlHttp.setRequestHeader("Content-type", "application/json");
  xmlHttp.send(JSON.stringify(post));
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.status == 200) {
			var res2 = JSON.parse(xmlHttp.responseText);
			if (res2.state == "success") {
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
				if (res2.manager == true) window.location.href = "/manager";
				else window.location.href = "/";
			} else {
				window.alert(res.message);
			}
		}
	}
}
