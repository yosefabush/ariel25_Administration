var insertGameAjax = function() {
   $.get( "api.php?req=insertGame?title=testTitle", function( data ) {
       var gameIdFromServer = $.parseJSON(data);
       alert(gameIdFromServer);
   }); 
}