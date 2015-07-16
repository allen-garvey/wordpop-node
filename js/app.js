$.ajax({
	url: WDP.baseUrl + 'data',
	type: 'POST',
	dataType: 'html',
	data: {domain : 'craigslist',
			city : 'new_york',
			category : 'jobs',
			subcategory : 'web'}
})

.done(function(searchResults) {
	if(searchResults.match(/^This IP has been automatically blocked./i)){
		WDP.displayError("Sorry, but it appears that Craigslist has blocked this site from collecting data.");
		console.error(searchResults);
		return;
	}
	console.log(searchResults);
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
	sortedCollection.map(function(elem) {
		main_list.append("<li>" + elem.name + ' ('+ elem.amount + ")</li>");
	});
	WDP.displayViz(sortedCollection);
})
.fail(function() {
	WDP.displayError("Sorry, could not connect to Craigslist.");
});