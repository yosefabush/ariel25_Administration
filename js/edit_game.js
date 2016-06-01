var imagePath = "";
var videoUrl = "";
var hasVideo = false;
var question;
var gameID;
var gameTitle;
var correctAnswer;
var questions=[];

$(window).load(function() {
    gameTitle = $.urlParam("title");
    getGame();
});

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};

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

$("#questions_list").change(function() {
    fillPage(questions[$("#questions_list").index()]);
});

function getGame(){
    $.ajax({
        type: "GET",
        data: { get_param: 'value', title: gameTitle  },
        dataType: 'json',
        url: "http://arielexpert25.com/administration/php/getGame.php" ,

        success : function(data) {
            $.each(data, function(index, element) {
                $('#questions_list').append($('<option value = '+ element.Id+'>' + element.Id + '</option>'));
                $answers = [element.Answer1,element.Answer2,element.Answer3,element.Answer4];
                questions.push({ "GameId": element.GameId, "Id":element.Id ,"bodyQuestion": element.Text,
                    "ImagePath": element.ImagePath, "VideoUrl": element.VideoUrl, "answers": $answers, "CorrectAnswer": element.CorrectAnswer});
            })

            fillPage(questions[0]);

        },
        error: function (xhr, ajaxOptions, thrownError) {
           // $('#questions_list').append($('<li>no games</li>'));
        }
    });
}

function fillPage(question){
    $("#game_title").text(gameTitle);
    $("#question_body").text(question.bodyQuestion);
    $("#answer1").val(question.answers[0]);
    $("#answer2").val(question.answers[1]);
    $("#answer3").val(question.answers[2]);
    $("#answer4").val(question.answers[3]);
    correctAnswer = question.CorrectAnswer;
    $(".btn_answer").removeClass("correct_answer");
    $(".btn_answer").text("לא נכונה");

    var a = '*[data-index='+correctAnswer+']';
    $(a).addClass("correct_answer");
    $(a).text("נכונה");
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
            clearPage();
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