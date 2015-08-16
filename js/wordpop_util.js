WDP.util = {};
WDP.error = {};
WDP.error.display = function(errorMsg){
	document.getElementById('error_container').innerHTML = "<p>" + errorMsg + "</p>";
}
WDP.error.clear = function(){
	document.getElementById('error_container').innerHTML = '';	
}

/*
* Function returns a number formatted with commas as appropriate
* adapted from: http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
*/
WDP.util.formatNumber = function(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}