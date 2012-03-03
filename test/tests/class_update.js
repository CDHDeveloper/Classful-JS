QUnit.test ("Class update", function (){
	QUnit.expect (24);
	
	Class.namespace ("test.class_update");
	
	var A = Class.create ({
		name: "ClassTestA"
	});
	
	Class.update (A, {
		name: "ClassTestB"
	});
	
	QUnit.ok (Class.getClassByName ("ClassTestB") === A && Class.getClassByName ("ClassTestA") === null, "Class update (name).");
	
	var A = Class.create ();
	Class.update (A, {
		name: "ClassA"
	});
	
	QUnit.ok (Class.getClassByName ("ClassA") === A, "Class update (name).");
	
	A = Class.create ({
		name: "ClassTestA2"
	});
	
	Class.update (A, {
		name: null
	});
	
	QUnit.ok (Class.getClassByName ("ClassTestA2") === null, "Class update (name), null.");
	
	A = Class.create ({
		singleton: true
	});

	Class.update (A, {
		singleton: false
	});
	
	try{
		new A ();
		QUnit.ok (A.getInstance === undefined, "Class update (singleton).");
	}catch (e){
		QUnit.ok (false, "Class update (singleton).");
	}
	
	A = Class.create ();

	Class.update (A, {
		singleton: true
	});
	
	try{
		new A ();
		QUnit.ok (false, "Class update (singleton).");
	}catch (e){
		QUnit.ok (A.getInstance !== undefined, "Class update (singleton).");
	}
	
	A = Class.create ({
		properties: {
			a: function (){
				return this._a;
			}
		}
	});
	
	var a = new A ();
	
	Class.update (A, {
		constructor: function (){
			this._a = "a";
		}
	});
	
	QUnit.ok (new A ().a () === "a", "Class update (constructor) before class instantiation.");
	QUnit.ok (a.a () === undefined, "Class update (constructor) after class instantiation.");
	
	A = Class.create ({
		constructor: function (){
			this.a = "a";
		}
	});
	
	a = new A ();
	
	Class.update (A, {
		constructor: null
	});
	
	QUnit.ok (new A ().a === undefined, "Class update (constructor) before class instantiation, null.");
	QUnit.ok (a.a === "a", "Class update (constructor) after class instantiation, null.");
	
	A = Class.create ({
		constructor: function (){
			this._a = "a";
		},
		properties: {
			a: function (){
				return this._a;
			},
			z: function (){
				return "z";
			}
		}
	});
	
	a = new A ();
	
	Class.update (A, {
		properties: {
			a: function (){
				return this._a + "a";
			}
		}
	});
	
	QUnit.ok (new A ().a () === "aa", "Class update (properties) before class instantiation.");
	QUnit.ok (new A ().z === undefined, "Class update (properties) before class instantiation.");
	QUnit.ok (a.a () === "aa", "Class update (properties) after class instantiation.");
	QUnit.ok (a.z === undefined, "Class update (properties) after class instantiation.");
	
	A = Class.create ({
		properties: {
			a: function (){
				return "a";
			}
		}
	});
	
	var B = Class.create ({
		extend: A,
		properties: {
			b: function (){
				return "b";
			}
		}
	});
	
	var b = new B ();
	
	Class.update (B, {
		properties: null
	});
	
	QUnit.ok (new B ().b === undefined && new B ().a () === "a", "Class update (properties) before class instantiation, null.");
	QUnit.ok (b.b === undefined && b.a () === "a", "Class update (properties) after class instantiation, null.");
	
	A = Class.create ({
		properties: {
			a: function (){
				return "a";
			}
		}
	});
	
	a = new A ();
	
	Class.update (A, {
		augment: {
			b: function (){
				return "b";
			}
		}
	});
	
	QUnit.ok (new A ().b () === "b", "Class update (augment) before class instantiation.");
	QUnit.ok (a.b () === "b", "Class update (augment) after class instantiation.");
	
	A = Class.create ({
		properties: {
			a: function (){
				return "a";
			}
		}
	});
	
	B = Class.create ({
		extend: A,
		properties: {
			lol: function (){
				return "lol";
			}
		}
	});
	
	b = new B ();
	
	Class.update (B, {
		augment: {
			b: function (){
				return "b";
			}
		}
	});
	
	QUnit.ok (new B ().b () === "b" && new B ().a () === "a" && new B ().lol () === "lol", "Class update (augment) before class instantiation.");
	QUnit.ok (b.b () === "b" && b.a () === "a" && b.lol () === "lol", "Class update (augment) after class instantiation.");
	
	A = Class.create ({
		properties: {
			a: function (){
				return "a";
			}
		}
	});
	
	a = new A ();
	
	Class.update (A, {
		augment: {
			a: function (){
				return "b";
			}
		}
	});
	
	QUnit.ok (new A ().a () === "b", "Class update (augment override) before class instantiation.");
	QUnit.ok (a.a () === "b", "Class update (augment override) after class instantiation.");
	
	A = Class.create ({
		properties: {
			a: function (){
				return "a";
			}
		}
	});
	
	a = new A ();
	
	Class.update (A, {
		properties: {
			a: function (){
				return "aa";
			}
		},
		augment: {
			a: function (){
				return "aaa";
			},
			b: function (){
				return "b";
			}
		}
	});
	
	QUnit.ok (new A ().a () === "aaa", "Class update (augment override properties) before class instantiation.");
	QUnit.ok (a.a () === "aaa", "Class update (augment override properties) after class instantiation.");
	QUnit.ok (a.b () === "b", "Class update (augment properties) after class instantiation.");
});