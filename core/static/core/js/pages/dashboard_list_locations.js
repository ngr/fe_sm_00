$(document).ready(function(){
    var token = $("#token").val();

    var regs = jQuery.ajax( {
        url: 'http://aws00.grischenko.ru:8333/locations/?idle=True&limit=10',
        dataType: 'json',
        type: 'GET',
        beforeSend : function( xhr ) {
            xhr.setRequestHeader( "Authorization", "Bearer " + token );
        },
        success: function( data ) {
            $.each( data, function( i, item ) {
                $("<li>").attr("id", "location_"+item.id).html( draw_location(item) ).appendTo( "#locations" );
              });
        }
    } );

});

function draw_location(i){
    result = "<ul>";
    result += "<li><a href='/location/"+i.id+"'>"+i.name+"</a></li>";
    result += "<li>"+i.design+"</li>";
    result += "</ul>";
    return result;
}