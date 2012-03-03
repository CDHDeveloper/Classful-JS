QUnit.test ("Namespace", function (){
	QUnit.expect (15);
	
	QUnit.ok (Class.getNamespace ("test.namespace") === null, "Class.getNamespace(String). Undefined namespace.");
	QUnit.ok (Object.keys (Class.getNamespace ()).length === 0, "Class.getNamespace(). Number of classes. No class defined.");
	
	var A = Class.create ({ name: "A" });
	QUnit.ok (Class.getClassByName ("A") === A, "Class creation in default package (root).");
	
	Class.namespace ("test.namespace");
	QUnit.ok (Class.getNamespace ("test.namespace") !== null, "Class.getNamespace(String). Defined namespace.");
	
	A = Class.create ({ name: "A" });
	QUnit.ok (Class.getNamespace ().test.namespace.A === A, "Class.getNamespace(String). Valid namespace. Equals to defined class.");
	QUnit.ok (Class.getNamespace ("test").namespace.A === A, "Class.getNamespace(String). Valid namespace. Equals to defined class.");
	QUnit.ok (Class.getNamespace ("test.namespace").A === A, "Class.getNamespace(String). Valid namespace. Equals to defined class.");
	QUnit.ok (Class.getNamespace ("test.namespace.A") === null, "Class.getNamespace(String). Invalid namespace, it's a class.");
	QUnit.ok (Class.getNamespace ("test.namespace.fake") === null, "Class.getNamespace(String). Invalid namespace.");
	
	QUnit.ok (Class.getClassByName ("test.fake") === null, "Class.getClassByName(String). Invalid fully qualified class name.");
	QUnit.ok (Class.getClassByName ("test.namespace.A.fake") === null, "Class.getClassByName(String). Invalid fully qualified class name.");
	QUnit.ok (Class.getClassByName ("test") === null, "Class.getClassByName(String). Incomplete fully qualified class name.");
	QUnit.ok (Class.getClassByName ("test.namespace.A") === A, "Class.getClassByName(String). Valid fully qualified class name.");
	QUnit.ok (Class.getClassByName ("A") === A, "Class.getClassByName(String). Valid class name relative to current namespace.");
	
	Class.namespace ("test.namespace.p");
	Class.create ({ name: "A" });
	Class.namespace ("test");
	Class.create ({ name: "B" });
	QUnit.ok (Class.getClassByName ("test.namespace.p.A") !== null &&
			Class.getClassByName ("test.B") !== null &&
			Class.getClassByName ("test.namespace.A") !== null, "Class creation in different namespace.");
			
			
			var A = Class.create ({
					constructor: function (a){
						this._a = a;
					},
					properties: {
						a: function (){
							return this._a;
						}
					}
				});

				var B = Class.create ({
					name: "B",
					extend: A,
					constructor: function (a, b){
						this.__super__ (a);
						this.b = b;
					},
					properties: {
						a: function (){
							return "From B > " + this.__super__.a ();
						},
						b: null
					}
				});

				var C = Class.create ({
					extend: "B",
					constructor: function (a, b){
						this.__super__ (a, b);
					},
					properties: {
						a: function (){
							return "a";
						},
						c: function (){
							return "From C > " + this.__super__.a ();
						}
					}
				});
});