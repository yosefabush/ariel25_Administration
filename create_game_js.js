$image_link = "";
$video_link = "";

$(".submit").click(function () {
    $answers = [$("#answer1").val(), $("#answer2").val(), $("#answer3").val(), $("#answer4").val()];

    var correct_answer = $(".btn_answer.correct_answer").attr("data-index");

    var question =  {
        "game_name": $("#game_name").val(), "question_body": $("#question_body").val(),
        "image_link": $image_link, "video_link": $video_link, "answers": $answers, "correct_answer": correct_answer
    };

    uploadToDB(question);
    //alert(question.game_name + question.question_body + question.image_link + question.video_link + question.answers
    //    + question.correct_answer);
});

$(".btn_tab").click(function () {

    toggleUploadMediaView();

});

function uploadToDB(question){
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        url: "http://pimaster.orgfree.com/checkITin/Site/UpdateOrCreateBusiness.php" ,

        data: { Game_Name: question.game_name, Question_Body: question.question_body, Image_Link: question.image_link,
            Video_Link: question.video_link, Answer1: question.answers[0], Answer2: question.answers[1],
            Answer3: question.answers[2],Answer4: question.answers[3],Correct_Answer: question.correct_answer},
        success : function(data) {

   
            alert(data+sent_display_name);


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