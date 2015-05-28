drawItem = function(data) {
    console.log(data);
    result = "<ul>";
    result += "<li class='item_id'>"+data.id+"</li>";
    result += "<li class='item_itype'>"+data.itype+"</li>";
    result += "<li class='item_name'>"+data.name+"</li>";
    result += "<li class='item_amount'>"+data.amount+"</li>";
    result += "</ul>";
    return result;
}