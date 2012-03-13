var JSClassDefinition = Class.create ({
	properties: {
		run: function (){
			var A = (function (){
				var _a;
				return new JS.Class ({
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
				return new JS.Class (A, {
					initialize: function (a, b){
						this.callSuper (a);
						_b = b;
					},
					b: function (){
						return _b;
					}
				});
			})();
			
			var C = (function (){
				var _c;
				return new JS.Class (B, {
					initialize: function (a, b, c){
						this.callSuper (a, b);
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

var JSClassInstantiation = function (){
	var A = (function (){
		var _a;
		return new JS.Class ({
			initialize: function (a){
				_a = 1;
			},
			a: function (){
				return _a;
			}
		});
	})();
	
	var B = (function (){
		var _b;
		return new JS.Class (A, {
			initialize: function (a, b){
				this.callSuper (a);
				_b = b;
			},
			b: function (){
				return _b;
			}
		});
	})();
	
	var C = (function (){
		var _c;
		return new JS.Class (B, {
			initialize: function (a, b, c){
				this.callSuper (a, b);
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
};