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
		this.searchIndex = -1;
		this.options = {
			"width":  "100%",
			"locale": "es"
		};
		this.options.itemType = itemType;
		this.startTimelineView;
		this.endTimelineView;
		this.zoomInFactor = 0.4;
		this.zoomOutFactor = -0.4;
		this.renderedTimeline = false;
	}

	setStartTimelineView(startTimelineView){
		this.startTimelineView = startTimelineView;
	}

	setEndTimelineView(endTimelineView){
		this.endTimelineView = endTimelineView;
	}

	getStartTimelineView(){
		return this.startTimelineView;
	}

	getEndTimelineView(){
		return this.endTimelineView;
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
			var row = self.getSelectedRow();
			self.onTimelineItemSelected(row, style);
		});
	}

	onTimelineItemSelected (row, classname){
		var self = this;
		if (row != undefined) {
			$('#'+self.data[row].event_name.replace(/ /g,'').replace(',','')+self.postfix).popover('toggle');
			$('#'+self.data[row].event_name.replace(/ /g,'').replace(',','')+self.postfix).popover('update');
			$('#'+self.data[row].event_name.replace(/ /g,'').replace(',','')+self.postfix).toggleClass('alert-danger');
			$('#close_'+self.data[row].event_name.replace(/ /g,'').replace(',','')+self.postfix).on('click', function (e){
				self.timeline.selectItem(row);
				google.visualization.events.trigger(self.timeline, 'select', {});
			});
		}else{
			for (var i = 0; i < self.data.length; i++){
				$('#'+self.data[i].event_name.replace(/ /g,'').replace(',','')+self.postfix).popover('hide');
				$('#'+self.data[i].event_name.replace(/ /g,'').replace(',','')+self.postfix).removeClass('alert-danger');
				$('#'+self.data[i].event_name.replace(/ /g,'').replace(',','')+self.postfix).addClass(classname);
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
	
			adjustVisibleTimeRangeToAccommodateAllEvents(self.timeline, self.data, self.postfix, self.startTimelineView, self.endTimelineView);
			var range = self.timeline.getVisibleChartRange();
			if (timeline2)
				timeline2.getTimeline().setVisibleChartRange(range.start, range.end);
		});
		
		$('#zoom_in'+this.postfix).on('click', function (e){
			e.preventDefault();
			self.zoomTimeline(self.zoomInFactor);
		});
		
		$('#zoom_out'+this.postfix).on('click', function (e){
			e.preventDefault();
			self.zoomTimeline(self.zoomOutFactor);
		});

		$('#download'+this.postfix).on('click', function (e){
			e.preventDefault();
			var jdomElement = $('#timeline'+self.postfix);
			var domElement = jdomElement.get(0);
			var filename = "timeline"+self.postfix+".png";

			domtoimage.toPng(domElement, {bgcolor: "#fff"})
			.then(function (dataUrl) {
				var img = new Image();
				img.src = dataUrl;
				saveAs(img.src, filename);
			})
			.catch(function (error) {
				console.error('oops, something went wrong!', error);
			});
		});
	}

	addData(event){
		var self = this;
		this.data.push(event)

		if (this.renderedTimeline == false){
			this.renderedTimeline = true;
			var startDate = event.start_date != undefined ? new Date(event.start_date) :  undefined;
			var endDate = event.end_date != undefined ? new Date(event.end_date) : undefined;
			var popOverDescription = event.biblical_quote != undefined ? event.biblical_quote + ". " + event.description : event.description;
			var type = "range";
			if (event.start_date == undefined || event.end_date == undefined){
				type = "floatingRange"
			}
	
			self.dataTable.addRow([
					startDate,  
					endDate, 
					self.eventStyle.format(
						event.event_name + ' - '+event.biblical_quote, 
						event.description, 
						event.event_name.replace(/ /g,'').replace(',','')+self.postfix,
						event.event_name), 
					self.rangeStyle.format(
						event.event_name.length > 18 ? event.event_name.substring(0,18)+"..." : event.event_name, 
						startDate != undefined ? startDate.getFullYear() : '', 
						endDate != undefined ? endDate.getFullYear() : '', 
						"close_"+event.event_name.replace(/ /g,'').replace(',','')+self.postfix,
						popOverDescription, 
						event.event_name.replace(/ /g,'').replace(',','')+self.postfix),
					type
					]);	

			console.log("here");
			console.log(this.dataTable);
			console.log(this.data);
			this.timeline = new links.Timeline(document.getElementById(this.contentDiv), this.options);
			this.timeline.draw(this.dataTable);
		}else{
			//this.timeline.addItem(event);
		}
	}

	drawTimeline(){
		var self = this;
		var itemStyle = '<div role="button" data-toggle="popover" data-trigger="focus" data-html="true" title="{0} ({1}) <a class=&quot;close&quot; href=&quot;#!&quot; id=&quot;{2}&quot;>&times;</a>" data-content="{3}" id="{4}" class = "timeline-box-label alert alert-success">{5}</div>';
		this.dataTable = new google.visualization.DataTable();
		this.dataTable.addColumn('datetime', 'start');
		this.dataTable.addColumn('datetime', 'end');
		this.dataTable.addColumn('string', 'content');	
		this.dataTable.addColumn('string', 'rangeStyle');
		this.dataTable.addColumn('string', 'className');
	
		this.data.forEach(function (element, index){
			var startDate = element.start_date != undefined ? new Date(element.start_date) :  undefined;
			var endDate = element.end_date != undefined ? new Date(element.end_date) : undefined;
			var popOverDescription = element.biblical_quote != undefined ? element.biblical_quote + ". " + element.description : element.description;
	
			self.dataTable.addRow([
					startDate,  
					endDate, 
					endDate == undefined ?
					itemStyle.format(
						element.event_name.length > 18 ? element.event_name.substring(0,18)+"..." : element.event_name, 
						Math.abs(startDate.getFullYear()) + " a.C.",
						"close_"+element.event_name.replace(/ /g,'').replace(',','')+self.postfix,
						element.description, 
						element.event_name.replace(/ /g,'').replace(',','')+self.postfix, 
						element.event_name) : self.eventStyle.format(element.event_name) , 
					self.rangeStyle != undefined ?
					self.rangeStyle.format(
						element.event_name.length > 18 ? element.event_name.substring(0,18)+"..." : element.event_name, 
						startDate != undefined ? startDate.getFullYear() : '', 
						endDate != undefined ? endDate.getFullYear() : '', 
						"close_"+element.event_name.replace(/ /g,'').replace(',','')+self.postfix,
						popOverDescription, 
						element.event_name.replace(/ /g,'').replace(',','')+self.postfix) : undefined, 
						'no-border'
					]);
		});	

		this.timeline = new links.Timeline(document.getElementById(this.contentDiv), this.options);
	
		this.timeline.draw(this.dataTable);
	
		document.getElementById(this.titleDiv).innerHTML = this.timelineTitle + " - (" + this.data.length + ")";
		var copyrightdiv = document.createElement("small");
		var textCopyright = document.createTextNode("Copyright © Old Testament in Graphics 2019");
		copyrightdiv.appendChild(textCopyright);

		document.getElementById(this.contentDiv).appendChild(copyrightdiv);

		$("#spinner"+this.postfix).remove();
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
						"close_"+element.event_name.replace(/ /g,'').replace(',','')+self.postfix,
						element.description, 
						element.event_name.replace(/ /g,'').replace(',','')+self.postfix, 
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
						element.event_name.replace(/ /g,'').replace(',','')+self.postfix,
						element.event_name), 
					self.rangeStyle.format(
						element.event_name.length > 18 ? element.event_name.substring(0,18)+"..." : element.event_name, 
						startDate != undefined ? startDate.getFullYear() : '', 
						endDate != undefined ? endDate.getFullYear() : '', 
						"close_"+element.event_name.replace(/ /g,'').replace(',','')+self.postfix,
						popOverDescription, 
						element.event_name.replace(/ /g,'').replace(',','')+self.postfix),
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
				break;
			}
			count++;
		}
	}

	goToEvent(index, timeline2){
		var self = this;
		animateTo(new Date(self.data[index].start_date), self.timeline, index);
		if (timeline2 != undefined) animateTo(new Date(self.data[index].start_date), timeline2.getTimeline(), -1);
	}

	zoomTimeline(zoomVal) {
		this.timeline.zoom(zoomVal);
		this.timeline.trigger("rangechange");
		this.timeline.trigger("rangechanged");
	}	


	getSelectedRow() {
		var row = undefined;
		var sel = this.timeline.getSelection();
		if (sel.length) {
			if (sel[0].row != undefined) {
				row = sel[0].row;
			}
		}
		return row;
	}

	downloadTimeline (jdomElement, postfix){
		var domElement = jdomElement.get(0);
		var timelineWidth = jdomElement.first()[0].clientWidth+20;
		var timelineHeight = jdomElement.first()[0].clientHeight;
		var offsety = jdomElement.offset().top;
		var filename = "timeline"+postfix;
	
			html2canvas(domElement, {height: timelineHeight, width: timelineWidth, y: offsety, scrollX:10}).then(function(canvas) {
				var link = document.createElement('a');
	
				if (typeof link.download === 'string') {
					link.href = canvas.toDataURL();
					link.download = filename;
			
					//Firefox requires the link to be in the body
					document.body.appendChild(link);
			
					//simulate click
					link.click();
			
					//remove the link when done
					document.body.removeChild(link);
				} else {
					window.open(canvas.toDataURL());
				}
			});
	}
	
}