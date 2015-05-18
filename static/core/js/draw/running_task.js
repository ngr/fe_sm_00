drawTaskRunning = function(data) {
    console.log(data);
    result = "<ul>";
    result += "<li><a href='#"+data.id+"'>"+data.name+"</a></li>";
    result += "<li>Completion: "+data.percent_completed+"</li>";
    result += "<li>Active assignments: "+data.active_assignments_count+"</li>";
    result += "<li>Estimated finish: "+data.date_finish+"</li>";
    result += "</ul>";
    return result;
}