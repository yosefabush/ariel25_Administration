var imagePath = "";
var videoUrl = "";
var hasVideo = false;
var question;
var gameID;
var correctAnswer;
$(window).load(function() {
    $('#myModal').modal('show');
});


$("#btn_modal_ok").click(function(){
    $("#btn_modal_ok").attr("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        url: "http://arielexpert25.com/administration/php/insertGame.php" ,

        data: { title: $("#game_title").val()},
        success : function(data) {
            if(data<0){
                alert("already in use");
            }else{
                $('#myModal').modal('hide');
                gameID = data;
            }
            $("#btn_modal_ok").attr("disabled", false);

        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#btn_modal_ok").attr("disabled", false);
        }
    });

});


$(".submit").click(function () {
    $answers = [$("#answer1").val(), $("#answer2").val(), $("#answer3").val(), $("#answer4").val()];

    correctAnswer = $(".btn_answer.correct_answer").attr("data-index");

    question =  {
        "gameId": gameID, "bodyQuestion": $("#question_body").val(),
        "imagePath": imagePath, "videoUrl": videoUrl, "answers": $answers, "correctAnswer": correctAnswer
    };

    if( ! $('#fileToUpload').prop('files')) {
        uploadImage();
    }else{
        uploadToDB();
    }
    //alert(question.game_name + question.question_body + question.imagePath + question.videoUrl + question.answers
    //    + question.correct_answer);
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

function uploadImage(){
    var file_data = $('#fileToUpload').prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    alert(form_data);
    $.ajax({
        url: 'http:arielexpert25.com/administration/php/uploadImage.php', // point to server-side PHP script
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(php_script_response){
           // alert(php_script_response); // display response from the PHP script, if any
            imagePath = "";
            question =  {
                "gameId": gameID, "bodyQuestion": $("#question_body").val(),
                "imagePath": imagePath, "videoUrl": videoUrl, "answers": $answers, "correctAnswer": correctAnswer
            };

            uploadToDB(question);
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
        url: "http://arielexpert25.com/administration/php/insertQuestion.php" ,

        data: { gameId: question.gameId, bodyQuestion: question.bodyQuestion, imagePath: question.imagePath,
            videoUrl: question.videoUrl, answer1: question.answers[0], answer2: question.answers[1],
            answer3: question.answers[2],answer4: question.answers[3],correctAnswer: question.correctAnswer},
        success : function(data) {
            alert(data);
        }
    });
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