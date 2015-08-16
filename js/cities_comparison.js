/*
* JS To display cities comparison bar chart
*/
WDP.cc = {}; //top level cities comparison container
WDP.cc.count = {}; //container for how many pages to download
WDP.cc.init = function(){
	WDP.cc.set = new WDP.set.countedSet();
	$.getJSON(WDP.baseUrl + 'data/cl.json', function(searchModel) {
		var model = searchModel.craigslist;
		WDP.models.cl = model;
		var citiesLength = Object.keys(WDP.models.cl.cities).length;
		var categories = ['web', 'software', 'internet_engineering', 'systems_networking'];
		WDP.cc.count.total = citiesLength * categories.length;
		WDP.cc.count.done = 0;
		$.each(Object.keys(WDP.models.cl.cities),function(index, city) {
			$.each(categories,function(index, subcategory) {
				WDP.getCLPage(new WDP.init.CraigslistRequestData(city, 'jobs',subcategory, null),function(searchResults, requestData){WDP.cc.getCityResults(searchResults, requestData);});
			});
		});
	});
}

/*
* Function passed into WDP.getCLPage to count number of search results for a city
*/
WDP.cc.getCityResults = function(searchResults, requestData){
	WDP.cc.count.done += 1;
	// var searchNum = $(searchResults).find('a.hdrlnk').length;
	var searchNum = parseInt($(searchResults).find('.totalcount').first().text());
	console.log('City: ' + requestData.city + ' search num: ' + $(searchResults).find('.totalcount').first().text());
	var key = WDP.models.cl.cities[requestData.city].display
	WDP.cc.set.setCountForItem(key, WDP.cc.set.countForItem(key) + searchNum);
	WDP.display.counter(WDP.cc.count.done, WDP.cc.count.total);
	if(WDP.cc.count.done === WDP.cc.count.total){
		WDP.error.clear();
		WDP.cc.clearBarChart();
		WDP.display.categoryBarChart(WDP.cc.set);
	}
}

WDP.cc.clearBarChart = function(){
	document.getElementById('category-bar-graph-wrapper').innetHTML = '';
}