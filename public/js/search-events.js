$(document).ready(function(){
	google.load("visualization", "1");
	google.setOnLoadCallback(initTimelines);

	$('[data-toggle="popover"]').popover(); 
});

var initTimelines = function(){
	var ref = firebase.database().ref("timelines");
	var eventStyle = '<div class="h6 mb-0 timeline-label">{0}</div>';
	var rangeStyle = '<div role="button" data-toggle="popover" data-trigger="focus" data-html="true" title="{0} ({1}, {2}) <a class=&quot;close&quot; href=&quot;#!&quot; id=&quot;{3}&quot;>&times;</a>" data-content="{4}" id="{5}" class = "alert alert-info"></div>';
	
	ref.orderByChild("start_date").startAt("-000566-01-01T06:57:40.000Z").endAt("-002055-01-01T06:57:40.000Z").once('value', function (snapshot){
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
			"LÍNEA DEL TIEMPO DEL REINO UNIFICADO", 
			eventStyle,
			rangeStyle,
			"", 
			"range");

		searchTimeline.drawTimeline();
		searchTimeline.initializeControlsEvents(undefined);
		searchTimeline.onRangeChange();
		searchTimeline.onItemSelected();
	});
}