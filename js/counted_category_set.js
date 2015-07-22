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
		else if(word.match(/\bjavascript\b/gi)){
			return 'JavaScript';
		}
		else if(word.match(/\bsql\b/gi)){
			return 'SQL';
		}
		else if(word.match(/\bcss\b/gi)){
			return 'CSS';
		}
		else if(word.match(/\bgit\b/gi)){
			return 'Git';
		}
		else if(word.match(/\bjava\b/gi)){
			return 'Java';
		}
		else if(word.match(/\b(c#|.net)\b/gi)){
			return 'C#';
		}
		else if(word.match(/\bphp\b/gi)){
			return 'PHP';
		}
		else if(word.match(/\bwordpress\b/gi)){
			return 'WordPress';
		}
		else if(word.match(/\bnode(.js|js)?\b/gi)){
			return 'Node';
		}
		else if(word.match(/\bandroid\b/gi)){
			return 'Android';
		}
		else if(word.match(/mysql/gi)){
			return 'MySQL';
		}
		else if(word.match(/\bpostgres\b/gi)){
			return 'PostgreSQL';
		}
		else if(word.match(/c\+\+/gi)){
			return 'C++';
		}
		else if(word.match(/\bruby\b/gi)){
			return 'Ruby';
		}
		else if(word.match(/\brails\b/gi)){
			return 'Rails';
		}
		else if(word.match(/\b(unix|linux|shell|bash)\b/gi)){
			return 'Unix/Shell Scripting';
		}
		else if(word.match(/\bsass\b/gi)){
			return 'Sass';
		}
		else if(word.match(/\bios\b/gi)){
			return 'iOS';
		}
		else if(word.match(/\bobjective\s?-?\s?c\b/gi)){
			return 'Objective-C';
		}
		else if(word.match(/\bswift\b/gi)){
			return 'Swift';
		}
		else if(word.match(/\bpython\b/gi)){
			return 'Python';
		}
		else if(word.match(/\bdjango\b/gi)){
			return 'Django';
		}
		else if(word.match(/\bgo-?lang\b/gi)){
			return 'Go-lang';
		}
		else if(word.match(/\bflask\b/gi)){
			return 'Flask';
		}
		else if(word.match(/\b(oracle|pl\/sql)\b/gi)){
			return 'Oracle';
		}
		else if(word.match(/\bdrupal\b/gi)){
			return 'Drupal';
		}
		else if(word.match(/\b(flash|actionscript)\b/gi)){
			return 'Flash';
		}
		else if(word.match(/\bmercurial\b/gi)){
			return 'Mercurial';
		}
		else if(word.match(/\b(subversion|svn)\b/gi)){
			return 'Subversion';
		}
		else if(word.match(/\blaravel\b/gi)){
			return 'Laravel';
		}
		else if(word.match(/\bzend\b/gi)){
			return 'Zend';
		}
		else if(word.match(/\bsymfony\b/gi)){
			return 'Symfony';
		}
		else if(word.match(/\b(phonegap|cordova)\b/gi)){
			return 'PhoneGap';
		}
		else if(word.match(/\bLESS\b/g)){
			return 'Less';
		}
		else if(word.match(/\bc\b/gi)){
			return 'C';
		}
	}
}
