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
/*
* valid types are: 'musicians', 'programming languages'
*/
WDP.set.countedCategorySetFactory.prototype.makeCountedCategorySet = function(type){
	if(type === 'musicians'){
		return new WDP.set.countedCategorySet(this.musicianCategories());
	}
	else{
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
		else if(word.match(/\bmagento\b/gi)){
			return 'Magento';
		}
		else if(word.match(/\bshopify\b/gi)){
			return 'Shopify';
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
		else if(word.match(/\bwix\b/gi)){
			return 'Wix';
		}
		else if(word.match(/\bsquarespace\b/gi)){
			return 'Squarespace';
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

WDP.set.countedCategorySetFactory.prototype.musicianCategories = function(){
	return function(word){
		if(word.match(/\bguitar\b/gi)){
			return 'Guitar';
		}
		else if(word.match(/\bbass\b/gi)){
			return 'Bass';
		}
		else if(word.match(/\bpiano\b/gi)){
			return 'Piano';
		}
		else if(word.match(/\bkeyboards\b/gi)){
			return 'Keyboards';
		}
		else if(word.match(/\b(voice|vocal)\b|\bsing(er)?\b/gi)){
			return 'Singer';
		}
		else if(word.match(/\b(upright|contra)\b/gi)){
			return 'Upright Bass';
		}
		else if(word.match(/\bviolin\b/gi)){
			return 'Violin';
		}
		else if(word.match(/\bdrums\b/gi)){
			return 'Drums';
		}
		else if(word.match(/\bpercussion\b/gi)){
			return 'Percussion';
		}
		else if(word.match(/\bflute\b/gi)){
			return 'Flute';
		}
		else if(word.match(/\bsax(ophone)?\b/gi)){
			return 'Saxophone';
		}
		else if(word.match(/\btrumpet\b/gi)){
			return 'Trumpet';
		}
		else if(word.match(/\bchurch\b/gi)){
			return 'Church';
		}
		else if(word.match(/\bwedding\b/gi)){
			return 'Wedding';
		}
		else if(word.match(/\btrombone\b/gi)){
			return 'Trombone';
		}
		else if(word.match(/\b(choir|chorus)\b/gi)){
			return 'Chorus';
		}
		else if(word.match(/\bcello\b/gi)){
			return 'Cello';
		}
		else if(word.match(/\bviola\b/gi)){
			return 'Viola';
		}
		else if(word.match(/\btuba\b/gi)){
			return 'Tuba';
		}
		else if(word.match(/\bclarinet\b/gi)){
			return 'Clarinet';
		}
		else if(word.match(/\bcompose(r)?\b/gi)){
			return 'Composer';
		}
		else if(word.match(/\bbassoon\b/gi)){
			return 'Bassoon';
		}
		
	}
}
