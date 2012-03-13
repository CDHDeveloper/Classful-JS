var MooToolsDefinition = Class.create ({
	properties: {
		run: function (){
			var A = (function (){
				var _a;
				return new MooToolsClass ({
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
				return new MooToolsClass ({
					Extends: A,
					initialize: function (a, b){
						this.parent (a);
						_b = b;
					},
					b: function (){
						return _b;
					}
				});
			})();
			
			var C = (function (){
				var _c;
				return new MooToolsClass ({
					Extends: B,
					initialize: function (a, b, c){
						this.parent (a, b);
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

var MooToolsInstantiation = (function (){
	var A = (function (){
		var _a;
		return new MooToolsClass ({
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
		return new MooToolsClass ({
			Extends: A,
			initialize: function (a, b){
				this.parent (a);
				_b = b;
			},
			b: function (){
				return _b;
			}
		});
	})();
	
	var C = (function (){
		var _c;
		return new MooToolsClass ({
			Extends: B,
			initialize: function (a, b, c){
				this.parent (a, b);
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