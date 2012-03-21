if (typeof window === "undefined"){
	var Class = require ("../../build/node/classful");
}

var DefaultDefinition = Class.create ({
	properties: {
		run: function (){
			var A = (function (){
				var _a;
				
				var f = function (a){
					_a = a;
				};
				
				f.prototype = {
					a: function (){
						return _a;
					}
				};
				
				Object.defineProperty (f.prototype, "constructor", {
					value: f,
					enumerable: false
				});
				
				return f;
			})();
			
			var B = (function (){
				var _b;
				
				var f = function (a, b){
					A.call (this, a);
					_b = b;
				};
				
				f.prototype = Object.create (A.prototype);
				
				Object.defineProperty (f.prototype, "constructor", {
					value: f,
					enumerable: false
				});
				
				f.prototype.b = function (){
					return _b;
				};
				
				return f;
			})();
			
			var C = (function (){
				var _c;
				
				var f = function (a, b, c){
					B.call (this, a, b);
					_c = c;
				};
				
				f.prototype = Object.create (B.prototype);
				
				Object.defineProperty (f.prototype, "constructor", {
					value: f,
					enumerable: false
				});
				
				f.prototype.c = function (){
					return _c;
				};
				
				return f;
			})();
		}
	}
});

var DefaultInstantiation = (function (){
	var A = (function (){
		var _a;
		
		var f = function (a){
			_a = a;
		};
		
		f.prototype = {
			a: function (){
				return _a;
			}
		};
		
		Object.defineProperty (f.prototype, "constructor", {
			value: f,
			enumerable: false
		});
		
		return f;
	})();
	
	var B = (function (){
		var _b;
		
		var f = function (a, b){
			A.call (this, a);
			_b = b;
		};
		
		f.prototype = Object.create (A.prototype);
		
		Object.defineProperty (f.prototype, "constructor", {
			value: f,
			enumerable: false
		});
		
		f.prototype.b = function (){
			return _b;
		};
		
		return f;
	})();
	
	var C = (function (){
		var _c;
		
		var f = function (a, b, c){
			B.call (this, a, b);
			_c = c;
		};
		
		f.prototype = Object.create (B.prototype);
		
		Object.defineProperty (f.prototype, "constructor", {
			value: f,
			enumerable: false
		});
		
		f.prototype.c = function (){
			return _c;
		};
		
		return f;
	})();
	
	return Class.create ({
		properties: {
			run: function (){
				new C ("a", "b", "c");
			}
		}
	});
})();

if (typeof window === "undefined"){
	module.exports.DefaultDefinition = DefaultDefinition;
	module.exports.DefaultInstantiation = DefaultInstantiation;
}