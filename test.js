var insertGameAjax = function() {
   var title = $("#name").val();
   $.get( "insertGame.php?title="+title, function( data ) {
       alert(data);
   }); 
}

var insertQuestionAjax = function() {    
    $.ajax( {
       type: "post",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        url:"insertQuestion.php",
        data: {"gameId":1000,
                "bodyQuestion":"who is the man?",
                "imagePath":"image.jpg",
                "videoUrl":"www.video.com",
                "answer1":"yossi",
                "answer2":"moshe",
                "answer3":"shira",
                "answer4":"noa",
                "correctAnswer":3},
        success: function( data ) {
            alert(data); 
        },
        error: function( data ) {
            alert( data );
        }
    });
}