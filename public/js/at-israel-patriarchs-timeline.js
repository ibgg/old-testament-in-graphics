var patriarchs_timeline_v;

var general_event = {
	title: "PATRIARCAS DE ISRAEL",
	description: "<p>Si aceptamos el año 1446 a.C. como la fecha del éxodo, podemos ir retrocediendo en la línea del tiempo para ir llenando la historia de los patriarcas. <p>La Biblia afirma que Jacob tenía 130 años cuando entró en Egipto (Gn 47:9, 28). José tenía 39 años (30 años, más 7 años, más 2 años, según Gn 41:16-47; 45:6). Con la fecha de 1867 (fecha en que la familia de Jacob llegó a Egipto - ver en línea del tiempo) podemos retroceder y fijar la fecha para todos los patriarcas."
}

$(document).ready(function(){	
	google.load("visualization", "1");
	google.setOnLoadCallback(initTimelines);

	$('[data-toggle="popover"]').popover(); 
	document.getElementById('general-event-title').innerHTML = general_event.title;
	document.getElementById('general-event-description').innerHTML = general_event.description;
});

var initTimelines = function(){
	loadJSONData("data/at-patriarchs-data.json").then(function (patriarchsData){
		patriarchsData = JSON.parse(patriarchsData);
		var eventStyle = '<div class="h6 mb-0 timeline-label">{3}</div>';
		var rangeStyle = '<div role="button" data-toggle="popover" data-trigger="focus" data-html="true" title="{0} ({1}, {2}) <a class=&quot;close&quot; href=&quot;#!&quot; id=&quot;{3}&quot;>&times;</a>" data-content="{4}" id="{5}" class = "alert alert-info"></div>';

		var patriarchsTimeline = new BibleTimelineEvents(patriarchsData, 'timeline_patriarchs', 'card_title_patriarchs',"LÍNEA DEL TIEMPO DE LOS PATRIARCAS DE ISRAEL ",eventStyle, rangeStyle, "_patriarchs", "box");
		patriarchsTimeline.drawRangeTimeline();

		patriarchsTimeline.initializeControlsEvents(undefined);
		patriarchsTimeline.onRangeChange();
		patriarchsTimeline.onItemSelected();

		$('#sidebarToggle').on('click', function (){
			patriarchsTimeline.getTimeline().redraw();
		});
	});
}