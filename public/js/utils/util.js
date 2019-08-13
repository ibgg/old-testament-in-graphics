String.prototype.format = function() {
	a = this;
	for (k in arguments) {
	  a = a.replace("{" + k + "}", arguments[k])
	}
	return a
}

/************************ Animation *************************/
// create a simple animation
var animateTimeout = undefined;
var animateFinal = undefined;
function animateTo(date, timeline, index) {
    // get the new final date
    animateFinal = date.valueOf();
    timeline.setCustomTime(date);

    // cancel any running animation
    //animateCancel();

    // animate towards the final date
    var animate = function () {
        var range = timeline.getVisibleChartRange();
        var current = (range.start.getTime() + range.end.getTime())/ 2;
        var width = (range.end.getTime() - range.start.getTime());
        var minDiff = Math.max(width / 1000, 1);
        var diff = (animateFinal - current);
        if (Math.abs(diff) > minDiff) {
            // move towards the final date
            var start = new Date(range.start.getTime() + diff / 4);
            var end = new Date(range.end.getTime() + diff / 4);
            timeline.setVisibleChartRange(start, end);

            // start next timer
            animateTimeout = setTimeout(animate, 20);
        }else{
			if (index > -1){
				timeline.selectItem(index);
				google.visualization.events.trigger(timeline, 'select', {});
				google.visualization.events.trigger(timeline, 'rangechange', {});	
			}
		}
    };
    animate();
}

function animateCancel () {
    if (animateTimeout) {
        clearTimeout(animateTimeout);
        animateTimeout = undefined;
    }
}

// Actualiza el popup de un conjunto de datos
function updatePopupOnTimelineChange(timeline, data, postfix){
	var range = timeline.getVisibleChartRange();

	for (var i = 0; i < data.length; i++){
		var timeline_start = Math.abs(range.start.getTime());
		var timeline_end = Math.abs(range.end.getTime());
		var item_start =  timeline.getItem(i).end != undefined ? Math.abs(timeline.getItem(i).end.getTime()) : Math.abs(timeline.getItem(i).start.getTime());
		var item_end =   timeline.getItem(i).start != undefined ? Math.abs(timeline.getItem(i).start.getTime()) : Math.abs(timeline.getItem(i).end.getTime());
	
		if ((item_start > timeline_start && item_end > timeline_start) || (item_start < timeline_end && item_end < timeline_end)) {
			$('#'+data[i].event_name.replace(/ /g,'')+postfix).popover('hide');
		}else{
			if ($('#'+data[i].event_name.replace(/ /g,'')+postfix).hasClass("alert-danger")){
				$('#'+data[i].event_name.replace(/ /g,'')+postfix).popover('show');
				$('#close_'+data[i].event_name.replace(/ /g,'')+postfix).on('click', function (e){
					timeline.selectItem(i);
					google.visualization.events.trigger(timeline, 'select', {});
				});	
			}
			$('#'+data[i].event_name.replace(/ /g,'')+postfix).popover('update');
		}	
	}
}


/********* Buttons events **********/
function adjustVisibleTimeRangeToAccommodateAllEvents(timeline, data, postfix) {
	timeline.setVisibleChartRangeAuto();

	updatePopupOnTimelineChange(timeline, data, postfix);
}

function zoomTimeline(timeline, zoomVal) {
	timeline.zoom(zoomVal);
	timeline.trigger("rangechange");
	timeline.trigger("rangechanged");
}

function getSelectedRow(timeline) {
	var row = undefined;
	var sel = timeline.getSelection();
	if (sel.length) {
		if (sel[0].row != undefined) {
			row = sel[0].row;
		}
	}
	return row;
}

var getPeriod = function (start_date, end_date){
	var years = Math.abs( Math.abs(start_date.getFullYear()) - Math.abs(end_date.getFullYear()) );
	//console.log("start %d end %d years %d ", Math.abs(start_date.getFullYear()), Math.abs(end_date.getFullYear()),  years);
	if (years > 0){
		return years + " años";
	}else{
		var months = Math.abs(end_date.getMonth()) - Math.abs(start_date.getMonth());
		if (months > 1){
			return months + " meses";
		}else if (months == 1){
			return months + " mes";
		}else if (months == 0){
			var days = Math.abs(end_date.getDate()) - Math.abs(start_date.getDate());
			if (days > 1)
				return days + " días";
			else
				return days + " día";
		}
	}
}

function loadJSONData(jsonFile){
	 return new Promise (function (resolve, reject){
		var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    	xobj.open('GET', jsonFile, true);
    	xobj.onreadystatechange = function () {
          	if (xobj.readyState == 4 && xobj.status == "200") {
				resolve(xobj.responseText)
			}
    	};
    	xobj.send(null);  
	 });
 }

 function searchInTimeline(data, index){
	 if (index > data.length) return -1;
	 for (var i = index; i < data.length; i++){
		if (data[i].event_name.toLowerCase().search(item_name.toLowerCase()) > -1){
			return i;
		}
	 }	 
 }