$(document).ready(function(){
    var token = $("#token").val();

    var regs = jQuery.ajax( {
        url: 'http://aws00.grischenko.ru:8333/api/regions/',
        dataType: 'json',
        type: 'GET',
        beforeSend : function( xhr ) {
            xhr.setRequestHeader( "Authorization", "Bearer " + token );
        },
        success: function( data ) {
                alert(data);
              });
        }
    } );

});