var general_event = {
	title: "DESDE EL DILUVIO HASTA ABRAHAM",
	description: "<p>Este periodo de tiempo es sin duda el que propone los problemas más difíciles de resolver, pues ya no es posible comprobar las fechas bíblicas con los registros históricos de las naciones que rodean a Israel. Además, hay diferencias considerables en las distintas versiones del Antiguo Testamento en cuanto a la historia anterior a los patriarcas. Se utiliza aquí el texto masorético, sin embargo se comparará su información con otras versiones antiguas en algunos puntos específicos. <p>Es la genealogía de <b>Abraham</b> la que nos proporciona la información necesaria para fechar este periodo. Observemos que <b>Abraham</b> nació en el año 2166 a.C., y falleció en el 1991 a.C. Con base en esto, es posible fechar casi todos los precesores a <b>Abraham</b> hasta el diluvio. <p><b>Arfaxad</b>, Se plantea aquí un problema particular, no con él, sino con su predecesor, <b>Cainán</b>, ya que aunque este no aparece descrito en el texto masorético, sí aparece descrito en la septuaginta como padre de <b>Sala</b> (aunque el texto masorético afirma que el padre de <b>Sala</b> habría sido <b>Arfaxad</b>). Esta discrepancia trae consigo un problema para fechar el nacimiento de <b>Arfaxad</b>, y es por eso que no aparece en el timeline de esta sección, pues resultaría más que impreciso fecharlo. Sin embargo, lo que sí sabemos de <b>Arfaxad</b> es que nació dos años después del diluvio (Gn 11:10) y que además vivió unos 400 años más después del nacimiento de su hijo (ya sea <b>Sala</b> o <b>Cainán</b>). <p><b>Sem</b>. Sem tenía 100 años cuando nació su hijo <b>Arfaxad</b> (y es debido a que la fechas se establecieron en retroceso, y a que <b>Sem</b> es padre de <b>Arfaxad</b> que tampoco podemos fijar su fecha de nacimiento), y vivió 600 años en total (Gn 11:10,11). <p>Las cifras anteriores desencadenan algunos problemas peculiares asociados con la longevidad de los primeros patriarcas. ¿Deben los años tomarse como años calendarios? ¿Por qué <b>Cainán</b> se encuentra en la Septuaginta, mientras en el texto masorético está omitido? ¿Es posible que existan vacíos en esta genealogía? Hay quienes afirman que efectivamente, hay algunas omisiones en esta cronología, y en este registro únicamente se incluyeron los nombres más sobresalientes. <p>Ahora bien, si tomamos al pie de la letra el texto masorético <b>Heber</b> vivió hasta después de que <b>Abraham</b> entró a Canaán, sin embargo, esto no tiene por qué ser así si hay vacíos en las listas genealógicas.<p>Por otro lado tenemos otro problema que es necesario mencionar. El lapso de los 520 años desde <b>Cainán</b> hasta la entrada de <b>Abraham</b> en Canaán no guarda relación con otras versiones del Antiguo Testamento. La Septuaginta, por su lado, dice que pasaron 1232 años desde el diluvio hasta el viaje de <b>Abraham</b> a Canaán, sin embargo, por otro lado, el Pentateuco Samaritano dice que pasaron 942 años. Ahora bien, lamentablemente no es posible constatar ninguna de estas cifras, pero a partir del descubrimiento de los rollos del Qumrán, se piensa que poisblemente el texto masorético es el auténtico. <p>Así, la mejor conclusión es que la cronología descrita en Gn 11 corresponde a una genealogía de épocas, más que de personas específicas. Es decir, únicamente nos proporciona nombres de algunos personajes importantes de la lista genealógica correcta, pero esta genealogía no es necesariamente una secuencia de padre a hijo. Y por extraño que parezca, este método de genealogías por épocas era comúnmente aceptado en el mundo antiguo."
}

$(document).ready(function(){
	google.load("visualization", "1");
	google.charts.load("current", {packages: ["orgchart"]});
	google.setOnLoadCallback(initTimelines);

	$('[data-toggle="popover"]').popover(); 
	document.getElementById('general-event-title').innerHTML = general_event.title;
	document.getElementById('general-event-description').innerHTML = general_event.description;
});

