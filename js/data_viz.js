WDP.display = {};
WDP.posts = {};

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
		var set = new WDP.set.countedSet();
		var postLinks = [];
		$(searchResults).find('a.hdrlnk').each(function(index) {
			var resultsLink = $(this);
			var title = resultsLink.text();
			var link = resultsLink.attr("href");
			//don't add links to nearby cities
			if(!link.match(/^http:/)){
				postLinks.push(link);
			}
			title.split(" ").map(function(word) {
				set.add(word);
			});
		});
		WDP.displayDataForSet(set);
		WDP.displayPostBodies(postLinks, set);
	})
	.fail(function(jqXHR, textStatus, error) {
		WDP.displayError("Sorry, could not connect to Craigslist.");
	});
}

WDP.displayPostBodies = function(postLinks, countedSet){
	WDP.posts.total = postLinks.length;
	WDP.posts.done = 0;

	postLinks.map(function(postLink) {
		$.ajax({
			url: WDP.baseUrl + 'data/cl-postbody',
			type: 'GET',
			dataType: 'html',
			data: {link : postLink, city : WDP.models.currentCity}
		})
		.done(function(post) {
			var postBody = $(post).find('#postingbody').text();
			postBody.split(" ").map(function(word) {
				countedSet.add(word);
			});
		})
		.fail(function() {
			console.log("Could not retrieve post body");
		}).always(function() {
			WDP.posts.done++;
			WDP.display.counter();
			if(WDP.posts.done >= WDP.posts.total){
				WDP.displayDataForSet(countedSet);	
			}
		});
	});
	
	
}

WDP.displayWordList = function(sortedCollection){
	var main_list = $('#main_list');
	sortedCollection.map(function(elem) {
		main_list.append("<li>" + elem.name + ' ('+ elem.amount + ")</li>");
	});
}


WDP.resetViz = function(){
    document.getElementById('viz-wrapper').innerHTML = '';
    document.getElementById('main_list').innerHTML = '';
}


WDP.displayDataForSet = function(countedSet){
	var sortedCollection = countedSet.getSortedCollection();
	WDP.resetViz();
	if(sortedCollection.length === 0){
		WDP.displayError("Sorry, no results found.");
		return;
	}
	WDP.displayWordList(sortedCollection);
	WDP.displayViz(sortedCollection);
}

WDP.display.counter = function(){
	document.getElementById('progress-counter').innerHTML = 'Results scanned: ' + WDP.posts.done + '/' + WDP.posts.total;
}
















