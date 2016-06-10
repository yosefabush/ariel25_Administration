var imagePath = "";
var videoUrl = "";
var hasVideo = false;
var question;
var gameID;
var gameTitle;
var correctAnswer;
var questions=[];
var questionId;

$(window).load(function() {
    gameTitle = decodeURIComponent($.urlParam("title").replace("%20", " "));
    console.log(gameTitle);
    getGame();
});

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};

$("#btn_back").click(function () {
    var manageGamesUrl = "manage_games.html";
    window.location =  manageGamesUrl;

});

$("#btn_delete_question").click(function(){
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        url: "php/deleteQuestion.php" ,
        data: { questionId: question.questionId},
        success : function(data) {
            //  alert(data);
            clearPage();
            alert("שאלה נמחקה");
        }
    });
});

$(".submit").click(function () {
    $answers = [$("#answer1").val(), $("#answer2").val(), $("#answer3").val(), $("#answer4").val()];

    correctAnswer = $(".btn_answer.correct_answer").attr("data-index");

    question =  {
        "questionId": questionId,
        "gameId": gameID, "bodyQuestion": $("#question_body").val(),
        "imagePath": imagePath, "videoUrl": videoUrl, "answers": $answers, "correctAnswer": correctAnswer
    };

    if($('#fileToUpload').prop('files'),length > 0) {
        uploadToDBWithImage();
    }else{
        uploadToDB();
    }
    //alert(currentQuestion.game_name + currentQuestion.question_body + currentQuestion.imagePath + currentQuestion.videoUrl + currentQuestion.answers
    //    + currentQuestion.correct_answer);
});

$("#btn_tab").click(function () {

    toggleUploadMediaView();

});

$(".btn_answer").click(function(){
    $(".btn_answer").removeClass("correct_answer");
    $(".btn_answer").text("לא נכונה");
    $(this).addClass("correct_answer");
    $(this).text("נכונה");

});

$("#questions_list").change(function() {
    
    fillPage(questions[$("#questions_list")[0].selectedIndex]);
});

function getGame(){
    $.ajax({
        type: "GET",
        data: { get_param: 'value', title: gameTitle  },
        dataType: 'json',
        url: "php/getGame.php" ,

        success : function(data) {
            $.each(data, function(index, element) {
                gameID = element.GameId;
                
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
    $("#game_title").val(gameTitle);
    $("#question_body").text(question.bodyQuestion);
    $("#answer1").val(question.answers[0]);
    $("#answer2").val(question.answers[1]);
    $("#answer3").val(question.answers[2]);
    $("#answer4").val(question.answers[3]);
    correctAnswer = question.CorrectAnswer;
    $(".btn_answer").removeClass("correct_answer");
    $(".btn_answer").text("לא נכונה");
    questionId = question.Id;

    var a = '*[data-index='+correctAnswer+']';
    $(a).addClass("correct_answer");
    $(a).text("נכונה");
}

function clearPage(){
    imagePath = "";
    videoUrl = "";
    hasVideo = false;
    correctAnswer = 1;

    $("#question_body").val("");
    $("#answer1").val("");
    $("#answer2").val("");
    $("#answer3").val("");
    $("#answer4").val("");

    $(".btn_answer").removeClass("correct_answer");
    $(".btn_answer").text("לא נכונה");

    var a = '*[data-index='+correctAnswer+']';
    $(a).addClass("correct_answer");
    $(a).text("נכונה");

    resetFormElement($('#fileToUpload')); //clear the image file selection

    $("html, body").animate({ scrollTop: 0 }, "slow");


}

function resetFormElement(e) {
    e.wrap('<form>').closest('form').get(0).reset();
    e.unwrap();
}

function uploadToDBWithImage(){
    var file_data = $('#fileToUpload').prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    $.ajax({
        type: "POST",
        dataType: 'text',  // what to expect back from the PHP script, if anything
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        processData: false,
        cache: false,
        url: "php/updateQuestion.php" ,

        data: { questionId: question.questionId,gameId: gameID, bodyQuestion: question.bodyQuestion, imagePath: question.imagePath,
            videoUrl: question.videoUrl, answer1: question.answers[0], answer2: question.answers[1],
            answer3: question.answers[2],answer4: question.answers[3],correctAnswer: question.correctAnswer, image: form_data},
        success : function(data) {
            clearPage();
            alert("שאלה נשמרה");
        }
    });

}

function setVideoUrl(videoID){
    videoUrl =  "https://www.youtube.com/watch?v=" + videoID;
    hasVideo = true;
}

function uploadToDB(){
    console.log(question);
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        url: "php/updateQuestion.php" ,

        data: { questionId: question.questionId,gameId: gameID, bodyQuestion: question.bodyQuestion, imagePath: question.imagePath,
            videoUrl: question.videoUrl, answer1: question.answers[0], answer2: question.answers[1],
            answer3: question.answers[2],answer4: question.answers[3],correctAnswer: question.correctAnswer},
        success : function(data) {
          //  alert(data);
            clearPage();
            alert("שאלה נשמרה");
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
