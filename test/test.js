$(document).ready (function (){
	Loader.ROOT = "tests/"
	Loader.TITLE = "Classful JS";
	Loader.NAME = "classful"
	Loader.VERSION = "1.1r1";
	Loader.MINIFIED = true;
	
	Loader.include ("class_creation.js");
	Loader.include ("class_update.js");
	
	Loader.load ();
});