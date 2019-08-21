var general_event = {
	title: "LA MONARQUÍA DE ISRAEL",
	description: "<p>Israel comenzó siendo una alianza de doce tribus que tenían en común cierto lazos étnicos, pero aún más, tenían la fe en Yahvéh como común denominador. A fines del periodo descrito en 1 y 2 S y 1 R 1:11, Israel era la nación más poderosa de Asia occidental. Este periodo de la historia de Israel corresponde básicamente a la historia de cuatro personas: Samuel, Saúl, David y Salomón."
}

$(document).ready(function(){
	google.load("visualization", "1");
	google.setOnLoadCallback(initTimelines);

	$('[data-toggle="popover"]').popover(); 
	document.getElementById('general-event-title').innerHTML = general_event.title;
	document.getElementById('general-event-description').innerHTML = general_event.description;
});

var initTimelines = function(){
	var ref = firebase.database().ref("timelines");
	ref.orderByChild('group_id').equalTo('unified_kingdom').once('value', function (snapshot){
		unifiedKingdomData = [];
		var eventStyle = '<div class="h6 mb-0 timeline-label">{0}</div>';
		var rangeStyle = '<div role="button" data-toggle="popover" data-trigger="focus" data-html="true" title="{0} ({1}, {2}) <a class=&quot;close&quot; href=&quot;#!&quot; id=&quot;{3}&quot;>&times;</a>" data-content="{4}" id="{5}" class = "alert alert-info"></div>';

		for (var key in snapshot.val()) {
			if (snapshot.val().hasOwnProperty(key)) {
				unifiedKingdomData.push(snapshot.val()[key]);
			}
		}

		var unifiedKingomTimeline = new BibleTimelineEvents(
			unifiedKingdomData, 
			'timeline_unified_kingdom', 
			'card_title_unified_kingdom',
			"LÍNEA DEL TIEMPO DEL REINO UNIFICADO", 
			eventStyle,
			rangeStyle,
			"_unified_kingdom", 
			"range");
		
			var startVisibleRange = new Date("-001050-01-01T06:57:40.000Z");
			var endVisibleRange = new Date("-000900-01-01T06:57:40.000Z");
			unifiedKingomTimeline.drawTimeline();
			unifiedKingomTimeline.setStartTimelineView(startVisibleRange);
			unifiedKingomTimeline.setEndTimelineView(endVisibleRange);
			
			unifiedKingomTimeline.initializeControlsEvents(undefined);
			unifiedKingomTimeline.onRangeChange();
			unifiedKingomTimeline.onItemSelected();
			adjustVisibleTimeRangeToAccommodateAllEvents(unifiedKingomTimeline.getTimeline(), unifiedKingomTimeline.getData(), unifiedKingomTimeline.getPostfix(), startVisibleRange, endVisibleRange);
	
			$('#sidebarToggle').on('click', function (){
				unifiedKingomTimeline.getTimeline().redraw();
			});
			$('#sidebarToggleTop').on('click', function(){
				unifiedKingomTimeline.getTimeline().redraw();
			});
	});
}