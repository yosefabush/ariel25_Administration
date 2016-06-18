var newGameUrl = "create_game.html";
var editGameUrl = "edit_game.html?title=";
var startGameUrl = "../ariel25_Game/Hackaton/waitToPeople.html";
var selectedGameTitle;
var games;
$(window).load(function() {
    getAllGames();
});


$("#btn_add").click(function (){
    window.location = newGameUrl;
});

$("#btn_delete").click(function (){

});

$("#btn_edit").click(function (){
    selectedGameTitle = $("#games_list").val();
    
    var newUrl = editGameUrl+selectedGameTitle;
    window.location = newUrl;
/*    
    var win = window.open((editGameUrl+selectedGameTitle).replace(/ /g, "%20"), '_blank');
    win.focus();
    */
});

$("#btn_start").click(function (){
    localStorage.gameId =games[$("#games_list")[0].selectedIndex].Id;
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        url: "php/setStatus.php" ,

        data: {"status":2,"gameId":localStorage.gameId},
        success : function(data) {

        }
    });
    window.location = startGameUrl;
});


function getAllGames(){
    $.ajax({
        type: "GET",
        data: { get_param: 'value' },
        dataType: 'json',
        url: "php/getAllGames.php" ,

       /*data: { title: $("#game_title").val()},*/
        success : function(data) {
            games = data;
            $.each(data, function(index, element) {
                $('#games_list').append($('<option value = '+ element.Title.replace(/ /g, "%20")+'>' + element.Title + '</option>'));
            });

        },
        error: function (xhr, ajaxOptions, thrownError) {
           /* $('#games_list').append($('<li>', {
                text: "אין משחקים"
            }));*/
        }
    });
}

// export all present (those who arrived) students to csv (excel format) (download it)
$("#btn_export").click(function (e){
    e.preventDefault(); //prevent default beaviour
    window.location.href="downloadcsv.php";
});