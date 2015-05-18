$(document).ready(function(){
    var token = $("#token").val();

    jQuery.ajax( {
        url: 'http://aws00.grischenko.ru:8333/taskworkflows/?location_type=' + $("#location_type").val(),
        dataType: 'json',
        type: 'GET',
        beforeSend : function( xhr ) {
            xhr.setRequestHeader( "Authorization", "Bearer " + token );
        },
        success: function( data ) {
            $.each( data, function( i, item ) {
                $("<option>").attr("value", item.id).text( item.name ).appendTo( "#create_task_field_type" );
              });
        },
        error: function(){
            console.log("Couldn't load available task workflows");
        },
    } );
    
    $( "#create_task_form" ).submit(function( event ){
        payload = $("#create_task_form").serializeObject();       
        jQuery.ajax( {
            url: 'http://aws00.grischenko.ru:8333/tasks/',
            data: payload,
            type: 'POST',
            beforeSend : function( xhr ) {
                xhr.setRequestHeader( "Authorization", "Bearer " + token );
            },
            success: function(data){
                alert("Submitted");
            },
            error: function(){
                alert("Error");
            },
        });
        event.preventDefault();
    });

    
    
});
