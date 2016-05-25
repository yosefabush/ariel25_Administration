var insertGameAjax = function() {
   var title = $("#name").val();
   $.get( "insertGame.php?title="+title, function( data ) {
       //var gameIdFromServer = $.parseJSON(data);
       alert(data);
   }); 
}