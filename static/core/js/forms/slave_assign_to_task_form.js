$(document).ready(function(){
    var token = $("#token").val();

    jQuery.ajax( {
        url: 'http://aws00.grischenko.ru:8333/tasks/?running=True&slave=' + $("#slave_id").val(),
        dataType: 'json',
        type: 'GET',
        beforeSend : function( xhr ) {
            xhr.setRequestHeader( "Authorization", "Bearer " + token );
        },
        success: function( data ) {
            $.each( data, function( i, item ) {
                $("<option>").attr("value", item.id).text( item.name ).appendTo( "#slave_assign_to_task_field_task" );
              });
        },
        error: function(){
            console.log("Couldn't load available tasks for Slave");
        },
    } );
    
    $( "#slave_assign_to_task_form" ).submit(function( event ){
        payload = $("#slave_assign_to_task_form").serializeObject();       
        jQuery.ajax( {
            url: 'http://aws00.grischenko.ru:8333/assignments/',
            data: payload,
            type: 'POST',
            beforeSend : function( xhr ) {
                xhr.setRequestHeader( "Authorization", "Bearer " + token );
            },
            success: function(data){
                console.log(data);
                console.log(data.id);
                $('section#slave_assign_to_task').hide();
                $(':hidden#running_assignment_id').val(data.id);
                $('li#running_assignment_name').text(data.task_name);
                $('section#running_assignments').show();
            },
            error: function(data){
                console.log("Error:" + JSON.parse(data.responseText).slave);
                $("#notification").text(JSON.parse(data.responseText).slave).show().focus();  
            },
        });
        event.preventDefault();
    });

    
    
});
