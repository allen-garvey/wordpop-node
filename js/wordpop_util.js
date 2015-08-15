WDP.error = {};
WDP.error.display = function(errorMsg){
	document.getElementById('error_container').innerHTML = "<p>" + errorMsg + "</p>";
}
WDP.error.clear = function(){
	document.getElementById('error_container').innerHTML = '';	
}