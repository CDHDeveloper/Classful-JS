(function (holder){
var Loader = {};

Loader.ROOT = ""
Loader.TITLE = "";
Loader.NAME = "";
Loader.VERSION = ""
Loader.MINIFIED = false;

var files = [];

var append = function (file){
	var script = document.createElement ("script");
	script.type = "text/javascript";
	script.src = file;
	document.head.appendChild (script);
};

var fixFileName = function (file){
	var len = file.length;
	if (len < 4) return null;
	if (file.substr (len - 3, 3) !== ".js") file += ".js";
	return file;
};

Loader.load = function (){
	var s = "?noglobals=true";
	if (location.href.substr (location.href.length - s.length, s.length) !== s) location.href += s;
	
	$("#qunit-header").text ((Loader.TITLE ? Loader.TITLE + " " : "") + (Loader.VERSION ? "v" + Loader.VERSION : ""));
	
	if (Loader.ROOT.charAt (Loader.ROOT.length - 1) !== "/") Loader.ROOT + "/";
	
	var file;
	if (Loader.MINIFIED){
		file = "../build/" + Loader.NAME + "-" + Loader.VERSION + ".js";
	}else{
		file = "../src/" + fixFileName (Loader.NAME);
	}
	append (file);
	
	for (var i in files){
		append (Loader.ROOT + files[i]);
	}
};

Loader.include = function (file){
	files.push (fixFileName (file));
};

holder.Loader = Loader;
})(this);