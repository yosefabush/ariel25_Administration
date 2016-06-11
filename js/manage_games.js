var newGameUrl = "create_game.html";
var editGameUrl = "edit_game.html?title=";

// WHY DO YOU REFERENCE TO GAME? THIS IS FOR THE USERS!!! NOT FOR THE ADMINISTRATORS!
var startGameUrl = "../../ariel25_Game/Hackaton/waitToPeople.html";
var selectedGameTitle;
var games;

// Asaf: don't use window, use document, can cause problems
$( document ).ready(function() {
    getAllGames();
});


$("#btn_add").click(function (){
    window.location = newGameUrl;
});

// Asaf: it's important, why didn't you include it in the bugs list?
$("#btn_delete").click(function (){
    gameID = games[$("#games_list")[0].selectedIndex].Id;
    
    //must ask the user for confirmation
    result = confirm("האם אתה בטוח שאתה רוצה למחוק את משחק מספר: " + gameID);
    
    if(result == true){
        $.ajax({
            type: "POST",
            dataType: 'text', 
            url: "deleteGame.php" ,
            data: {gameID},
            success : function(data) {
                if(data == 1){
                    alert("משחק מספר " + gameID + " נמחק" ); // alert the user and reload the page
                    location.reload();
                }
                else{
                    alert("שגיאה, נא להעביר את ההודעה הבאה לאחראים" );
                    alert("\n" + data);
                }
            }
        });
    }
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
                $('#games_list').append($('<option value = ' + element.Title.replace(/ /g, "%20")+'>' + element.Id + ' - ' +  element.Title + '</option>'));
            });

        },
        error: function (xhr, ajaxOptions, thrownError) {
           /* $('#games_list').append($('<li>', {
                text: "אין משחקים"
            }));*/
        }
    });
}