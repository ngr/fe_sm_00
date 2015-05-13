$(document).ready(function(){
    var token = $("#token").val();

    var regs = jQuery.ajax( {
        url: 'http://aws00.grischenko.ru:8333/api/locations/?idle=True&limit=3',
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

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function draw_region(i){
    result = "<ul>";
    result += "<li><a href='"+i.url+"'>"+i.name+"</a></li>";
    result += "<li>"+numberWithCommas(i.area)+"</li>";
    result += "</ul>";
    return result;
}

function draw_location(i){
    result = "<ul>";
    result += "<li><a href='"+i.url+"'>"+i.name+"</a></li>";
    result += "<li>"+i.design+"</li>";
    result += "</ul>";
    return result;
}