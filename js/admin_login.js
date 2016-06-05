var username;
var password;

$(document).ready(function() {
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
    
});

function login(){
	$.ajax({
    type: "POST",
    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
    url: "php/adminLogin.php" ,

    data: {"username":username, "password":password},
    success : function(data) {
		// alert(data); 
		if(data > 0){
            window.location = "manage_games.html";
		}
		else{
			alert("username/password worng!");
		}
    }
});
}
