var general_event = {
	title: "DESDE LA CREACIÓN HASTA EL DILUVIO",
	description: "<p>Aquí ya resulta imposible ir retrocediendo hacia atrás, debido a que no es posible establecer una fecha para el diluvio. Así que se optará por seguir la línea de los descendientes de Adán hasta el diluvio usando las cronologías descritas en Génesis 5 y 7:11. Además se establecerá la fecha hipotética del año 0 como año de partida para esta línea del tiempo.<p> Si sumamos las edades de cada uno de los hombres hasta la edad en que Noé construyó el arca, obtenemos un total de <b>1656 años desde los tiempos de Adán hasta el diluvio</b>. Sin embargo, otras versiones del Antiguo Testamento arrojan cifras diferentes. Por ejemplo, la <b>Septuaginta da 2242 años entre Adán y el diluvio</b>, mientras <b>la versión Samaritana arroja como resultado 1307 años desde Adán hasta el diluvio</b>. Estos son el tipo de cuestiones que hacen <i>imposible fijar una fecha exacta tanto para Adán como para el diluvio</i>. Según la cronología descrita aquí, Noé habría nacido 1056 años después de la creación. <p> Lo cierto es que no hay registros extrabíblicos para determinar este periodo, por lo tanto, no podemos tener certeza absoluta. Por ejemplo, la lista de los reyes sumerios mencionan solo ocho reyes que gobernaron alrededor de 30,000 años antes del Diluvio. Es obvio que esta lista incluye únicamente a personajes legendarios.<p>Es evidente que no podemos dar una respuesta exacta a la interrogante de cuánto tiempo habría vivido el hombre sobre la tierra, sin embargo, no concordamos con la hipótesis de que pasaron millones de años. Lo que só podemos aventurarnos a afirmar es que pasaron muchas generaciones entre Adán y el diluvio, y que el diluvio sucedió poco antes del 2611 a.C. (la fecha del nacimiento de Cainán)"
}

var cain_abel_data = [
	{
		'event_name': 'Caín',
		'biblical_quote':'Génesis 4:1',
	},
	{
		'event_name': 'Abel',
		'biblical_quote':'Génesis 4:2',
	},
	{
		'event_name': 'Enoc',
		'biblical_quote':'Génesis 4:17',
	},
	{
		'event_name': 'Irad',
		'biblical_quote':'Génesis 4:18',
	},
	{
		'event_name': 'Mehujael',
		'biblical_quote':'Génesis 4:18',
	},
	{
		'event_name': 'Metusael',
		'biblical_quote':'Génesis 4:18',
	},
	{
		'event_name': 'Lamec',
		'biblical_quote':'Génesis 4:18',
	},
	{
		'event_name': 'Tubal-caín',
		'biblical_quote':'Génesis 4:22',
	},
	{
		'event_name': 'Jabal',
		'biblical_quote':'Génesis 4:20',
	},
	{
		'event_name': 'Jubal',
		'biblical_quote':'Génesis 4:21',
	},
];

$(document).ready(function(){
	google.load("visualization", "1");
	google.charts.load("current", {packages: ["orgchart"]});
	google.setOnLoadCallback(initTimelines);

	$('[data-toggle="popover"]').popover();
	document.getElementById('general-event-title').innerHTML = general_event.title;
	document.getElementById('general-event-description').innerHTML = general_event.description;
});

function populateFamilytree(data) {
	var parentsRelationshipTable = [[0,0], [1,0], [2,1], [3,2], [4,3], [5,4], [6,5], [7,6], [8,7], [9,8], [10,0],[11,0], [12,10], [13,12], [14,13], [15,14], [16,15], [17,15], [18,15]];

	var adamFamilyData = [];
	for (var i = 0; i < data.length; i++){
		adamFamilyData.push(data[i]);
	}
	for (var i = 0; i < cain_abel_data.length; i++){
		adamFamilyData.push(cain_abel_data[i]);
	}

	var adamFamilyDataTree = addDataToFamilyTree(parentsRelationshipTable, adamFamilyData, 26);
	drawFamilyTree(adamFamilyDataTree, 'org_div');
}

var initTimelines = function(){
	loadJSONData("data/at-creation-data.json").then(function (creationData){
		creationData = JSON.parse(creationData);
		var eventStyle = '<div class="h6 mb-0 timeline-label">{3}</div>';
		var rangeStyle = '<div role="button" data-toggle="popover" data-trigger="focus" data-html="true" title="{0} ({1}, {2})" data-content="{3}" id="{4}" class = "alert alert-info"></div>';

		var creationTimeline = new BibleTimelineEvents(creationData, 'timeline_creation', 'card_title_creation',"LÍNEA DEL TIEMPO DESDE LA CREACIÓN HASTA EL DILUVIO ",eventStyle, rangeStyle, "_creation", "box")
		creationTimeline.drawRangeTimeline();

		creationTimeline.initializeControlsEvents(undefined);
		
		creationTimeline.onRangeChange();
		creationTimeline.onItemSelected();

		populateFamilytree(creationData);
	});
}