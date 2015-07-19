
var searchModel = {
	craigslist : {
		domain : 'craigslist.org',
		cities : {
			new_york : {display : 'New York', url : 'newyork'},
			seattle : {display: 'Seattle', url : 'seattle'},
			san_francisco : {display: 'San Francisco', url : 'sfbay'},
			denver : {display: 'Denver', url : 'denver'},
			san_diego : {display: 'San Diego', url : 'sandiego'},
			los_angeles : {display: 'Los Angeles', url : 'losangeles'},
			buffalo : {display: 'Buffalo', url : 'buffalo'},
			austin : {display: 'Austin', url : 'austin'},
			anchorage : {display: 'Anchorage', url : 'anchorage'},
			portland : {display: 'Portland, OR', url : 'portland'}
		},
		categories : {
			jobs : { 
					display : 'Jobs', 
					subcategories :{
									web : {display : 'Web', url : 'web'},
									software : {display: 'Software', url : 'sof'},
									internet_engineering : {display : 'Internet Engineering', url : 'eng'},
									systems_networking : {display : 'Systems/Networking', url : 'sad'}
					}
			},
			gigs : {
					display : 'Gigs',
					subcategories: {
									computer : {display : 'Computer', url : 'cpg'},
									creative : {display : 'Creative', url : 'crg'}
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
	var cityUrl =  cityUrlFromCity(requestData.city, model);
	var category = model.categories[requestData.category];
	if(!cityUrl || !category){
		return 'not valid city or category';
		return false;
	}
	var subcategory = category.subcategories[requestData.subcategory];
	if(!subcategory){
		return 'not valid subcategory';
		return false;
	}
	var queryString = requestData.query ? '?query=' + encodeURIComponent(requestData.query) : '';
	return cityUrl + '/search/' + subcategory.url + queryString;
}

var cityUrlFromCity = function(city, sModel){
	var model = sModel ? sModel : searchModel['craigslist'];
	var validatedCity = model.cities[city];
	if(validatedCity){
		return 'http://' + validatedCity.url + '.' + model.domain;
	}
	return false;
}


module.exports = {
					'urlFromRequest' : urlFromRequest,
					'model' : searchModel,
					'cityUrlFromCity' : cityUrlFromCity
				};


