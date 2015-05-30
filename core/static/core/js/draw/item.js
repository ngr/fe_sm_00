//--------------- List of items stored in this location ------------ 
drawItem = function(data) {
    console.log(data);
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
	"<form id=\"sendingItemsForm\" method=\"patch\" action=\"\">" +
	"<b>Send item:</b><br>" +
	"Amount: <input type=\"text\" name=\"amount\" class=\"amountSendingItems\"><br>" +
	"Destination: <select id=\"locations\" name=\"location\" class=\"destinationSendingItems\">" + 
	"</select><br>" +
	"<input type=\"button\" value=\"Send\" onclick=\"javascript:sendForm(" + itemId + ");\">" +
	"</form></div>";
	getLocationsList(); 
}
//--------------- AJAX request for geting locations ---------------
function getLocationsList () {
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
                $("<option value=\"" + item.id + "\">" + item.name + " (" + item.design + 
				")</option>").appendTo( "#locations" );
              });
        }
    } );
};
//--------------- Sending items by AJAX ----------------------------
function sendForm(itemId) {
	document.getElementById("formSend" + itemId).innerHTML = "<input type=\"button\" value=\"Sending\"" +
	" onclick=\"javascript:addSendingForm(" + itemId + ");\">";
}
/*
        <script src="{% static 'core/js/forms/slave_assign_to_task_form.js' %}"></script>
        Assign to task:
        <form id="slave_assign_to_task_form" method="post" action="">
        <select id="slave_assign_to_task_field_task" type="select" name="task">
            <option id="slave_assign_to_task_field_task_option" selected="selected" value="">
                -
            </option>
        </select>
        <input id="slave_assign_to_task_field_slave" type="hidden" name="slave" value="{{ slave.id }}">
        <input id="slave_assign_to_task_submit" type="submit" name="submit_button" value="Assign">
        </form>
*/