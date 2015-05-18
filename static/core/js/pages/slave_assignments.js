$(document).ready(function(){
    var token = $("#token").val();

    jQuery.ajax( {
        url: 'http://aws00.grischenko.ru:8333/assignments/?running=True&slave=' + $("#slave_id").val(),
        dataType: 'json',
        type: 'GET',
        beforeSend : function( xhr ) {
            xhr.setRequestHeader( "Authorization", "Bearer " + token );
        },
        success: function( data ) {
                //$('#running_assignment_div').text("SMTH");
                if (data.length > 0) {
                    console.log(data);
                    console.log("Currently assigned to:"+data[0].id);

                    $(':hidden#running_assignment_id').val(data[0].id);
                    $('li#running_assignment_name').text(data[0].task_name);
                    $('section#running_assignments').show();
                }
                else {
                    $('section#slave_assign_to_task').show();
                };

        },
        error: function(){
            console.log("Couldn't load running assignments for Slave");
            $("#slave_assign_to_task_field_task").show().focus().select();

        },
    } );
});

function releaseAssignment() {
    var token = $("#token").val();
    var id = $('#running_assignment_id').val();
    console.log("Releasing: " + id);

    var payload = {};
    payload['action'] = "release";
    jQuery.ajax( {
        url: 'http://aws00.grischenko.ru:8333/assignment/'+id+'/',
        type: 'PUT',
        data: payload,
        beforeSend : function( xhr ) {
            xhr.setRequestHeader( "Authorization", "Bearer " + token );
        },
        success: function( data ) {
                console.log('RELEASED');
                $('#running_assignments').hide();
                $('section#slave_assign_to_task').show();
        },
        error: function(){
                console.log('ERROR Releasing');
        },
    } );
}