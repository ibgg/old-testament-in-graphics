$(document).ready(function(){	
	if(JSON.parse(localStorage.getItem("toggled")) == true) $('#sidebarToggle').click();
	google.load("visualization", "1");
	google.setOnLoadCallback(initTimelines);

	$('[data-toggle="popover"]').popover(); 
});

var addDataToTable = function(data, postfix){
	for (var i = 0; i< data.length; i++){
		var startDate = new Date(data[i].start_date);
		var endDate = new Date(data[i].end_date);
		var row = [ data[i].description, data[i].biblical_quote != undefined ? data[i].biblical_quote : "", +Math.abs(startDate.getFullYear()) + " - " + Math.abs(endDate.getFullYear()) +" a.C."];
		$('#dataTable'+postfix).DataTable().row.add(row).draw();	
	}
	$("#spinner_table"+postfix).remove();
}

var initTimelines = function(){
	var ref = firebase.database().ref("timelines");
	ref.orderByChild('group_id').equalTo('israel_judges').once('value', function (snapshot){
		var eventStyle = '<div class="h6 mb-0 timeline-label">{0}</div>';
		var rangeStyle = '<div role="button" data-toggle="popover" data-trigger="focus" data-html="true" title="{0} ({1}, {2}) <a class=&quot;close&quot; href=&quot;#!&quot; id=&quot;{3}&quot;>&times;</a>" data-content="{4}" id="{5}" class = "alert alert-success"></div>';
		judgesData = [];
		
		for (var key in snapshot.val()) {
			if (snapshot.val().hasOwnProperty(key)) {
				judgesData.push(snapshot.val()[key]);
			}
		}

		var judgesTimeline = new BibleTimelineEvents(judgesData, 'timeline_judges', 'card_title_judges',"LÍNEA DEL TIEMPO DE LOS JUECES DE ISRAEL ",eventStyle, rangeStyle, "_judges", "box");
		judgesTimeline.drawTimeline();

		judgesTimeline.initializeControlsEvents(undefined);
		judgesTimeline.onRangeChange();
		judgesTimeline.onItemSelected();

		setupTable(judgesTimeline.getPostfix(), judgesTimeline, undefined, {ordering: false, select: true, searching: false, paging: false});
		addDataToTable(judgesTimeline.getData(), judgesTimeline.getPostfix());

		$('#sidebarToggle').on('click', function (){
			judgesTimeline.getTimeline().redraw();
			localStorage.setItem("toggled", !JSON.parse(localStorage.getItem("toggled")));
		});
		$('#sidebarToggleTop').on('click', function(){
			judgesTimeline.getTimeline().redraw();
			localStorage.setItem("toggled", !JSON.parse(localStorage.getItem("toggled")));
		});
	});
}