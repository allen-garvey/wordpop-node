"use strict";
WDP.set = {};
WDP.set.countedSet = function(){
	this.collection = {};
};

WDP.set.countedSet.prototype.add = function(item) {
	item = item.toLowerCase();
	if(this.shouldExcludeItem(item)){
		return;
	}
	if(this.collection[item]){
		this.collection[item] += 1;
	}
	else{
		this.collection[item] = 1;
	}
};

/*
* Function returning true or false whether item should be added to the set
*/
WDP.set.countedSet.prototype.shouldExcludeItem = function(item){
	//exclude non letters or numbers and certain words
	return !item.match(/[a-zA-z0-9]/) || item.match(/^(and|to|a|the|of|for|in|with|is|be|our|as|an|or|on|are)$/);
}

WDP.set.countedSet.prototype.countForObject = function(itemName) {
	return this.collection[itemName] ? this.collection[itemName] : 0;
};

WDP.set.countedSet.prototype.getCollection = function() {
	return this.collection;
};

/*
* Returns an array sorted in descending order of name and amount
* i.e. [{name: first_thing, amount: 20}, {name: second_thing, amount: 19}];
*/
WDP.set.countedSet.prototype.getSortedCollection = function() {
	var collection = this.collection; //because can't reference this inside function
	var sortable = [];
	for (var key in collection){
		sortable.push({'name' : key, 'amount' : collection[key]});	
	} 
	sortable.sort(function(a, b) {return -(a['amount'] - b['amount'])});
	return sortable;
};