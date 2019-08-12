var addDataToFamilyTree = function (parentsRelationshipTable, data, rows){
	var familyDataTree = new google.visualization.DataTable();
	familyDataTree.addColumn('string', 'Name');
	familyDataTree.addColumn('string', 'Manager');
	familyDataTree.addRows(rows);
	for (var i = 0; i < parentsRelationshipTable.length; i++){
		var row = [];
		for (var j = 0; j < parentsRelationshipTable[i].length; j++){
			if (data[parentsRelationshipTable[i][j]].start_date != undefined){
				var style = '{0}<br>({1})<br>{2}';
				var endDate = new Date(data [parentsRelationshipTable[i][j]].end_date);
				var startDate = new Date(data [parentsRelationshipTable[i][j]].start_date);
				var period = endDate.getFullYear() - startDate.getFullYear();
				var quote = data [parentsRelationshipTable[i][j]].biblical_quote;
				var name = data [parentsRelationshipTable[i][j]].event_name;
				row.push(style.format(name, period, quote));
			}else if (data[parentsRelationshipTable[i][j]].biblical_quote !== undefined){
				var style = '{0}<br>{1}';
				var quote = data [parentsRelationshipTable[i][j]].biblical_quote;
				var name = data [parentsRelationshipTable[i][j]].event_name;
				row.push(style.format(name, quote));
			}
		}
		familyDataTree.addRow(row);
	}
	return familyDataTree;
}

var drawFamilyTree = function(familyDataTree, div){
	var org = new google.visualization.OrgChart(document.getElementById(div));
	org.draw(familyDataTree, {
		theme: 'material',
		allowHtml:true, 
		allowCollapse: true, 
		nodeClass: "alert alert-info", 
		selectedNodeClass: "alert-danger"
	});  
}