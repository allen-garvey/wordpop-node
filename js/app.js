WDP.models = {};
WDP.init = {};

WDP.init.CraigslistRequestData = function(city, category, subcategory, query){
	this.domain = 'craigslist';
	this.city = city;
	this.category = category;
	this.subcategory = subcategory;
	this.query = query;
}

WDP.init.searchForm = function(){
	var searchForm = $("#search_form");
	searchForm.submit(function(e){
    	return false;
	});

	WDP.init.populateSearchFields();

	searchForm.find("input[type='submit']").on('click', function(event) {
		var currentCity = $("#search_city option:selected").val();
		var requestData = new WDP.init.CraigslistRequestData(currentCity, 
															$("#search_category option:selected").val(), 
															$("#search_subcategory option:selected").val(), 
															$("#search_query").val());
		WDP.models.currentCity = currentCity;
		WDP.getCLPage(requestData, function(searchResults){WDP.detailViz.init(searchResults)});
	});

	searchForm.find('#search_subcategory').on('change', function(event){
		WDP.init.subCategoryTypeName();
	});

	$('#search_category').on('change', function(event) {
		WDP.init.subcategoriesForCategory();
		WDP.init.subCategoryTypeName();
	});
	WDP.init.subCategoryTypeName();
}

WDP.init.subCategoryTypeName = function(subcategory_select_val){
	var currentCategory = $("#search_category option:selected").val();
	var currentSubcategory = $("#search_subcategory option:selected").val();
	WDP.models.subCategoryTypeName = WDP.models.cl.categories[currentCategory].subcategories[currentSubcategory].categoryType;
}

WDP.init.populateSearchFields = function(){
	$.getJSON(WDP.baseUrl + 'data/cl.json', function(searchModel) {
		var model = searchModel.craigslist;
		WDP.models.cl = model;
		WDP.init.select($('#search_city optgroup'), model.cities);
		WDP.init.select($('#search_category optgroup'), model.categories);
		WDP.init.subcategoriesForCategory();

	});	
}

WDP.init.select = function(parentSelect, model){
	for(var item in model){
		parentSelect.append("<option value='"+ item +"'>" + model[item].display + "</option>")
	}
}

WDP.init.subcategoriesForCategory = function(){
	document.getElementById('search_subcategory_optgroup').innerHTML = '';
	WDP.init.select($('#search_subcategory optgroup'), WDP.models.cl.categories[$("#search_category option:selected").val()].subcategories);	
}
if(WDP.page === 'home'){
	WDP.init.searchForm();	
}
else{
	WDP.cc.init();
}
