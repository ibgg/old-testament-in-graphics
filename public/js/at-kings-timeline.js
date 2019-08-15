/* Las citas bíblicas para los reyes de Judá fueron completadas del Manual Bíblico de MacArthur */
var general_event = {
	title: "LOS REYES EN EL REINO DIVIDIDO",
	description: "<p>Para poder registrar las fechas exactas es necesario averiguar cuál era el sistema bíblico para registrar las fechas tanto en el reino de Israel como el de Judá, además, es necesario comparar las fechas con datos extrabíblicos de los gobernantes asirios y babilonios. Para esto es necesario también determinar la forma en cómo estos fechaban su cronología. <p><div class = \"m-0 font-weight-bold\" >Las listas asirias</div><p> Es posible fechar a los reyes asirios a partir de las listas de <i>epónimos</i> (Un <i>epónimo</i> es el nombre de una persona que ha sido elegida para designar todo un periodo. Los asirios tenían una lista de nombres de personas importantes y cada año era designado con el nombre de uno de éstos) de los asirios. En Nínive y otras ciudades asirias se hallaron tablillas de arcilla que dan los nombres de estos <i>epónimos</i>. Estas listas abarcan en total, un periodo que va desde el 892 hasta el 648 a.C. Durante este periodo, varios de estos líderes asirios establecieron contratos con reyes hebreos, lo que nos ayuda a fijar las fechas para la cronología bíblica en este periodo.<p>Los registros asirios mencinan que durante el mes de Simanu, cuando gobernaba <b>Bur-Sagale</b> ocurrió un eclipse de sol, y los astrónomos han encontrado que en el 15 de Junio del 763 ocurrió un eclipse, por lo tanto, podemos afirmar que <b>Bur-Sagale</b> gobernó en el año 763 a.C.<p>Por otro lado, otra tablilla dice que el líder asirio <b>Daian-Asur</b> gobernó durante el año sexto de <b>Salmanasar III</b>. Durante ese mismo año, los asirios enfrentaron una batalla en Qarqar contra unos reyes en la costa del Mediterráneo. Además, otra tablilla menciona que el rey <b>Acab</b> de Israel se encontraba entre estos reyes, y aún más, otra lista asiria nos dice que la fecha de esa batalla ocurrió en el 835 a.C.<p>Existe otra lista de <i>epónimos</i> la que se menciona que cierto rey I-a-a-u comenzó a pagar tributos a <b>Salmanasar III</b> en el año octavo de su reinado (841 a.C.); es muy probable que este rey fuese <b>Jehú</b>, rey de Israel.<p><div class = \"m-0 font-weight-bold\" >Dos sistemas para determinar fechas</div><p>En el libro de Reyes, la información cronológica adopta por lo menos tres formas: <ol><li>Las notas sobre la ascensión de un reino suelen sincronizarse con el año en que otro reino se encontraba siendo ejercido, calculado a partir de su ascensión al trono. Por ejemplo, leemos que <b>Zimri</b> reinó una semana en el año setenta y dos de <b>Asa</b> (1 R 16:15), o que <b>Jorán</b> (o <b>Joram</b>), hijo de <b>Josafat</b> comenzó su reinado en el año quinto de <b>Jorán</b> (o <b>Joram</b>), el hijo de <b>Acab</b></li><li>Los relatos sobre la ascensión normalmente mencinoan la duración del reinado del rey. Por ejemplo, <b>Jorán</b> reinó durante ocho años (2 R 8:17) y su padre, <b>Josafat</b> gobernó durante veinticinco años (1 R 22:42)</li><li>De forma periódica, los eventos entre los reinos se sincronizan con eventos que ocurrieron en otras naciones.</li></ol></p> <p>Por otro lado, es necesario mencionar que tanto los grandes imperios que rodeaban a Israel, como Israel mismo utilizaron prácticas distintas para calcular la duración de un reinado. En Israel normalmente se antedataba (o se fechaba el inicio del renado por el año de <i>no-ascensión</i>), lo que significa que el primer año del gobierno de un rey se contaba a partir del mes de su ascenso al trono, sin importar si solo faltaba un mes para que terminara el año, ese primer año ya se contaba como un año completo de reinado. Esta práctica era llevada también en Egipto, por otro lado, en Mesopotamia se posdataba (o se utilizaba el método de ascensión), es decir, el periodo entre el tiempo de ascensión del rey y el año nuevo era contado como \"el año del comienzo del reinado\", pero este periodo no era contado como parte del periodo del reinado. De esta forma, si un rey ascendía al trono  poco después de haber comezado el año, ese primer año no era contado como parte del periodo de su reinado, sino su reinado se contaba a partir del siguiente año. Este sistema de conteo de duración del reinado fue mayormente utilizado en Judá, sin embargo, es posible que ocasionalmente hubieran cambiado el sistema de conteo, cuando el reino del norte influyó máyormente sobre Judá. Bajo el reinado de Jorán (o Joram), Judá adoptó el sistema de no-ascensión para fechar sus periodos de reinado, y lo usó durante dos años. <p>Algo más que hay que considerar cuando se estudian las fechas de los reyes, es la superposición de los reinos, lo que podía suceder cuando un hijo gobernaba al mismo tiempo que su padre. <p>Aunque es cierto que existen muchas dificultades para establecer la fecha exacta de los eventos del Antiguo Testamento, es posible hacer un análisis (como se presenta aquí) para determinar una aproximación de los eventos bíblicos reelevantes. Tomaremos aquí como base el comienzo del año del reinado de Jehú (en el año 841 a.C.) para determinar los eventos previos a este suceso, y luego se tomará este mismo año como pivote para determinar las fechas de los eventos posteriores a este. Además, a cada periodo del reinado de los reyes de Israel se restará un año de reinado, ya que como se mencionó, Israel utilizaba un sistema de fechado de no-ascensión.<p>&nbsp;<hr class = \"dotted\">REFERENCIAS<p><ul><li>Packer, James I., Merril C. Tenney, and William White. <i>El Mundo Del Antiguo Testamento</i>. Deerfield, FL: Editorial Vida, 1997.</li><li>Longman, Tremper, and Raymond B. Dillard. <i>Introducción Al Antiguo Testamento</i>. Grand Rapids, MI: Libros Desafío, 2007.</li></ul>"
}

