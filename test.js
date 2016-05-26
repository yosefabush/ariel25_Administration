var adminLoginAjax = function() {
    var user = $("#user").val();
    var pass = $("#pass").val();
    
    $.ajax( {
       type: "post",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        url:"adminLogin.php",
        data: {"username": user,
               "password": pass},
        success: function( data ) {
            alert(data); 
        },
        error: function( data ) {
            alert(data); 
        }
    });
    
}

var insertGameAjax = function() {
   var title = $("#name").val();
   $.get( "insertGame.php?title="+title, function( data ) {
       alert(data);
   }); 
}

var updateQuestionAjax = function() {    
    $.ajax( {
       type: "post",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        url:"updateQuestion.php",
        data: {"questionId":1,
               "gameId":1000,
                "bodyQuestion":"שאלה!",
                "imagePath":"image.jpg",
                "videoUrl":"www.video.com",
                "answer1":"נכון",
                "answer2":"לא נכון",
                "answer3":"אולי",
                "answer4":"בטוח",
                "correctAnswer":3},
        success: function( data ) {
            alert($.parseJSON(data)); 
        },
        error: function( data ) {
            alert($.parseJSON(data)); 
        }
    });
}

var insertQuestionAjax = function() {    
    $.ajax( {
       type: "post",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        url:"insertQuestion.php",
        data: {"gameId":1000,
                "bodyQuestion":"עעע",
                "imagePath":"image.jpg",
                "videoUrl":"www.video.com",
                "answer1":"yossi",
                "answer2":"moshe",
                "answer3":"shira",
                "answer4":"noa",
                "correctAnswer":3},
        success: function( data ) {
            alert($.parseJSON(data)); 
        },
        error: function( data ) {
            alert($.parseJSON(data)); 
        }
    });
}