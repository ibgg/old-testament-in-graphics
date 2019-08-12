class BibleTimelineEvents{
	constructor(data, contentDiv, titleDiv, timelineTitle, eventStyle, rangeStyle, postfix, itemType){
		this.data = data;
		this.contentDiv = contentDiv;
		this.titleDiv = titleDiv;
		this.timelineTitle = timelineTitle;
		this.eventStyle = eventStyle;
		this.rangeStyle = rangeStyle;
		this.postfix = postfix;
		this.itemType = itemType;

		this.timeline = undefined;
		this.searchIndex = 0;
		this.options = {
			"width":  "100%",
			"locale": "es"
		};
		this.options.itemType = itemType;
	}

	setTimelineData(data){
		this.data = data;
	}

	setContentDiv(contentDiv){
		this.contentDiv = contentDiv	
	}
	
	setTitleDiv(titleDiv){
		this.titleDiv = titleDiv;
	}

	setTimelineTitle(timelineTitle){
		this.timelineTitle = timelineTitle;
	}

	setEventStyle(eventStyle){
		this.eventStyle = eventStyle;
	}

	setRangeStyle(rangeStyle){
		this.rangeStyle = rangeStyle;
	}

	setPostfix(postfix){
		this.postfix = postfix;
	}

	setItemType(itemType){
		this.itemType = itemType;
	}

	getData(){
		return this.data;
	}

	getTimeline(){
		return this.timeline;
	}

	getPostfix(){
		return this.postfix;
	}

	onItemSelected(style){
		var self = this;
		google.visualization.events.addListener(self.timeline, 'select', function(){
			var row = getSelectedRow(self.timeline);
			self.onTimelineItemSelected(row, style);
		});
	}

	onTimelineItemSelected (row, classname){
		var self = this;
		if (row != undefined) {
			$('#'+self.data[row].event_name.replace(/ /g,'')+self.postfix).popover('toggle');
			$('#'+self.data[row].event_name.replace(/ /g,'')+self.postfix).popover('update');
			$('#'+self.data[row].event_name.replace(/ /g,'')+self.postfix).toggleClass('alert-danger');
			$('#close_'+self.data[row].event_name.replace(/ /g,'')+self.postfix).on('click', function (e){
				self.timeline.selectItem(row);
				google.visualization.events.trigger(self.timeline, 'select', {});
			});
		}else{
			for (var i = 0; i < self.data.length; i++){
				$('#'+self.data[i].event_name.replace(/ /g,'')+self.postfix).popover('hide');
				$('#'+self.data[i].event_name.replace(/ /g,'')+self.postfix).removeClass('alert-danger');
				$('#'+self.data[i].event_name.replace(/ /g,'')+self.postfix).addClass(classname);
			}
		}
	}

	onRangeChange(){
		var self = this;
		google.visualization.events.addListener(self.timeline, 'rangechange', function (){
			updatePopupOnTimelineChange(self.timeline, self.data, self.postfix);	
		});
	}

	onSynhronizedRangeChange(timeline2, data2, postfix2){
		var self = this;
		google.visualization.events.addListener(self.timeline, 'rangechange', function (){
			var range = self.timeline.getVisibleChartRange();
			timeline2.setVisibleChartRange(range.start, range.end);
		
			updatePopupOnTimelineChange(self.timeline, self.data, self.postfix);
			updatePopupOnTimelineChange(timeline2, data2, postfix2);
		});
	}


	initializeControlsEvents(timeline2){
		var self = this;
		//$('#close_'+this.)
		$('#search'+this.postfix).on('keydown', function(e){
			if (e.keyCode == 13) {
				e.preventDefault();
				
				var king_to_search =  $('#search' + self.postfix).val().trim();
				self.searchEvent(king_to_search, timeline2);
				return false;
			}
		});
		
		$('#btn'+this.postfix).on('click', function (e){
			e.preventDefault(); // To prevent following the link (optional)
			var king_to_search =  $('#search' + self.postfix).val().trim();
			self.searchEvent(king_to_search, timeline2);
		});
		
		$('#adjust_view'+this.postfix).on('click', function (e){
			e.preventDefault();
	
			adjustVisibleTimeRangeToAccommodateAllEvents(self.timeline, self.data, self.postfix);
			var range = self.timeline.getVisibleChartRange();
			if (timeline2)
				timeline2.setVisibleChartRange(range.start, range.end);
		});
		
		$('#zoom_in'+this.postfix).on('click', function (e){
			e.preventDefault();
			zoomTimeline(self.timeline, 0.4);
		});
		
		$('#zoom_out'+this.postfix).on('click', function (e){
			e.preventDefault();
			zoomTimeline(self.timeline, -0.4);
		});
	}

	drawBoxTimeline(){
		var self = this;
		this.dataTable = new google.visualization.DataTable();
		this.dataTable.addColumn('datetime', 'start');
		this.dataTable.addColumn('string', 'content');	
		this.dataTable.addColumn('string', 'className');
	
		this.data.forEach(function (element, index){
			var startDate = new Date(element.start_date);
			self.dataTable.addRow([
					startDate,  
					self.eventStyle.format(
						element.event_name.length > 18 ? element.event_name.substring(0,18)+"..." : element.event_name, 
						Math.abs(startDate.getFullYear()) + " a.C.",
						"close_"+element.event_name.replace(/ /g,'')+self.postfix,
						element.description, 
						element.event_name.replace(/ /g,'')+self.postfix, 
						element.event_name), 
					'no-border'
			]);
		});

		// Instantiate our timeline object.
		this.timeline = new links.Timeline(document.getElementById(this.contentDiv), this.options);

		// Draw our timeline with the created data and options
		this.timeline.draw(this.dataTable);
	
		document.getElementById(this.titleDiv).innerHTML = this.timelineTitle + " - (" + this.data.length + ")";
	}

	drawRangeTimeline(){
		var self = this;
		this.dataTable = new google.visualization.DataTable();
		this.dataTable.addColumn('datetime', 'start');
		this.dataTable.addColumn('datetime', 'end');
		this.dataTable.addColumn('string', 'content');	
		this.dataTable.addColumn('string', 'rangeStyle');
		this.dataTable.addColumn('string', 'type');
	
		this.data.forEach(function (element, index){
			var startDate = element.start_date != undefined ? new Date(element.start_date) :  undefined;
			var endDate = element.end_date != undefined ? new Date(element.end_date) : undefined;
			var popOverDescription = element.biblical_quote != undefined ? element.biblical_quote + ". " + element.description : element.description;
			var type = "range";
			if (element.start_date == undefined || element.end_date == undefined){
				type = "floatingRange"
			}
	
			self.dataTable.addRow([
					startDate,  
					endDate, 
					self.eventStyle.format(
						element.event_name + ' - '+element.biblical_quote, 
						element.description, 
						element.event_name.replace(/ /g,'')+self.postfix,
						element.event_name), 
					self.rangeStyle.format(
						element.event_name.length > 18 ? element.event_name.substring(0,18)+"..." : element.event_name, 
						startDate != undefined ? startDate.getFullYear() : '', 
						endDate != undefined ? endDate.getFullYear() : '', 
						"close_"+element.event_name.replace(/ /g,'')+self.postfix,
						popOverDescription, 
						element.event_name.replace(/ /g,'')+self.postfix),
					type
					]);		
		});	

		this.timeline = new links.Timeline(document.getElementById(this.contentDiv), this.options);
	
		this.timeline.draw(this.dataTable);
	
		document.getElementById(this.titleDiv).innerHTML = this.timelineTitle + " - (" + this.data.length + ")";
	}

	searchEvent(word, timeline2){
		var self = this;
		var count = 0;
		while (count < this.data.length){
			if (count > this.data.length) break;
			this.searchIndex++;
			var module = this.searchIndex % this.data.length;
			var event_name = this.data[module].event_name.toLowerCase();
			if (event_name.search(word.toLowerCase()) > -1){
				this.searchIndex = module;

				animateTo(new Date(self.data[self.searchIndex].start_date), self.timeline, self.searchIndex);
				if (timeline2 != undefined) animateTo(new Date(self.data[self.searchIndex].start_date), timeline2.getTimeline(), -1);
			}
			count++;
		}
	}
}