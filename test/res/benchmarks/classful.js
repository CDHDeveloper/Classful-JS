var ClassfulDefinition = Class.create ({
	properties: {
		run: function (){
			var A = (function (){
				var _a;
				return Class.create ({
					constructor: function (a){
						_a = 1;
					},
					properties: {
						a: function (){
							return _a;
						}
					}
				});
			})();
			
			var B = (function (){
				var _b;
				return Class.create ({
					extend: A,
					constructor: function (a, b){
						this.__super__.constructor (a);
						_b = b;
					},
					properties: {
						b: function (){
							return _b;
						}
					}
				});
			})();
			
			var C = (function (){
				var _c;
				return Class.create ({
					extend: B,
					constructor: function (a, b, c){
						this.__super__.constructor (a, b);
						_c = c;
					},
					properties: {
						c: function (){
							return _c;
						}
					}
				});
			})();
		}
	}
});

var ClassfulInstantiation = (function (){
	var A = (function (){
		var _a;
		return Class.create ({
			constructor: function (a){
				_a = 1;
			},
			properties: {
				a: function (){
					return _a;
				}
			}
		});
	})();
	
	var B = (function (){
		var _b;
		return Class.create ({
			extend: A,
			constructor: function (a, b){
				this.__super__.constructor (a);
				_b = b;
			},
			properties: {
				b: function (){
					return _b;
				}
			}
		});
	})();
	
	var C = (function (){
		var _c;
		return Class.create ({
			extend: B,
			constructor: function (a, b, c){
				this.__super__.constructor (a, b);
				_c = c;
			},
			properties: {
				c: function (){
					return _c;
				}
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