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
	else if(type === 'graphic design'){
		return new WDP.set.countedCategorySet(this.graphicDesignCategories());
	}
	else if(type === 'free stuff'){
		return new WDP.set.countedCategorySet(this.freeStuffCategories());
	}
	else if(type === 'personals'){
		return new WDP.set.countedCategorySet(this.personalsCategories());
	}
	//'programming languages'
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
		else if(word.match(/\bwindows\b/gi)){
			return 'Windows';
		}
		else if(word.match(/\b(mac|apple)\b/gi)){
			return 'Mac';
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
		else if(word.match(/\bjquery\b/gi)){
			return 'jQuery';
		}
		else if(word.match(/\bangular\b/gi)){
			return 'Angular';
		}
		else if(word.match(/\bember\b/gi)){
			return 'Ember';
		}
		else if(word.match(/\bbackbone\b/gi)){
			return 'Backbone';
		}
		else if(word.match(/\bknockout\b/gi)){
			return 'Knockout';
		}
		else if(word.match(/\bperl\b/gi)){
			return 'Perl';
		}
		else if(word.match(/\bhaskell\b/gi)){
			return 'Haskell';
		}
		else if(word.match(/\bocaml\b/gi)){
			return 'OCaml';
		}
		else if(word.match(/\bmatlab\b/gi)){
			return 'Matlab';
		}
		else if(word.match(/\bxml\b/gi)){
			return 'XML';
		}
		else if(word.match(/\bxsl\b/gi)){
			return 'XSL';
		}
		else if(word.match(/\bcucumber\b/gi)){
			return 'Cucumber';
		}
		else if(word.match(/\bjunit\b/gi)){
			return 'JUnit';
		}
		else if(word.match(/\brspec\b/gi)){
			return 'RSpec';
		}
		else if(word.match(/\bcobol\b/gi)){
			return 'COBOL';
		}
		else if(word.match(/\bfortran\b/gi)){
			return 'Fortran';
		}
		else if(word.match(/\bml\b/gi)){
			return 'ML';
		}
		else if(word.match(/\bd3(\.js)?\b/gi)){
			return 'D3.js';
		}
		else if(word.match(/\br\b/gi)){
			return 'R';
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

WDP.set.countedCategorySetFactory.prototype.graphicDesignCategories = function(){
	return function(word){
		if(word.match(/\badobe\b/gi)){
			return 'Adobe';
		}
		else if(word.match(/\bweb\b/gi)){
			return 'Web';
		}
		else if(word.match(/\bfashion\b/gi)){
			return 'Fashion';
		}
		else if(word.match(/\bphotoshop\b/gi)){
			return 'Photoshop';
		}
		else if(word.match(/\billustrator\b/gi)){
			return 'Illustrator';
		}
		else if(word.match(/\bindesign\b/gi)){
			return 'InDesign';
		}
		else if(word.match(/\bwordpress\b/gi)){
			return 'Wordpress';
		}
		else if(word.match(/\bcad\b/gi)){
			return 'Cad';
		}
		else if(word.match(/\bweb\b/gi)){
			return 'Web';
		}
		else if(word.match(/\bsquarespace\b/gi)){
			return 'Squarespace';
		}
		else if(word.match(/\bwix\b/gi)){
			return 'Wix';
		}
		else if(word.match(/\b(ux|ui)\b/gi)){
			return 'UX';
		}
		else if(word.match(/\bquark\b/gi)){
			return 'Quark';
		}
		else if(word.match(/\blogo\b/gi)){
			return 'Logo';
		}
		else if(word.match(/\bphotograph(y)?\b/gi)){
			return 'Photography';
		}
	}
}

WDP.set.countedCategorySetFactory.prototype.freeStuffCategories = function(){
	return function(word){
		if(word.match(/\bfirewood\b/gi)){
			return 'Firewood';
		}
		else if(word.match(/\bfurniture\b/gi)){
			return 'Furniture';
		}
		else if(word.match(/\bikea\b/gi)){
			return 'Ikea';
		}
		else if(word.match(/\bt\.?v\.?\b/gi)){
			return 'TV';
		}
		else if(word.match(/\bcouch\b/gi)){
			return 'Couch';
		}
		else if(word.match(/\bbooks?\b/gi)){
			return 'Books';
		}
		else if(word.match(/\bmicrowave\b/gi)){
			return 'Microwave';
		}
		else if(word.match(/\btoilet\b/gi)){
			return 'Toilet';
		}
		else if(word.match(/\btreadmill\b/gi)){
			return 'Treadmill';
		}
		else if(word.match(/\belliptical\b/gi)){
			return 'Elliptical';
		}
		else if(word.match(/\bweights\b/gi)){
			return 'Weights';
		}
		else if(word.match(/\bconcrete\b/gi)){
			return 'Concrete';
		}
		else if(word.match(/\bcd(s)?\b/gi)){
			return 'CDs';
		}
		else if(word.match(/\bshelf\b/gi)){
			return 'Shelf';
		}
		else if(word.match(/\bbike\b/gi)){
			return 'Bike';
		}
		else if(word.match(/\btable\b/gi)){
			return 'Table';
		}
		else if(word.match(/\bshoes\b/gi)){
			return 'Shoes';
		}
		else if(word.match(/\bbed\b/gi)){
			return 'Bed';
		}
		else if(word.match(/\bfuton\b/gi)){
			return 'Futon';
		}
		else if(word.match(/\bchair\b/gi)){
			return 'Chair';
		}
		else if(word.match(/\bguitar\b/gi)){
			return 'Guitar';
		}
		else if(word.match(/\bpiano\b/gi)){
			return 'Piano';
		}
	}
}
WDP.set.countedCategorySetFactory.prototype.personalsCategories = function(){
	return function(word){
		if(word.match(/\bman\b/gi)){
			return 'Man';
		}
		else if(word.match(/\bmasculine\b/gi)){
			return 'Masculine';
		}
		else if(word.match(/\bfeminine\b/gi)){
			return 'Feminine';
		}
		else if(word.match(/\beyes\b/gi)){
			return 'Eyes';
		}
		else if(word.match(/\bblonde?\b/gi)){
			return 'Blonde';
		}
		else if(word.match(/\bbrunette\b/gi)){
			return 'Brunette';
		}
		else if(word.match(/\bblue\b/gi)){
			return 'Blue';
		}
		else if(word.match(/\bbrown\b/gi)){
			return 'Brown';
		}
		else if(word.match(/\bgreen\b/gi)){
			return 'Green';
		}
		else if(word.match(/\bred\b/gi)){
			return 'Red';
		}
		else if(word.match(/\bviolet|purple\b/gi)){
			return 'Purple';
		}
		else if(word.match(/\borange\b/gi)){
			return 'Orange';
		}
		else if(word.match(/\byellow\b/gi)){
			return 'Yellow';
		}
		else if(word.match(/\bmuscles\b/gi)){
			return 'Muscles';
		}
		else if(word.match(/\bstars?\b/gi)){
			return 'Stars';
		}
		else if(word.match(/\bcar\b/gi)){
			return 'Car';
		}
		else if(word.match(/\bbreasts?\b/gi)){
			return 'Breasts';
		}
		else if(word.match(/\barms?\b/gi)){
			return 'Arms';
		}
		else if(word.match(/\bteeth\b/gi)){
			return 'Teeth';
		}
		else if(word.match(/\bhair\b/gi)){
			return 'Hair';
		}
		else if(word.match(/\bshoes?\b/gi)){
			return 'Shoes';
		}
		else if(word.match(/\bmoney\b/gi)){
			return 'Money';
		}
		else if(word.match(/\brandom\b/gi)){
			return 'Random';
		}
		else if(word.match(/\bstranger\b/gi)){
			return 'Stranger';
		}
		else if(word.match(/\bhello\b/gi)){
			return 'Hello';
		}
		else if(word.match(/\bhi\b/gi)){
			return 'Hi';
		}
		else if(word.match(/\bvacation\b/gi)){
			return 'Vacation';
		}
		else if(word.match(/\bsex\b/gi)){
			return 'Sex';
		}
		else if(word.match(/\bboy\b/gi)){
			return 'Boy';
		}
		else if(word.match(/\bgirl\b/gi)){
			return 'Girl';
		}
		else if(word.match(/\bwoman\b/gi)){
			return 'Woman';
		}
		else if(word.match(/\bblack\b/gi)){
			return 'Black';
		}
		else if(word.match(/\basian\b/gi)){
			return 'Asian';
		}
		else if(word.match(/\bhispanic\b/gi)){
			return 'Hispanic';
		}
		else if(word.match(/\bwhite\b/gi)){
			return 'White';
		}
		else if(word.match(/\bskinny\b/gi)){
			return 'Skinny';
		}
		else if(word.match(/\btall\b/gi)){
			return 'Tall';
		}
		else if(word.match(/\bshort\b/gi)){
			return 'Short';
		}
		else if(word.match(/\bbbw\b/gi)){
			return 'bbw';
		}
		else if(word.match(/\bherpes\b/gi)){
			return 'Herpes';
		}
		else if(word.match(/\bhookups?\b/gi)){
			return 'Hookups';
		}
		else if(word.match(/\bhiv\+?\b/gi)){
			return 'Hiv';
		}
		else if(word.match(/\bboots?\b/gi)){
			return 'Boots';
		}
		else if(word.match(/\bdress\b/gi)){
			return 'Dress';
		}
		else if(word.match(/\bjeans\b/gi)){
			return 'Jeans';
		}
		else if(word.match(/\bsuit\b/gi)){
			return 'Suit';
		}
		else if(word.match(/\btattoos?\b/gi)){
			return 'Tattoos';
		}
		else if(word.match(/\bpiercings?\b/gi)){
			return 'Piercings';
		}
		else if(word.match(/\bearring\b/gi)){
			return 'Earring';
		}
		else if(word.match(/\bpunk\b/gi)){
			return 'Punk';
		}
		else if(word.match(/\brock\b/gi)){
			return 'Rock';
		}
		else if(word.match(/\bmusic\b/gi)){
			return 'Music';
		}
		else if(word.match(/\bmovies?\b/gi)){
			return 'Movies';
		}
		else if(word.match(/\badventure\b/gi)){
			return 'Adventure';
		}
		else if(word.match(/\bbeach\b/gi)){
			return 'Beach';
		}
		else if(word.match(/\bdrink\b/gi)){
			return 'Drink';
		}
		else if(word.match(/\bcoffee\b/gi)){
			return 'Coffee';
		}
		else if(word.match(/\bcook\b/gi)){
			return 'Cook';
		}
		else if(word.match(/\bclean\b/gi)){
			return 'Clean';
		}
		else if(word.match(/\bstd\b/gi)){
			return 'STD';
		}
		else if(word.match(/\bdrunk\b/gi)){
			return 'Drunk';
		}
		else if(word.match(/\bdrugs\b/gi)){
			return 'Drugs';
		}
		else if(word.match(/\b420\b/gi)){
			return '420';
		}
		else if(word.match(/\bjob\b/gi)){
			return 'Job';
		}
		else if(word.match(/\bfuck\b/gi)){
			return 'Fuck';
		}
		else if(word.match(/\bfetish\b/gi)){
			return 'Fetish';
		}
		else if(word.match(/\bfriends?\b/gi)){
			return 'Friends';
		}
		else if(word.match(/\bfun\b/gi)){
			return 'Fun';
		}
	}
}
