/*
* Subclass of countedSet that only adds word if it matches pattern for category
* and normalizes category names
*/

WDP.set.countedCategorySet = function(normalizeItemNameFunc){
	WDP.set.countedSet.call(this);
	this.normalizeItemName = normalizeItemNameFunc;
}

WDP.set.countedCategorySet.prototype = Object.create(WDP.set.countedSet.prototype);

WDP.set.countedCategorySet.prototype.shouldExcludeItem = function(item){
	if(!item){
		return true;
	}
	return false;
}


WDP.set.countedCategorySetFactory = function(){

}
WDP.set.countedCategorySetFactory.prototype.makeCountedCategorySet = function(type){
	if(type === 'programmingLanguages'){
		return new WDP.set.countedCategorySet(this.programmingLanguageCategories());
	}
}


WDP.set.countedCategorySetFactory.prototype.programmingLanguageCategories = function(){
	return function(word){
		if(word.match(/html/gi)){
			return 'HTML';
		}
		else if(word.match(/\bcss\b/gi)){
			return 'CSS';
		}
		else if(word.match(/\bjavascript\b/gi)){
			return 'JavaScript';
		}
		else if(word.match(/\bsql\b/gi)){
			return 'SQL';
		}
		else if(word.match(/\bgit\b/gi)){
			return 'Git';
		}
		else if(word.match(/\bjava\b/gi)){
			return 'Java';
		}
		else if(word.match(/\bc#\b|\.net/gi)){
			return 'C#';
		}
		else if(word.match(/\bphp\b/gi)){
			return 'PHP';
		}
		else if(word.match(/c\+\+/gi)){
			return 'C++';
		}
		else if(word.match(/\bsass\b/gi)){
			return 'Sass';
		}
		else if(word.match(/\bLESS\b/g)){
			return 'Less';
		}
		else if(word.match(/\bruby\b/gi)){
			return 'Ruby';
		}
		else if(word.match(/\brails\b/gi)){
			return 'Rails';
		}
		else if(word.match(/\bflash|actionscript\b/gi)){
			return 'Flash';
		}
		else if(word.match(/\bpython\b|\bflask\b/gi)){
			return 'Python';
		}
		else if(word.match(/\bc\b/gi)){
			return 'C';
		}
	}
}