function populateFamilytree(data) {
	var noahFamily = [
		{
			'event_name': 'Noé',
			'biblical_quote':'Gn 9:28,29',
			'years':950
		},
		{
			'event_name': 'Sem',
			'biblical_quote':'Gn 10:1;11:10,11',
			'years':600
		},
		{
			'event_name': 'Cam',
			'biblical_quote':'Gn 10:1',
		},
		{
			'event_name': 'Jafet',
			'biblical_quote':'Gn 10:1',
		},
		{
			'event_name': 'Arfaxad',
			'years':438,
			'biblical_quote':'Gn 11:10-11',
		},
	];

	var haranFamily = [
		{
			'event_name': 'Harán',
			'biblical_quote':'Gn 11:27',
		},
		{
			'event_name': 'Lot',
			'biblical_quote':'Gn 11:31',
		},
		{
			'event_name': 'Moab',
			'biblical_quote':'Gn 19:37',
		},
		{
			'event_name': 'Amón',
			'biblical_quote':'Gn 19:38',
		},
	];

	var abrahamFamily = [
		{
			'event_name': 'Ismael',
			'biblical_quote':'Gn 16:4',
		},
		{
			'event_name': 'Isaac',
			'biblical_quote':'Gn 21:2-3',
		},
		{
			'event_name': 'Madián',
			'biblical_quote':'Gn 25:2',
		},
		{
			'event_name': 'Jacob',
			'biblical_quote':'Gn 25:26',
		},
		{
			'event_name': 'Esaú',
			'biblical_quote':'Gn 25:25',
		},
		{
			'event_name': 'Doce Tribus',
			'biblical_quote':'Gn 35:22-26',
		},
	];
	var parentsRelationshipTable = [[0,0], [1,0], [2,0], [3,0], [4,1], [5,4], [6,5], [7,6], [8,7], [9,8], [10,9], [11,10], [12,11], [13,12], [14,12], [15,14], [16,15], [17,15], [18,13], [19,13], [20,13], [21,19], [22,19], [23,21],];

	var noahToAbrahamFamilyData = [];
	// Agregamos a noé y sus hijos
	for (var i = 0; i < noahFamily.length; i++){
		noahToAbrahamFamilyData.push(noahFamily[i]);
	}

	// Agregamos el genalógico de Sem
	for (var i = 0; i < data.length; i++){
		noahToAbrahamFamilyData.push(data[i]);
	}

	// Agregamos el genealógico de Harán
	for (var i = 0; i < haranFamily.length; i++){
		noahToAbrahamFamilyData.push(haranFamily[i]);
	}

	// Agregamos el genealógico de Abraham
	for (var i = 0; i < abrahamFamily.length; i++){
		noahToAbrahamFamilyData.push(abrahamFamily[i]);
	}

	var noahToAbrahamFamilyDataTree = addDataToFamilyTree(parentsRelationshipTable, noahToAbrahamFamilyData, 40);
	drawFamilyTree(noahToAbrahamFamilyDataTree, 'org_div');
}

var initTimelines = function(){
	var ref = firebase.database().ref("timelines");
	ref.orderByChild('group_id').equalTo('universal_flood').once('value', function (snapshot){
		universalFloodData = [];
		var eventStyle = '<div class="h6 mb-0 timeline-label">{0}</div>';
		var rangeStyle = '<div role="button" data-toggle="popover" data-trigger="focus" data-html="true" title="{0} ({1}, {2}) <a class=&quot;close&quot; href=&quot;#!&quot; id=&quot;{3}&quot;>&times;</a>" data-content="{4}" id="{5}" class = "alert alert-info"></div>';

		for (var key in snapshot.val()) {
			if (snapshot.val().hasOwnProperty(key)) {
				universalFloodData.push(snapshot.val()[key]);
			}
		}

		var universalFloodTimeline = new BibleTimelineEvents(universalFloodData, 'timeline_universal_flood', 'card_title_universal_flood',"LÍNEA DEL TIEMPO DESDE EL DILUVIO HASTA ABRAHAM ",eventStyle, rangeStyle, "_universal_flood", "box");
		universalFloodTimeline.drawTimeline();
		universalFloodTimeline.initializeControlsEvents(undefined);
		universalFloodTimeline.onRangeChange();
		universalFloodTimeline.onItemSelected();
		
		populateFamilytree(universalFloodTimeline.getData());

		$('#sidebarToggle').on('click', function (){
			universalFloodTimeline.getTimeline().redraw();
		});
	});
	/*
	loadJSONData("data/at-universal-flood-data.json").then(function (universalFloodData){
		universalFloodData = JSON.parse(universalFloodData);
		var eventStyle = '<div class="h6 mb-0 timeline-label">{0}</div>';
		var rangeStyle = '<div role="button" data-toggle="popover" data-trigger="focus" data-html="true" title="{0} ({1}, {2}) <a class=&quot;close&quot; href=&quot;#!&quot; id=&quot;{3}&quot;>&times;</a>" data-content="{4}" id="{5}" class = "alert alert-info"></div>';

		var universalFloodTimeline = new BibleTimelineEvents(universalFloodData, 'timeline_universal_flood', 'card_title_universal_flood',"LÍNEA DEL TIEMPO DESDE EL DILUVIO HASTA ABRAHAM ",eventStyle, rangeStyle, "_universal_flood", "box");
		universalFloodTimeline.drawTimeline();
		universalFloodTimeline.initializeControlsEvents(undefined);
		universalFloodTimeline.onRangeChange();
		universalFloodTimeline.onItemSelected();
		
		populateFamilytree(universalFloodTimeline.getData());

		$('#sidebarToggle').on('click', function (){
			universalFloodTimeline.getTimeline().redraw();
		});
	});
	*/
}