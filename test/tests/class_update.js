var executeClassUpdateTest = function (test){
	test.expect (16);
	
	var A = Class.create ({
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
	
	var a = new A ();
	
	Class.update (A, {
		properties: {
			a: function (){
				return this._a + "a";
			}
		}
	});
	
	test.ok (new A ().a () === "aa", "Class update (properties) before class instantiation.");
	test.ok (new A ().z === undefined, "Class update (properties) before class instantiation.");
	test.ok (a.a () === "aa", "Class update (properties) after class instantiation.");
	test.ok (a.z === undefined, "Class update (properties) after class instantiation.");
	
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
	
	test.ok (new B ().b === undefined && new B ().a () === "a", "Class update (properties) before class instantiation, null.");
	test.ok (b.b === undefined && b.a () === "a", "Class update (properties) after class instantiation, null.");
	
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
	
	test.ok (new A ().b () === "b", "Class update (augment) before class instantiation.");
	test.ok (a.b () === "b", "Class update (augment) after class instantiation.");
	
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
	
	test.ok (new B ().b () === "b" && new B ().a () === "a" && new B ().lol () === "lol", "Class update (augment) before class instantiation.");
	test.ok (b.b () === "b" && b.a () === "a" && b.lol () === "lol", "Class update (augment) after class instantiation.");
	
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
	
	test.ok (new A ().a () === "b", "Class update (augment override) before class instantiation.");
	test.ok (a.a () === "b", "Class update (augment override) after class instantiation.");
	
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
	
	test.ok (new A ().a () === "aaa", "Class update (augment override properties) before class instantiation.");
	test.ok (a.a () === "aaa", "Class update (augment override properties) after class instantiation.");
	test.ok (a.b () === "b", "Class update (augment properties) after class instantiation.");
	
	Class.update (A, {
		onUpdate: function (c){
			test.ok (true, "onUpdate().");
		}
	});
};

if (typeof window === "undefined"){
	var Class = require ("../../build/node/classful");
	
	module.exports["Class update"] = function (test){
		executeClassUpdateTest (test);
		test.done ();
	}
}else{
	QUnit.test ("Class update", function (){
		executeClassUpdateTest (QUnit);
	});
}
