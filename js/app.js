WDP.models = {};
WDP.init = {};

WDP.init.searchForm = function(){
	var searchForm = $("#search_form");
	searchForm.submit(function(e){
    	return false;
	});

	searchForm.find("input[type='submit']").on('click', function(event) {
		var requestData = {
							domain : 'craigslist',
							city : $("#search_city option:selected").val(),
							category : $("#search_category option:selected").val(),
							subcategory : $("#search_subcategory option:selected").val(),
							query : $("#search_query").val()
						};

		WDP.displaySearchViz(requestData);
	});

	WDP.init.populateSearchFields();
	$('#search_category').on('change', function(event) {
		WDP.init.subcategoriesForCategory();
	});

}

WDP.init.populateSearchFields = function(){
	$.getJSON(WDP.baseUrl + 'data/cl.json', function(searchModel) {
		var model = searchModel.craigslist;
		WDP.models.cl = model;
		WDP.init.select($('#search_city'), model.cities);
		WDP.init.select($('#search_category'), model.categories);
		WDP.init.subcategoriesForCategory();

	});	
}

WDP.init.select = function(parentSelect, model){
	for(var item in model){
		parentSelect.append("<option value='"+ item +"'>" + model[item].display + "</option>")
	}
}

WDP.init.subcategoriesForCategory = function(){
	document.getElementById('search_subcategory').innerHTML = '';
	WDP.init.select($('#search_subcategory'), WDP.models.cl.categories[$("#search_category option:selected").val()].subcategories);	
}

WDP.init.searchForm();

