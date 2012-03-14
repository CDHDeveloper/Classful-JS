QUnit.test ("Class creation", function (){
	QUnit.expect (10);
	
	var A = Class.create ();
	QUnit.ok (new A () instanceof A, "Empty class.");
	
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
	
	QUnit.ok (new C (1, 2, 3).a () === "C: B: 1", "Inheritance chain with multiple superclasses.");
	QUnit.ok (new C (1, 2, 3).b () === undefined, "Inheritance chain with multiple superclasses.");
	QUnit.ok (new C (1, 2, 3).c () === "B: 1", "Inheritance chain with multiple superclasses.");
	
	var c = new C ();
	QUnit.ok (c instanceof A && c instanceof B && c instanceof C && !(new B () instanceof C), "\"instanceof\" keyword.");
	
	A = Class.create ({
		constructor: function (){
			this.a = "a";
		}
	});
	
	QUnit.ok (A ().a === "a", "Instantiation without new.");

	A = Class.create ({
		singleton: true,
		constructor: function (){
			this.a = "a";
		}
	});
	
	try{
		new A ();
		QUnit.ok (false, "Cannot instantiate a singleton (is not a constructor).");
	}catch (e){
		QUnit.ok (true, "Cannot instantiate a singleton (is not a constructor).");
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