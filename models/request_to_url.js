
var searchModel = {
	craigslist : {
		domain : 'craigslist.org',
		cities : {
			new_york : 'newyork',
			seattle : 'seattle',
			san_francisco : 'sfbay'
		},
		categories : {
			jobs : {
				web : 'web',
				software : 'sof'
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
	var subcategory = category[requestData.subcategory];
	if(!subcategory){
		return 'not valid subcategory';
		return false;
	}
	return 'http://' + city + '.' + model.domain + '/search/' + subcategory;
}


module.exports = {'urlFromRequest' : urlFromRequest};