var JohnResigDefinition = Class.create ({
	properties: {
		run: function (){
			var A = (function (){
				var _a;
				return JohnResigClass.extend ({
					init: function (a){
						_a = a;
					},
					a: function (){
						return _a;
					}
				});
			})();
			
			var B = (function (){
				var _b;
				return A.extend ({
					init: function (a, b){
						this._super (a);
						_b = b;
					},
					b: function (){
						return _b;
					}
				});
			})();
			
			var C = (function (){
				var _c;
				return B.extend ({
					init: function (a, b, c){
						this._super (a, b);
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

var JohnResigInstantiation = (function (){
	var A = (function (){
		var _a;
		return JohnResigClass.extend ({
			init: function (a){
				_a = 1;
			},
			a: function (){
				return _a;
			}
		});
	})();
	
	var B = (function (){
		var _b;
		return A.extend ({
			init: function (a, b){
				this._super (a);
				_b = b;
			},
			b: function (){
				return _b;
			}
		});
	})();
	
	var C = (function (){
		var _c;
		return B.extend ({
			init: function (a, b, c){
				this._super (a, b);
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