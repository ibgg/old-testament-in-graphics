/*************** Métodos para eventos en items de timeline ************/
var israel_kings_card_title_id = $("#card_title_israel").get(0);
var israel_kings_card_title_position = israel_kings_card_title_id.getBoundingClientRect().top + window.scrollY;

$(document).ready(function(){
	google.load("visualization", "1");
	google.setOnLoadCallback(initTimelines);
	
	$('[data-toggle="popover"]').popover(); 
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
		console.log(data[i].event_name);
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

			israelTimeline.initializeControlsEvents(judahTimeline.getTimeline());
			judahTimeline.initializeControlsEvents(israelTimeline.getTimeline());
			
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