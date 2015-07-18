WDP.displayViz = function(data){
	//height and width of svg
	var height = window.innerHeight;
	var width = window.innerWidth;
	var padding = 0;

	var viz = d3.select("#viz-wrapper")
					.append('svg')
					.attr('id', 'viz')
					.attr('height', height)
					.attr('width', width)
					.append('g');

	var rDomain = d3.extent(data, function(d){
        return d.amount;
    });
	var rScale = d3.scale.linear().domain(rDomain).range([1, 25]);

	var dots = viz.selectAll('g.dots').data(data).enter().append('g').attr('class', 'dots');
	dots.attr('transform', function(d){
		var x = Math.max(padding, Math.random() * width - padding);
		var y = Math.max(padding, Math.random() * height - padding);
		return "translate(" + x + ", " + y + ")";
	});

	dots.append('circle').attr('r', function(d){ return rScale(d.amount); });
	dots.append('text').text(function(d){return d.name;});

	/*
	//background rectangles are being created, but I cannot get them to show up for some reason
	viz.selectAll("text").each(function(d, i){
		var bbox = this.getBBox();
		console.log(bbox);
		var padding = 2;
		var rect = d3.select(document.createElement("rect"))
			.attr("x", bbox.x - padding)
		    .attr("y", bbox.y - padding)
		    .attr("width", bbox.width + (padding*2))
		    .attr("height", bbox.height + (padding*2))
		    .attr('class', 'word_label_background');
		this.parentNode.insertBefore(rect.node(), this.nextSibling);

	});
	*/
}


WDP.displaySearchViz = function(requestData){
	$.ajax({
		url: WDP.baseUrl + 'data',
		type: 'POST',
		dataType: 'html',
		data: requestData
	})

	.done(function(searchResults) {
		if(searchResults.match(/^This IP has been automatically blocked./i)){
			WDP.displayError("Sorry, but it appears that Craigslist has blocked this site from collecting data.");
			console.error(searchResults);
			return;
		}
		var set = new WDP.countedSet();
		$(searchResults).find('a.hdrlnk').each(function(index) {
			var resultsLink = $(this);
			var title = resultsLink.text();
			title.split(" ").map(function(word, index) {
				set.add(word);
			});
		});
		var main_list = $('#main_list');
		var sortedCollection = set.getSortedCollection();
		//remove previous viz
		WDP.resetViz();
		if(sortedCollection.length === 0){
			WDP.displayError("Sorry, no results found.");
			return;
		}
		sortedCollection.map(function(elem) {
			main_list.append("<li>" + elem.name + ' ('+ elem.amount + ")</li>");
		});
		WDP.displayViz(sortedCollection);
	})
	.fail(function(jqXHR, textStatus, error) {
		WDP.displayError("Sorry, could not connect to Craigslist.");
	});
}


WDP.resetViz = function(){
    $('#viz-wrapper').html('');
    $('#main_list').html('');
}















