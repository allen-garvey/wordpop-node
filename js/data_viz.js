WDP.display = {};
WDP.posts = {};
WDP.detailViz = {}; //toplevel container for city detail viz

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
/*
* called to init detail viz when getCraigslist data finishes
*/
WDP.detailViz.init = function(searchResults){
	WDP.error.clear();
	var categorySetFactory = new WDP.set.countedCategorySetFactory();
	var categorySet = categorySetFactory.makeCountedCategorySet(WDP.models.subCategoryTypeName);
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
			categorySet.add(word);
		});
	});
	WDP.displayDataForSet(set, categorySet);
	WDP.displayPostBodies(postLinks, set, categorySet);
}

/*
* Request data is WDP.init.CraigslistRequestData object
* successFunc is called on success with no errors, takes parameter of the data returned, optional parameter of original requestData
*/
WDP.getCLPage = function(requestData, successFunc){
	$.ajax({
		url: WDP.baseUrl + 'data',
		type: 'POST',
		dataType: 'html',
		data: requestData
	})

	.done(function(searchResults) {
		if(searchResults.match(/^This IP has been automatically blocked./i)){
			WDP.error.display("Sorry, but it appears that Craigslist has blocked this site from collecting data.");
			console.error(searchResults);
			return;
		}
		successFunc(searchResults, requestData);
	})
	.fail(function(jqXHR, textStatus, error) {
		WDP.error.display("Sorry, could not connect to Craigslist.");
	});
}

WDP.displayPostBodies = function(postLinks, countedSet, categorySet){
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
				categorySet.add(word);
			});
		})
		.fail(function() {
			console.log("Could not retrieve post body");
		}).always(function() {
			WDP.posts.done++;
			WDP.display.counter();
			if(WDP.posts.done >= WDP.posts.total){
				WDP.displayDataForSet(countedSet, categorySet);
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
    document.getElementById('category-bar-graph-wrapper').innerHTML = '';
}


WDP.displayDataForSet = function(countedSet, categorySet){
	var sortedCollection = countedSet.getSortedCollection();
	WDP.resetViz();
	if(sortedCollection.length === 0){
		WDP.error.display("Sorry, no results found.");
		return;
	}
	WDP.displayWordList(sortedCollection);
	WDP.displayViz(sortedCollection);
	WDP.display.categoryBarChart(categorySet);
}

WDP.display.counter = function(){
	document.getElementById('progress-counter').innerHTML = 'Results scanned: ' + WDP.posts.done + '/' + WDP.posts.total;
	if(WDP.posts.done === WDP.posts.total){
		document.getElementById('progress_bar').style.width = '0%';
	}
	//don't continually update for performance reasons
	else if(WDP.posts.done % 20 === 0){
		var done = WDP.posts.done;
		var total = WDP.posts.total;
		document.getElementById('progress_bar').style.width = done / total * 100 + '%';
	}
}


WDP.display.categoryBarChart = function(categorySet){
	var sortedCollection = categorySet.getSortedCollection();
	var xDomain = d3.extent(sortedCollection, function(d){
        return d.amount;
    });
	var xScale = d3.scale.linear().domain(xDomain).range([0, 1]);
	
	d3.select("#category-bar-graph-wrapper")
  		.selectAll("div")
    	.data(sortedCollection)
  		.enter().append("div")
  		.attr('class', 'bar_chart_bar')
    	.style("width", function(d) { return xScale(d.amount) * 100 + "%"; })
    	.text(function(d) { return d.name + ' (' + d.amount + ')'; });
}













