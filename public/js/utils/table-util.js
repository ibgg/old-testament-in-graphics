var setupTable = function (postfix, timeline1, timeline2, config){
	var israel_kings_card_title_id = $("#card_title_israel").get(0);
	var israel_kings_card_title_position = israel_kings_card_title_id.getBoundingClientRect().top + window.scrollY;

	var optionsData ={
		ordering:false,
		select: true,
		"language": {
			"url": "data/spanish.json"
		}
	}
	if (config != undefined){
		optionsData = {
			ordering:config.ordering,
			select: config.select,
			searching: config.searching,
			paging: config.paging,
			"language": {
				"url": "data/spanish.json"
			}
		}
	}
	var table = $('#dataTable'+postfix).DataTable(optionsData);

	if (timeline1 != null && timeline1 != undefined && timeline2 != null && timeline2 != undefined){
		table.on('select', function (e, dt, type, indexes){
			if (type === 'row'){
				timeline1.searchEvent((timeline1.getData()[indexes]).event_name, timeline2);
	
				window.scroll({
				  top: israel_kings_card_title_position,
				  behavior: 'smooth'
				});
			}
		});	
	}
	
	/*
	for (var i = 0; i< data.length; i++){
		var period = getPeriod(new Date(data[i].start_date), new Date(data[i].end_date));
		var row = [ data[i].event_name, period , data[i].biblical_quote];

		$('#dataTable'+postfix).DataTable().row.add(row).draw();	
	}
	*/
}
