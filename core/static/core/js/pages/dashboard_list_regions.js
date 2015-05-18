$(document).ready(function(){
    var token = $("#token").val();

    var regs = jQuery.ajax( {
        url: 'http://aws00.grischenko.ru:8333/regions/',
        dataType: 'json',
        type: 'GET',
        beforeSend : function( xhr ) {
            xhr.setRequestHeader( "Authorization", "Bearer " + token );
        },
        success: function( data ) {
            $.each( data, function( i, item ) {
                $("<li>").attr("id", "region_"+item.id).html( draw_region(item) ).appendTo( "#regions" );
              });
        }
    } );

});

function draw_region(r){
    result = "<ul>";
    result += "<li><a href='/region/"+r.id+"'>"+r.name+"</a></li>";
    result += "<li>"+numberWithCommas(r.area)+"m</li>";
    result += "</ul>";
    return result;
}