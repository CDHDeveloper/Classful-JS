QUnit.test ("Class creation", function (){
	QUnit.expect (10);
	
	Class.namespace ();
	
	var Test = Class.create ({
		name: "Test"
	});
	QUnit.ok (Class.getClassByName ("Test") === Test, "Class creation in default package (root).");
	
	Class.namespace ("test.class_creation");
	
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
		extend: A,
		constructor: function (a, b){
			this.__super__ (a);
			this._b = b;
		},
		properties: {
			a: function (){
				return "B: " + this.__super__.a ();
			},
			b: function (){
				return this._b;
			}
		}
	});

	var C = Class.create ({
		extend: B,
		constructor: function (a, b, c){
			this.__super__ (a, b);
			this._c = c;
		},
		properties: {
			a: function (){
				return "C: " + this.__super__.a ();
			},
			b: function (){
				return "C: " + this.__super__.b ();
			},
			c: function (){
				return this._c;
			}
		}
	});
	
	QUnit.ok (new C (1, 2, 3).a () === "C: B: 1", "Inheritance chain with multiple superclasses.");
	
	A = Class.create ();

	B = Class.create ({
		extend: A,
		properties: {
			b: function (){
				this.__super__ ();
			}
		}
	});
	
	try{
		new B ().b ();
		QUnit.ok (false, "Cannot call super constructor called inside a method.");
	}catch (e){
		QUnit.ok (true, "Cannot call super constructor called inside a method.");
	}
	
	A = Class.create ();

	B = Class.create ({
		extend: A,
		constructor: function (){}
	});

	C = Class.create ({
		extend: B,
		constructor: function (){
			this.__super__ ();
		}
	});
	
	try{
		C ();
		QUnit.ok (true, "If the super class has the default constructor, the subclass does not need to call the super constructor");
	}catch (e){
		QUnit.ok (false, "If the super class has the default constructor, the subclass does not need to call the super constructor");
	}
	
	A = Class.create ({
		constructor: function (){}
	});

	B = Class.create ({
		extend: A,
		constructor: function (){}
	});

	C = Class.create ({
		extend: B,
		constructor: function (){
			this.__super__ ();
		}
	});
	
	try{
		new C ();
		QUnit.ok (false, "The super constructor must be called if the super class defines a constructor.");
	}catch (e){
		QUnit.ok (true, "The super constructor must be called if the super class defines a constructor.");
	}
	
	A = Class.create ({
		constructor: function (){
			this.__super__ ();
		}
	});
	
	try{
		new A ();
		QUnit.ok (false, "Cannot call the super constructor if the class does not extend from any other class.");
	}catch (e){
		QUnit.ok (true, "Cannot call the super constructor if the class does not extend from any other class.");
	}
	
	A = Class.create ({
		singleton: true,
		constructor: function (){
			this.a = "a";
		}
	});
	
	try{
		new A ();
		QUnit.ok (false, "Cannot instantiate a singleton.");
	}catch (e){
		QUnit.ok (true, "Cannot instantiate a singleton.");
	}
	QUnit.ok (A.getInstance ().a === "a", "Singleton getInstance().");
	
	try{
		B = Class.create ({
			extend: A
		});
		QUnit.ok (false, "Cannot extend a singleton.");
	}catch (e){
		QUnit.ok (true, "Cannot extend a singleton.");
	}
	
	Class.create ({
		properties: {
			a: 2
		},
		onCreate: function (c){
			QUnit.ok (new c ().a === 2, "onCreate().");
		}
	});
});