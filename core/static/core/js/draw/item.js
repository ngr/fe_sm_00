var token = $("#token").val();
//--------------- List of items stored in this location ------------ 
drawItem = function(data) {
//    console.log(data);
    result = "<ul>" + 
	"<li class='item_id'>" + data.id + "</li>" + 
    "<li class='item_itype'>" + data.itype + "</li>" + 
	"<li class='item_name'>" + data.name + "</li>" +
    "<li class='item_amount'>" + data.amount + "</li>" + 
	"<li id=\"formSend" + data.id + "\">" +
	"<input type=\"button\" value=\"Sending\" onclick=\"javascript:addSendingForm(" + data.id + ");\">" +
	"</li>" +
	"</ul>";
    return result;
}
//--------------- Form for sending items to another location -------
function addSendingForm(itemId) {
	document.getElementById("formSend" + itemId).innerHTML = "<div>" +
	"<form id=\"sendingItemsForm\" method=\"patch\" action=\"javascript:sendForm(" + itemId + ");\">" +
	"<b>Send item:</b><br>" +
	"Destination:<br> <select id=\"locations\" name=\"location\" class=\"destinationSendingItems\">" + 
	"</select><br>" +
	"Amount:<br> <input type=\"number\" name=\"amount\" class=\"amountSendingItems\" min=\"1\"><br>" +
	"<input type=\"submit\" value=\"Send\"> " + 
	"<input type=\"button\" value=\"Cancel\" onclick=\"javascript:cancelForm(" + itemId + ");\">" +
	"</form></div>";
	getLocationsList(); 
}
//--------------- AJAX request for geting locations ---------------
function getLocationsList () {
//    var token = $("#token").val();
//	var region = $("#location_region").val();
	var location = $("#location_id").val();
    jQuery.ajax( {
//        url: 'http://aws00.grischenko.ru:8333/locations/?idle=True', 
        url: 'http://aws00.grischenko.ru:8333/locations/?region=' + $("#location_region").val(), 
        dataType: 'json',
        type: 'GET',
        beforeSend : function( xhr ) {
            xhr.setRequestHeader( "Authorization", "Bearer " + token );
        },
        success: function( data ) {
// и ту же location в которой мы находимся в списке нет смысла показывать.		
            $.each( data, function( i, item ) {
				if (item.id!=location) {
					$("<option value=\"" + item.id + "\">" + item.name + " (" + item.design + 
					")</option>").appendTo( "#locations" );
				};
              });
        }
    } );
};
//--------------- Sending items by AJAX ----------------------------
function sendForm(itemId) {
//    var token = $("#token").val();
	var loadData = $("#sendingItemsForm").serialize();       
	jQuery.ajax( {
		url: 'http://aws00.grischenko.ru:8333/item/' + itemId + '/',
		data: loadData,
		type: 'PATCH',
		beforeSend : function( xhr ) {
			xhr.setRequestHeader( "Authorization", "Bearer " + token );
		},
		success: function(data){
			console.log(data);
			// Reread data about items
			jQuery.ajax( {
				url: 'http://aws00.grischenko.ru:8333/items/?location=' + $("#location_id").val(),
				dataType: 'json',
				type: 'GET',
				beforeSend : function( xhr ) {
					xhr.setRequestHeader( "Authorization", "Bearer " + token );
				},
				success: function( data ) {
					// Clean items list
					document.getElementById("items").innerHTML = "";
					$.each( data, function( i, item ) {
						// Refill items list
						$("<div>").attr("id", "item_"+item.id).html( drawItem(item) ).appendTo( "#items" );
					});
				},
			} );
		},
		error: function(data){
			console.log("Error:" + JSON.parse(data.responseText).slave);
//			$("#notification").text(JSON.parse(data.responseText).slave).show().focus();  
		},
	});
}
//--------------- Cancel senfing form ------------------------------
function cancelForm(itemId) {
	document.getElementById("formSend" + itemId).innerHTML = "<input type=\"button\" value=\"Sending\"" +
	" onclick=\"javascript:addSendingForm(" + itemId + ");\">";
}