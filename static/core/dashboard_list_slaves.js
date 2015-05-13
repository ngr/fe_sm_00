$(document).ready(function(){
    var token = $("#token").val();

    var regs = jQuery.ajax( {
        url: 'http://aws00.grischenko.ru:8333/api/slaves/?idle=True&limit=15',
        dataType: 'json',
        type: 'GET',
        beforeSend : function( xhr ) {
            xhr.setRequestHeader( "Authorization", "Bearer " + token );
        },
        success: function( data ) {
            $.each( data, function( i, item ) {
                $("<li>").attr("id", "slave_"+item.id).html( draw_slave(item) ).appendTo( "#slaves" );
              });
        }
    } );

});

function draw_slave(i){
    result = "<ul>";
    result += "<li><a href='/slave/"+i.id+"'>"+i.name+"</a></li>";
    result += "<li>Age: "+i.age+"</li>";
    result += "<li>Experience: "+numberWithCommas(i.exp)+"</li>";
    result += "</ul>";
    return result;
}