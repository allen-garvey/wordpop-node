WDP.initSearchForm = function(){
	var searchForm = $("#search_form");
	searchForm.submit(function(e){
    	return false;
	});

	searchForm.find("input[type='submit']").on('click', function(event) {
		var requestData = {
							domain : 'craigslist',
							city : $("#search_city option:selected").val(),
							category : $("#search_category option:selected").val(),
							subcategory : $("#search_subcategory option:selected").val()
						};

		WDP.displaySearchViz(requestData);
	});

	WDP.populateSearchFields();

}

WDP.populateSearchFields = function(){
	$.getJSON(WDP.baseUrl + 'data/cl.json', function(searchModel) {
		var model = searchModel.craigslist;
		WDP.populateSelect($('#search_city'), model.cities);
		WDP.populateSelect($('#search_category'), model.categories);
		WDP.populateSelect($('#search_subcategory'), model.categories.jobs.subcategories);

	});	
}

WDP.populateSelect = function(parentSelect, model){
	for(var item in model){
		parentSelect.append("<option value='"+ item +"'>" + model[item].display + "</option>")
	}
}

WDP.initSearchForm();

