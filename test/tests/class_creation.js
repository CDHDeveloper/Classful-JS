var executeClassCreationTest = function (test){
	test.expect (10);
	
	var A = Class.create ();
	test.ok (new A () instanceof A, "Empty class.");
	
	A = Class.create ({
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
		extend: A,
		constructor: function (a, b){
			this.__super__.constructor (a);
			this._b = b;
		},
		properties: {
			a: function (){
				return "B: " + this.__super__.a ();
			},
			b: function (){
				return this.__super__.c;
			}
		}
	});

	var C = Class.create ({
		extend: B,
		constructor: function (a, b, c){
			this.__super__.constructor (a, b);
			this._c = c;
		},
		properties: {
			a: function (){
				return "C: " + this.__super__.a ();
			},
			c: function (){
				return this.__super__.a ();
			}
		}
	});
	
	test.ok (new C (1, 2, 3).a () === "C: B: 1", "Inheritance chain with multiple superclasses.");
	test.ok (new C (1, 2, 3).b () === undefined, "Inheritance chain with multiple superclasses.");
	test.ok (new C (1, 2, 3).c () === "B: 1", "Inheritance chain with multiple superclasses.");
	
	var c = new C ();
	test.ok (c instanceof A && c instanceof B && c instanceof C && !(new B () instanceof C), "\"instanceof\" keyword.");
	
	A = Class.create ({
		constructor: function (){
			this.a = "a";
		}
	});
	
	test.ok (A ().a === "a", "Instantiation without new.");

	A = Class.create ({
		singleton: true,
		constructor: function (){
			this.a = "a";
		}
	});
	
	try{
		new A ();
		test.ok (false, "Cannot instantiate a singleton (is not a constructor).");
	}catch (e){
		test.ok (true, "Cannot instantiate a singleton (is not a constructor).");
	}
	
	test.ok (A.getInstance ().a === "a", "Singleton getInstance().");
	
	try{
		B = Class.create ({
			extend: A
		});
		test.ok (false, "Cannot extend a singleton.");
	}catch (e){
		test.ok (true, "Cannot extend a singleton.");
	}
	
	Class.create ({
		properties: {
			a: 2
		},
		onCreate: function (c){
			test.ok (new c ().a === 2, "onCreate().");
		}
	});
};

if (typeof window === "undefined"){
	var Class = require ("../../build/node/classful");
	
	module.exports["Class creation"] = function (test){
		executeClassCreationTest (test);
		test.done ();
	}
}else{
	QUnit.test ("Class creation", function (){
		executeClassCreationTest (QUnit);
	});
}

