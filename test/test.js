$(document).ready (function (){
	Loader.ROOT = "tests/"
	Loader.TITLE = "Classful JS";
	Loader.NAME = "classful"
	Loader.VERSION = "1.0r4";
	Loader.MINIFIED = true;
	
	Loader.include ("namespace.js");
	Loader.include ("class_creation.js");
	Loader.include ("class_update.js");
	
	Loader.load ();
});