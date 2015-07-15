$.ajax({
	url: WDP.baseUrl + 'search/cl/web',
	type: 'GET',
	dataType: 'html'
})

.done(function(searchResults) {
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
	console.log("Could not retrieve search results from Craigslist");
});
