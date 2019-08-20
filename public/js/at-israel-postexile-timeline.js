var general_event = {
	title: "EVENTOS POSTEXÍLICOS",
	description: "<p>La Biblia nos proporciona algunas fechas que pueden ayudarnos a determinar eventos en el periodo postexílico: <ul><li>Se nos dice que <b>Joaquín</b>, rey de Judá, fue liberado a los 37 años de haber sido exiliado (2 R 25:27), lo que lo colocaría en el eño 560 a.C. (es decir, 597 a.C. menos 37 años).</li><li><b>Ezequiel</b> también nos proporciona algunas fechas para los acontecimientos de su gobierno, a partir de la cautividad de <b>Joaquín</b> (Ezequiel 1:1, 2; 29:17). En el año 12 de su gobierno, <b>Ezequiel</b> se enteró que Jerusalén había caído en el año 12 de su deportación, lo que establecería una fecha aproximada del año 586 a.C. para este suceso (Ezequiel 33:21).</li></ul>"
}

$(document).ready(function(){	
	google.load("visualization", "1");
	google.setOnLoadCallback(initTimelines);

	$('[data-toggle="popover"]').popover(); 
	document.getElementById('general-event-title').innerHTML = general_event.title;
	document.getElementById('general-event-description').innerHTML = general_event.description;
});

var initTimelines = function(){
	loadJSONData("data/at-postexile-data.json").then(function (postexileData){
		postexileData = JSON.parse(postexileData);
		var itemStyle = '<div role="button" data-toggle="popover" data-trigger="focus" data-html="true" title="{0} ({1}) <a class=&quot;close&quot; href=&quot;#!&quot; id=&quot;{2}&quot;>&times;</a>" data-content="{3}" id="{4}" class = "timeline-box-label alert alert-success">{5}</div>';

		var postExileTimeline = new BibleTimelineEvents(
			postexileData, 
			'timeline_postexile', 
			'card_title_postexile',
			"LÍNEA DEL TIEMPO DE EVENTOS POSTEXÍLICOS ",
			itemStyle, 
			undefined, 
			"_postexile", 
			"box");
		postExileTimeline.drawTimeline();

		postExileTimeline.initializeControlsEvents(undefined);
		postExileTimeline.onRangeChange();
		postExileTimeline.onItemSelected();

		$('#sidebarToggle').on('click', function (){
			postExileTimeline.getTimeline().redraw();
		});
	});
}