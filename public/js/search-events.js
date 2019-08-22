$(document).ready(function(){
	if(JSON.parse(localStorage.getItem("toggled")) == true) $('#sidebarToggle').click();
	google.load("visualization", "1");
	google.setOnLoadCallback(initTimelines);

	$('[data-toggle="popover"]').popover(); 
	$("#startEvent").val(getUrlParameter("startDate"));
	$("#endEvent").val(getUrlParameter("endDate"));
});

var initTimelines = function(){	
	var startDateParam = "-"+getUrlParameter("startDate");
	var endDateParam = "-"+getUrlParameter("endDate");
	
	var startDate = JSON.parse(JSON.stringify(new Date(endDateParam, 00,01)));
	var endDate = JSON.parse(JSON.stringify(new Date(startDateParam, 00, 01)));

	var ref = firebase.database().ref("timelines");
	var eventStyle = '<div class="h6 mb-0 timeline-label">{0}</div>';
	var rangeStyle = '<div role="button" data-toggle="popover" data-trigger="focus" data-html="true" title="{0} ({1}, {2}) <a class=&quot;close&quot; href=&quot;#!&quot; id=&quot;{3}&quot;>&times;</a>" data-content="{4}" id="{5}" class = "alert alert-info"></div>';
	
	ref.orderByChild("start_date").startAt(startDate).endAt(endDate).once('value', function (snapshot){
		var data = [];
		for (var key in snapshot.val()) {
			if (snapshot.val().hasOwnProperty(key)) {
				data.push(snapshot.val()[key]);
			}
		}

		var searchTimeline = new BibleTimelineEvents(
			data, 
			'timeline', 
			'card_title',
			"EVENTOS DEL ANTIGUO TESTAMENTO", 
			eventStyle,
			rangeStyle,
			"", 
			"range");

		searchTimeline.drawTimeline();
		searchTimeline.initializeControlsEvents(undefined);
		searchTimeline.onRangeChange();
		searchTimeline.onItemSelected();

		$('#sidebarToggle').on('click', function (){
			searchTimeline.getTimeline().redraw();
			localStorage.setItem("toggled", !JSON.parse(localStorage.getItem("toggled")));
		});
	});
}