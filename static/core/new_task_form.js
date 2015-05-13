$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$(document).ready(function(){
    var token = $("#token").val();

    jQuery.ajax( {
        url: 'http://aws00.grischenko.ru:8333/api/taskworkflows/?location_type=' + $("#location_type").val(),
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

    jQuery.ajax( {
        url: 'http://aws00.grischenko.ru:8333/api/tasks/?running=True&location=' + $("#location_id").val(),
        dataType: 'json',
        type: 'GET',
        beforeSend : function( xhr ) {
            xhr.setRequestHeader( "Authorization", "Bearer " + token );
        },
        success: function( data ) {
            $.each( data, function( i, item ) {
                $("<div>").attr("id", "task_"+item.id).html( draw_running_task(item) ).appendTo( "#running_tasks" );
              });
        },
    } );
    
    $( "#create_task_form" ).submit(function( event ){
        payload = $("#create_task_form").serializeObject();       
        jQuery.ajax( {
            url: 'http://aws00.grischenko.ru:8333/api/tasks/',
            data: payload,
            type: 'POST',
            beforeSend : function( xhr ) {
                xhr.setRequestHeader( "Authorization", "Bearer " + token );
            },
            success: function(){
                alert("Submitted");
            },
            error: function(){
                alert("Error");
            },
        });
        event.preventDefault();
    });

    
    
});


function draw_running_task(r){
    result = "<ul>";
    result += "<li><a href='"+r.url+"'>"+r.name+"</a></li>";
    result += "<li>Completion: "+r.percent_completed+"</li>";
    result += "<li>Active assignments: "+r.active_assignments_count+"</li>";
    result += "<li>Estimated finish: "+r.date_finish+"</li>";
    result += "</ul>";
    return result;
}