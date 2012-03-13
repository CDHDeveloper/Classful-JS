var ClassyDefinition = Class.create ({
	properties: {
		run: function (){
			var A = (function (){
				var _a;
				return Classy.$extend ({
					__init__: function (a){
						_a = a;
					},
					a: function (){
						return _a;
					}
				});
			})();
			
			var B = (function (){
				var _b;
				return A.$extend ({
					__init__: function (a, b){
						this.$super (a);
						_b = b;
					},
					b: function (){
						return _b;
					}
				});
			})();
			
			var C = (function (){
				var _c;
				return B.$extend ({
					__init__: function (a, b, c){
						this.$super (a, b);
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

var ClassyInstantiation = (function (){
	var A = (function (){
		var _a;
		return Classy.$extend ({
			__init__: function (a){
				_a = 1;
			},
			a: function (){
				return _a;
			}
		});
	})();
	
	var B = (function (){
		var _b;
		return A.$extend ({
			__init__: function (a, b){
				this.$super (a);
				_b = b;
			},
			b: function (){
				return _b;
			}
		});
	})();
	
	var C = (function (){
		var _c;
		return B.$extend ({
			__init__: function (a, b, c){
				this.$super (a, b);
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