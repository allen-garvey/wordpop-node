$.ajax({
	url: WDP.baseUrl + 'ajax_responder.php',
	type: 'GET',
	dataType: 'html'
})

.done(function(searchResults) {
	var set = new WDP.countedSet();
	$(searchResults).find('.hdrlnk').each(function(index) {
		var resultsLink = $(this);
		var title = resultsLink.text();
		title.split(" ").map(function(word, index) {
			set.add(word);
		});
	});
	var main_list = $('#main_list');
	var sortedCollection = set.getSortedCollection();
	// console.log(sortedCollection);
	sortedCollection.map(function(elem) {
		main_list.append("<li>" + elem.name + ' ('+ elem.amount + ")</li>");
	});
	WDP.displayViz(sortedCollection);
})
.fail(function() {
	console.log("error");
});
