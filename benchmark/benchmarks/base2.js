var Base2Definition = Class.create ({
	properties: {
		run: function (){
			var Base = base2.Base;
			
			var A = (function (){
				var _a;
				return Base.extend ({
					constructor: function (a){
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
					constructor: function (a, b){
						this.base (a);
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
					constructor: function (a, b, c){
						this.base (a, b);
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

var Base2Instantiation = (function (){
	var Base = base2.Base;
	
	var A = (function (){
		var _a;
		return Base.extend ({
			constructor: function (a){
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
			constructor: function (a, b){
				this.base (a);
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
			constructor: function (a, b, c){
				this.base (a, b);
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