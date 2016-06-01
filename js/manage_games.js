var newGameUrl = "http://arielexpert25.com/administration/create_game.html";
var editGameUrl = "http://arielexpert25.com/administration/edit_game.html?title=";
var startGameUrl = "http://arielexpert25.com/administration/start_game.html";
var selectedGameTitle;
$(window).load(function() {
    getAllGames();
});


$("#btn_add").click(function (){
    var win = window.open(newGameUrl, '_blank');
    win.focus();
});

$("#btn_delete").click(function (){

});

$("#btn_edit").click(function (){
    selectedGameTitle = $("#games_list").val();
    var win = window.open((editGameUrl+selectedGameTitle).replace(/ /g, "%20"), '_blank');
    win.focus();
});

$("#btn_start").click(function (){
    var win = window.open(startGameUrl, '_self');
    win.focus();
});


function getAllGames(){
    $.ajax({
        type: "GET",
        data: { get_param: 'value' },
        dataType: 'json',
        url: "http://arielexpert25.com/administration/php/getAllGames.php" ,

       /*data: { title: $("#game_title").val()},*/
        success : function(data) {
            $.each(data, function(index, element) {
                $('#games_list').append($('<option value = '+ element.Title+'>' + element.Title + '</option>'));
            });

        },
        error: function (xhr, ajaxOptions, thrownError) {
           /* $('#games_list').append($('<li>', {
                text: "אין משחקים"
            }));*/
        }
    });
}