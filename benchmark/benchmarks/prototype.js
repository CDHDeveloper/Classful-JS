var PrototypeDefinition = Class.create ({
	properties: {
		run: function (){
			var A = (function (){
				var _a;
				return PrototypeClass.create ({
					initialize: function (a){
						_a = a;
					},
					a: function (){
						return _a;
					}
				});
			})();
			
			var B = (function (){
				var _b;
				return PrototypeClass.create (A, {
					initialize: function ($super, a, b){
						$super (a);
						_b = b;
					},
					b: function (){
						return _b;
					}
				});
			})();
			
			var C = (function (){
				var _c;
				return PrototypeClass.create (B, {
					initialize: function ($super, a, b, c){
						$super (a, b);
						_c = c;
					},
					c: function (){
						return _c;
					}
				});
			})();
		}
	}
});

var PrototypeInstantiation = (function (){
	var A = (function (){
		var _a;
		return PrototypeClass.create ({
			initialize: function (a){
				_a = a;
			},
			a: function (){
				return _a;
			}
		});
	})();
	
	var B = (function (){
		var _b;
		return PrototypeClass.create (A, {
			initialize: function ($super, a, b){
				$super (a);
				_b = b;
			},
			b: function (){
				return _b;
			}
		});
	})();
	
	var C = (function (){
		var _c;
		return PrototypeClass.create (B, {
			initialize: function ($super, a, b, c){
				$super (a, b);
				_c = c;
			},
			c: function (){
				return _c;
			}
		});
	})();
	
	return Class.create ({
		properties: {
			run: function (){
				new C ("a", "b", "c");
			}
		}
	});
})();