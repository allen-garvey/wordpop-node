
var searchModel = {
	craigslist : {
		domain : 'craigslist.org',
		cities : {
			new_york : {display : 'New York', url : 'newyork'},
			seattle : {display: 'Seattle', url : 'seattle'},
			san_francisco : {display: 'San Francisco', url : 'sfbay'}
		},
		categories : {
			jobs : { 
					display : 'Jobs', 
					subcategories :{
									web : {display : 'Web', url : 'web'},
									software : {display: 'Software', url : 'sof'}
									}
			}
		}	
	}

};

var urlFromRequest = function(requestData){
	if(typeof requestData !== 'object' || !requestData.domain || !requestData.city || !requestData.category || !requestData.subcategory){
		return 'not valid request data';
		return false;
	}
	var model = searchModel[requestData.domain];
	if(!model){
		return 'not valid model';
		return false;
	}
	var city = model.cities[requestData.city];
	var category = model.categories[requestData.category];
	if(!city || !category){
		return 'not valid city or category';
		return false;
	}
	var subcategory = category.subcategories[requestData.subcategory];
	if(!subcategory){
		return 'not valid subcategory';
		return false;
	}
	return 'http://' + city.url + '.' + model.domain + '/search/' + subcategory.url;
}


module.exports = {
					'urlFromRequest' : urlFromRequest,
					'model' : searchModel
				};


