var JClass2kDefinition = Class.create ({
	properties: {
		run: function (){
			var A = (function (){
				var _a;
				return new JClass2k ({
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
				return new JClass2k ({
					init: function (a, b){
						this.parent (a);
						_b = b;
					},
					b: function (){
						return _b;
					}
				}, A);
			})();
			
			var C = (function (){
				var _c;
				return new JClass2k ({
					init: function (a, b, c){
						this.parent (a, b);
						_c = c;
					},
					c: function (){
						return _c;
					}
				}, B);
			})();
		}
	}
});

var JClass2kInstantiation = (function (){
	var A = (function (){
		var _a;
		return new JClass2k ({
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
		return new JClass2k ({
			init: function (a, b){
				this.parent (a);
				_b = b;
			},
			b: function (){
				return _b;
			}
		}, A);
	})();
	
	var C = (function (){
		var _c;
		return new JClass2k ({
			init: function (a, b, c){
				this.parent (a, b);
				_c = c;
			},
			c: function (){
				return _c;
			}
		}, B);
	})();
	
	return Class.create ({
		properties: {
			run: function (){
				new C ("a", "b", "c");
			}
		}
	});
})();