(function (holder){
var Loader = {};

Loader.DEFAULT = 0;
Loader.AMD = 1;
Loader.TEST = Loader.DEFAULT;
Loader.MINIFIED = false;

var files = [];

var createScript = function (file){
	var script = document.createElement ("script");
	script.type = "text/javascript";
	script.src = file;
	return script;
};

var append = function (file){
	document.head.appendChild (createScript (file));
};

var fixFileName = function (file){
	var len = file.length;
	if (len < 4) return null;
	if (file.substr (len - 3, 3) !== ".js") file += ".js";
	return file;
};

Loader.load = function (){
	var addFiles = function (){
		for (var i in files){
			append ("tests/" + files[i]);
		}
	};
	
	var s = "?noglobals=true";
	if (location.href.substr (location.href.length - s.length, s.length) !== s) location.href += s;
	
	var $title = $("#qunit-header");
	var file;
	switch (Loader.TEST){
		case Loader.DEFAULT:
			file = Loader.MINIFIED ? "../build/classful.js" : "../src/classful.js";
			append (file);
			addFiles ();
			break;
		case Loader.AMD:
			$title.text ($title.text () + " (AMD)");
			require.config ({
				paths: {
					"classful": Loader.MINIFIED ? "../build/amd/classful" : "../src/amd/classful"
				}
			});
			require (["classful"], function (Class){
				window.Class = Class;
				addFiles ();
			});
			break;
	}
	
	var msg = Loader.MINIFIED ? " - BUILD" : " - SOURCE";
	$title.text ($title.text () + msg);
};

Loader.include = function (file){
	files.push (fixFileName (file));
};

holder.Loader = Loader;
})(this);