$(document).ready(function(){
	google.load("visualization", "1");
	google.setOnLoadCallback(initTimelines);
	
	$('[data-toggle="popover"]').popover(); 
	document.getElementById('general-event-title').innerHTML = general_event.title;
	document.getElementById('general-event-description').innerHTML = general_event.description;
});


var loadData = function (json_file){
	return new Promise(function (resolve, reject){
		loadJSONData(json_file).then(function (response){
			var actual_JSON = JSON.parse(response);	
			if (actual_JSON != null && actual_JSON != undefined){
				resolve(actual_JSON);
			}else{
				reject();
			}
		})
	});
}

var addDataToTable = function (data, postfix){
	for (var i = 0; i< data.length; i++){
		var period = getPeriod(new Date(data[i].start_date), new Date(data[i].end_date));
		var row = [ data[i].event_name, period , data[i].biblical_quote];

		$('#dataTable'+postfix).DataTable().row.add(row).draw();	
	}
}

var initTimelines = function(){
	loadData("data/at-kings-timeline-israel.json")
	.then(function (israelData){
		var eventStyle = '<div class="h6 mb-0 timeline-label">{3}</div>';
		var israelRangeStyle = '<div role="button" data-toggle="popover" data-trigger="focus" data-html="true" title="{0} ({1}, {2}) <a class=&quot;close&quot; href=&quot;#!&quot; id=&quot;{3}&quot;>&times;</a>" data-content="{4}" id="{5}" class = "alert alert-info"></div>';

		var israelTimeline = new BibleTimelineEvents(israelData, 
			'timeline_israel', 
			'card_title_israel',
			"LÍNEA DEL TIEMPO DE LOS REYES DE ISRAEL", 
			eventStyle,
			israelRangeStyle,
			"_israel", "range");
		
		israelTimeline.drawRangeTimeline();

		loadData("data/at-kings-timeline-judah.json")
		.then(function (judaData) {
			var judahRangeStyle = '<div role="button" data-toggle="popover" data-trigger="focus" data-html="true" title="{0} ({1}, {2}) <a class=&quot;close&quot; href=&quot;#!&quot; id=&quot;{3}&quot;>&times;</a>" data-content="{4}" id="{5}" class = "alert alert-success"></div>';
			var judahTimeline = new BibleTimelineEvents(
				judaData,
				'timeline_judah', 
				'card_title_judah',
				"LÍNEA DEL TIEMPO DE LOS REYES DE JUDÁ", 
				eventStyle,
				judahRangeStyle,
				"_judah",
				"range"
			);
			judahTimeline.drawRangeTimeline();

			israelTimeline.initializeControlsEvents(judahTimeline);
			judahTimeline.initializeControlsEvents(israelTimeline);
			
			israelTimeline.onSynhronizedRangeChange(judahTimeline.getTimeline(), judahTimeline.getData(), judahTimeline.getPostfix());
			judahTimeline.onSynhronizedRangeChange(israelTimeline.getTimeline(), israelTimeline.getData(), israelTimeline.getPostfix());

			israelTimeline.onItemSelected();
			judahTimeline.onItemSelected();
			
			setupTable(israelTimeline.getPostfix(), israelTimeline, judahTimeline);
			setupTable(judahTimeline.getPostfix(), judahTimeline, israelTimeline);
			
			addDataToTable(israelTimeline.getData(), israelTimeline.getPostfix());
			addDataToTable(judahTimeline.getData(), judahTimeline.getPostfix());
		});
	});
}