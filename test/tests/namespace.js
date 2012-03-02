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
});