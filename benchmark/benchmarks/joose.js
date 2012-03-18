var JooseDefinition = Class.create ({
	properties: {
		run: function (){
			var A = (function (){
				var _a;
				return JooseClass ("A", {
					methods: {
						a: function (){
							return _a;
						}
					},
					after : {
						initialize : function (props) {
							_a = props.a;
						} 
					}
				});
			})();

			var B = (function (){
				var _b;
				return JooseClass ("B", {
					isa: A,
					methods: {
						b: function (){
							return _b;
						}
					},
					override: {
						initialize : function (props){
							this.SUPER (props);
							_b = props.b;
						} 
					}
				});
			})();
			
			var C = (function (){
				var _c;
				return JooseClass ("C", {
					isa: B,
					methods: {
						c: function (){
							return _c;
						}
					},
					override: {
						initialize : function (props){
							this.SUPER (props);
							_c = props.c;
						} 
					}
				});
			})();
		}
	}
});

var JooseInstantiation = (function (){
	var A = (function (){
		var _a;
		return JooseClass ("A", {
			methods: {
				a: function (){
					return _a;
				}
			},
			after : {
				initialize : function (props) {
					_a = props.a;
				} 
			}
		});
	})();

	var B = (function (){
		var _b;
		return JooseClass ("B", {
			isa: A,
			methods: {
				b: function (){
					return _b;
				}
			},
			override: {
				initialize : function (props){
					this.SUPER (props);
					_b = props.b;
				} 
			}
		});
	})();
	
	var C = (function (){
		var _c;
		return JooseClass ("C", {
			isa: B,
			methods: {
				c: function (){
					return _c;
				}
			},
			override: {
				initialize : function (props){
					this.SUPER (props);
					_c = props.c;
				} 
			}
		});
	})();
	
	return Class.create ({
		properties: {
			run: function (){
				new C ({ a: "a", b: "b", c: "3" })
			}
		}
	});
})();