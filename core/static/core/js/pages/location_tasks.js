$(document).ready(function(){
    var token = $("#token").val();

    jQuery.ajax( {
        url: 'http://aws00.grischenko.ru:8333/tasks/?running=True&location=' + $("#location_id").val(),
        dataType: 'json',
        type: 'GET',
        beforeSend : function( xhr ) {
            xhr.setRequestHeader( "Authorization", "Bearer " + token );
        },
        success: function( data ) {
            $.each( data, function( i, item ) {
                $("<div>").attr("id", "task_"+item.id).html( drawTaskRunning(item) ).appendTo( "#running_tasks" );
              });
        },
    } );
});
