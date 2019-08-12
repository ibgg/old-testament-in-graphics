var general_event = {
	title: "MOISÉS Y LA LIBERACIÓN DEL PUEBLO DE ISRAEL",
	description: "<p>Existen dos fechas que resultan clave en la cronología del Antiguo Testamento. La primera es aquella en que se colocaron los cimientos del primer templo. Se nos dice, en 1 Reyes 6:1 que la edificación del templo comenzó en el cuarto año de reinado de <b>Salomón</b>, en el mes segundo (Ziv), 480 años después que los israelitas salieron de Egipto. Además, sabemos el comienzo del reinado de <b>Salomón</b> comenzó en el 971 a.C., de modo que según el sistema cronológico de Israel, el primer año de su reinado habría comenzado en el otoño de 970 a.C., así el cuarto año sería el año 967/966 a.C., contándolo desde una estación de otoño hasta la siguiente. Como Ziv era el segundo mes del calendario religioso, podemos deducir que <b>Salomón</b> comenzó a edificar el templo en la primeravera del año 966 a.C. De esta forma, según este cálculo, el éxodo de Israel desde Egipto habría comenzado en el año 1446 a.C., y Canaán habría sido conquistada alrededor del año 1046 a.C.</p> <p>Por otro lado, la otra fecha clara del Antiguo Testamento es el viaje de <b>Jacob</b> a Egipto, que según Éxodo 12:40, sucedió unos 430 años antes del éxodo. Esto nos lleva al año 1876 a.C. (1446 a.C. más 430 años).</p> <p>Con estas dos fechas como punto de partida es posible ir deduciendo las fechas de los acontecimientos ocurridos durante el periodo que transcurrió entre <b>Abraham</b> y <b>Saúl</b>, el primer rey de Israel."
}

$(document).ready(function(){
	google.load("visualization", "1");
	google.setOnLoadCallback(initTimelines);

	$('[data-toggle="popover"]').popover();
	document.getElementById('general-event-title').innerHTML = general_event.title;
	document.getElementById('general-event-description').innerHTML = general_event.description;
});

var initTimelines = function(){
	loadJSONData("data/at-pharaohs-data.json").then(function (pharaohsData){
		pharaohsData = JSON.parse(pharaohsData);
		var eventStyle = '<div class="h6 mb-0 timeline-label">{3}</div>';
		var pharaohsRangeStyle = '<div role="button" data-toggle="popover" data-trigger="focus" data-html="true" title="{0} ({1}, {2}) <a class=&quot;close&quot; href=&quot;#!&quot; id=&quot;{3}&quot;>&times;</a>" data-content="{4}" id="{5}" class = "alert alert-info"></div>';

		var pharaohsTimeline = new BibleTimelineEvents(pharaohsData, 'timeline_pharaohs', 'card_title_pharaohs',"LÍNEA DEL TIEMPO DE FARAONES DE EGIPTO ",eventStyle, pharaohsRangeStyle, "_pharaohs", "box");
		pharaohsTimeline.drawRangeTimeline();

		loadJSONData("data/at-israel-delivery-data.json").then(function (israelData){
			israelData = JSON.parse(israelData);
			var itemStyle = '<div role="button" data-toggle="popover" data-trigger="focus" data-html="true" title="{0} ({1}) <a class=&quot;close&quot; href=&quot;#!&quot; id=&quot;{2}&quot;>&times;</a>" data-content="{3}" id="{4}" class = "timeline-label alert alert-success">{5}</div>';
			var israelTimeline = new BibleTimelineEvents(israelData, 'timeline_israel_delivery', 'card_title_israel_delivery', 'LÍNEA DE TIEMPO DE LOS EVENTOS DE ISRAEL HASTA EL ÉXODO', itemStyle, undefined, "_israel_delivery", "box");
			israelTimeline.drawBoxTimeline();
			
			pharaohsTimeline.initializeControlsEvents(israelTimeline.getTimeline());
			israelTimeline.initializeControlsEvents(pharaohsTimeline.getTimeline());

			pharaohsTimeline.onSynhronizedRangeChange(israelTimeline.getTimeline(), israelTimeline.getData(), israelTimeline.getPostfix());
			israelTimeline.onSynhronizedRangeChange(pharaohsTimeline.getTimeline(), pharaohsTimeline.getData(), pharaohsTimeline.getPostfix());

			pharaohsTimeline.onItemSelected();
			israelTimeline.onItemSelected();
		});
	});
}