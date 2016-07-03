
var searchModel = {
	craigslist : {
		domain : 'craigslist.org',
		cities : {
			new_york : {display : 'New York', url : 'newyork'},
			anchorage : {display: 'Anchorage', url : 'anchorage'},
			atlanta : {display : 'Atlanta', url : 'atlanta'},
			austin : {display: 'Austin', url : 'austin'},
			baltimore : {display : 'Baltimore', url : 'baltimore'},
			boston : {display: 'Boston', url : 'boston'},
			buffalo : {display: 'Buffalo', url : 'buffalo'},
			cleveland : {display : 'Cleveland', url : 'cleveland'},
			denver : {display: 'Denver', url : 'denver'},
			detroit : {display : 'Detroit', url : 'detroit'},
			hartford : {display : 'Hartford', url : 'hartford'},
			houston : {display : 'Houston', url : 'houston'},
			los_angeles : {display: 'Los Angeles', url : 'losangeles'},
			las_vegas : {display : 'Las Vegas', url : 'lasvegas'},
			minneapolis : {display : 'Minneapolis', url : 'minneapolis'},
			philadelphia : {display : 'Philadelphia', url : 'philadelphia'},
			phoenix : {display : 'Phoenix', url : 'phoenix'},
			pittsburgh : {display : 'Pittsburgh', url : 'pittsburgh'},
			portland : {display: 'Portland, OR', url : 'portland'},
			salt_lake_city : {display : 'Salt Lake City', url : 'saltlakecity'},
			san_antonio : {display : 'San Antonio', url : 'sanantonio'},
			san_diego : {display: 'San Diego', url : 'sandiego'},
			san_francisco : {display: 'San Francisco', url : 'sfbay'},
			seattle : {display: 'Seattle', url : 'seattle'},
			washington_dc : {display: 'Washington, D.C.', url : 'washingtondc'},
		},
		categories : {
			jobs : { 
					display : 'Jobs', 
					subcategories :{
									web : {display : 'Web', url : 'web', categoryType: 'programming languages'},
									software : {display: 'Software', url : 'sof', categoryType: 'programming languages'},
									internet_engineering : {display : 'Internet Engineering', url : 'eng', categoryType: 'programming languages'},
									systems_networking : {display : 'Systems/Networking', url : 'sad', categoryType: 'programming languages'}
					}
			},
			gigs : {
					display : 'Gigs',
					subcategories: {
									computer : {display : 'Computer', url : 'cpg', categoryType: 'programming languages'}
									
					}
			},
			community : { 
					display : 'Community', 
					subcategories :{
									musicians : {display : 'Musicians', url : 'muc', categoryType: 'musicians'}
					}
			},
			for_sale : { 
					display : 'For Sale', 
					subcategories :{
									free : {display : 'Free', url : 'zip', categoryType: 'free stuff'},
									musical_instruments : {display : 'Musical Instruments', url : 'msa', categoryType: 'musicians'}
					}
			},
			personals : { 
					display : 'Personals', 
					subcategories :{
									m4w : {display : 'Men Seeking Women', url : 'm4w', categoryType: 'personals'},
									w4m : {display : 'Women Seeking Men', url : 'w4m', categoryType: 'personals'},
									m4m : {display : 'Men Seeking Men', url : 'm4w', categoryType: 'personals'},
									w4w : {display : 'Women Seeking Women', url : 'w4w', categoryType: 'personals'},
									missed_connections_w4m : {display : 'Missed Connections: w4m', url : 'mis?sort=date&query=w4m', categoryType: 'personals'},
									missed_connections_m4w : {display : 'Missed Connections: m4w', url : 'mis?sort=date&query=m4w', categoryType: 'personals'}
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
	var queryString = '';
	if(requestData.query){
		if(requestData.subcategory.match(/^missed_connections_/)){
			queryString = '+' + encodeURIComponent(requestData.query);
		}
		else{
			queryString = '?query=' + encodeURIComponent(requestData.query);
		}
	}
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


