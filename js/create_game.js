var imagePath = "";
var videoUrl = "";
var hasVideo = false;
var currentQuestion;
var gameID;
var correctAnswer;
$questions=[];
$(window).load(function() {
    $('#myModal').modal('show');
});

$("#btn_modal_ok").click(function(){
    $("#btn_modal_ok").attr("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        url: "php/insertGame.php" ,

        data: { title: $("#game_title").val()},
        success : function(data) {
            if(data<0){
                alert("already in use");
            }else{
                $('#myModal').modal('hide');
                gameID = data;
            }
            $("#btn_modal_ok").attr("disabled", false);
           // getGame();
            $("#game_title_label").text();

        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#btn_modal_ok").attr("disabled", false);
        }
    });

});

$(".submit").click(function () {
    $answers = [$("#answer1").val(), $("#answer2").val(), $("#answer3").val(), $("#answer4").val()];

    correctAnswer = $(".btn_answer.correct_answer").attr("data-index");

    currentQuestion =  {
        "gameId": gameID, "bodyQuestion": $("#question_body").val(),
        "imagePath": imagePath, "videoUrl": videoUrl, "answers": $answers, "correctAnswer": correctAnswer
    };

    if( ! $('#fileToUpload').prop('files')) {
        uploadImage();
    }else{
        uploadToDB();
    }
    //alert(currentQuestion.game_name + currentQuestion.question_body + currentQuestion.imagePath + currentQuestion.videoUrl + currentQuestion.answers
    //    + currentQuestion.correct_answer);
});

$(".btn_tab").click(function () {

    toggleUploadMediaView();

});

$(".btn_answer").click(function(){
    $(".btn_answer").removeClass("correct_answer");
    $(".btn_answer").text("לא נכונה");
    $(this).addClass("correct_answer");
    $(this).text("נכונה");

});

function getGame(){
    $.ajax({
        type: "GET",
        data: { get_param: 'value', title: $("#game_title").val()  },
        dataType: 'json',
        url: "php/getGame.php" ,

        success : function(data) {
            $.each(data, function(index, element) {
                $('#questions_list').append($('<li>' + element.questionId + '</li>'));
                $answers = [element.answer1,element.answer2,element.answer3,element.answer4];
                $questions.add({ "gameId": element.gameId, "questionId":element.questionId ,"bodyQuestion": element.bodyQuestion,
                    "imagePath": element.imagePath, "videoUrl": element.videoUrl, "answers": $answers, "correctAnswer": element.correctAnswer});
            });

        },
        error: function (xhr, ajaxOptions, thrownError) {
            $('#questions_list').append($('<li>no games</li>'));
        }
    });
}

function uploadImage(){
    var file_data = $('#fileToUpload').prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    alert(form_data);
    $.ajax({
        url: 'php/uploadImage.php', // point to server-side PHP script
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(php_script_response){
           // alert(php_script_response); // display response from the PHP script, if any
            imagePath = "";
            currentQuestion =  {
                "gameId": gameID, "bodyQuestion": $("#question_body").val(),
                "imagePath": imagePath, "videoUrl": videoUrl, "answers": $answers, "correctAnswer": correctAnswer
            };

            uploadToDB(currentQuestion);
        }
    });
}

function setVideoUrl(videoID){
    videoUrl =  "https://www.youtube.com/watch?v=" + videoID;
    hasVideo = true;
}

function uploadToDB(){
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        url: "php/insertQuestion.php" ,

        data: { gameId: currentQuestion.gameId, bodyQuestion: currentQuestion.bodyQuestion, imagePath: currentQuestion.imagePath,
            videoUrl: currentQuestion.videoUrl, answer1: currentQuestion.answers[0], answer2: currentQuestion.answers[1],
            answer3: currentQuestion.answers[2],answer4: currentQuestion.answers[3],correctAnswer: currentQuestion.correctAnswer},
        success : function(data) {
           // alert(data);
            clearPage();
        }
    });
}

function clearPage(){
    imagePath = "";
    videoUrl = "";
    hasVideo = false;
    correctAnswer = 1;

    $("#question_body").text("");
    $("#answer1").val("");
    $("#answer2").val("");
    $("#answer3").val("");
    $("#answer4").val("");

    $(".btn_answer").removeClass("correct_answer");
    $(".btn_answer").text("לא נכונה");

    var a = '*[data-index='+correctAnswer+']';
    $(a).addClass("correct_answer");
    $(a).text("נכונה");


}

function toggleUploadMediaView() {
    if ($("#tab_image").css("display") == "none") {
        $("#tab_image").css("display", "inline");
        $("#tab_video").css("display", "none");

        $("#btn_tab_video").removeClass("active");
        $("#btn_tab_image").addClass("active");
    } else {
        $("#tab_image").css("display", "none");
        $("#tab_video").css("display", "inline");


        $("#btn_tab_video").addClass("active");
        $("#btn_tab_image").removeClass("active");

    }
}