var username;
var password;

$("#button").click(function(){
	username = $("#username").val();
		if($.isNumeric(username) == false){
		alert("User Name worng!");
		return;
	}
	password = $("#password").val();
	if($.isNumeric(password) == false){
		alert("Password worng!");
		return;
	}
	login();
});
function login(){
	$.ajax({
    type: "POST",
    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
    url: "http://arielexpert25.com/administration/php/adminLogin.php" ,

    data: {"username":username, "password":password},
    success : function(data) {
		alert(data); 
		if(data > 0){
		var win=window.open("http://arielexpert25.com/administration/manage_games.html","_blank");
		win.focus();
		}
		else{
			alert("username/password worng!");
		}
    }
});
}
