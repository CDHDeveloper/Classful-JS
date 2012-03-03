/**
 * @name Classful JS.
 * @description Library that eases the manipulation and usage of JavaScript prototypes.
 *
 * @author Gabriel Llamas
 * @created 16/02/2012
 * @modified 02/03/2012
 * @version 1.0
 */
(function (holder){
"use strict";

var Class = (function (){
	var build = function (metadata){
		var defaultConstructor = false;
		if (!metadata.init){
			defaultConstructor = true;
			metadata.init = function (){
				if (Class.__metadata__.extend) this.__super__ ();
			};
		}
	
		var initSingleton = false;
		var Class = function (){
			if (metadata.singleton && !initSingleton){
				throw "Cannot instantiate a singleton. Use getInstance() method instead.";
			}
			
			var o = (this !== undefined) ? this : Object.create (Class.prototype);
			
			metadata.self = o;
			metadata.instantiating = true;
			
			Class.__metadata__.init.apply (o, arguments);
			
			metadata.instantiating = false;
			
			if (metadata.sup && !metadata.sup.__metadata__.defaultConstructor){
				throw "The constructor of the super class must be called explicitly.";
			}
			return o;
		};
		
		if (metadata.singleton){
			Object.defineProperty (Class, "getInstance", {
				value: (function (){
					var instance;
					return function (){
						if (!instance){
							initSingleton = true;
							instance = new Class ();
							initSingleton = false;
						}
						return instance;
					};
				})(),
				enumerable: true
			});
		}
		
		Object.defineProperty (Class, "__metadata__", {
			value: Object.defineProperties (Object.create (Object.prototype), {
				fullyQualifiedName: {
					value: metadata.fullyQualifiedName,
					enumerable: true,
					writable: true
				},
				singleton: {
					value: metadata.singleton,
					enumerable: true
				},
				properties: {
					value: metadata.properties,
					enumerable: true,
					writable: true
				},
				init: {
					value: metadata.init,
					enumerable: true,
					writable: true
				},
				defaultConstructor: {
					value: defaultConstructor,
					enumerable: true,
					writable: true
				},
				extend: {
					value: metadata.extend,
					enumerable: true
				}
			})
		});
		
		if (metadata.extend){
			buildPrototype (Class, metadata);
		}
		
		for (var p in metadata.properties){
			Class.prototype[p] = metadata.properties[p];
		}
		
		return Class;
	};
	
	var buildPrototype = function (f, metadata){
		f.prototype = Object.create (metadata.extend.prototype);
		Object.defineProperties (f.prototype, {
			constructor: {
				value: f
			},
			__super__: {
				value: (function (){
					var sup = metadata.extend;
					var curr;
					return function (){
						if (!metadata.instantiating){
							throw "Super constructor can only be called inside the constructor.";
						}
						
						if (!sup){
							throw "Cannot call the super constructor because the class does not extend from any" +
									" other class.";
						}
						
						curr = sup;
						sup = sup.__metadata__.extend;
						metadata.sup = sup;
						curr.prototype.constructor.apply (this, arguments);
						
						if (!sup) sup = metadata.extend;
					};
				})(),
				configurable: true
			}
		});
		
		var sup = metadata.extend;
		for (var p in metadata.extend.prototype){
			var v = metadata.extend.prototype[p];
			if (typeof v === "function"){
				Object.defineProperty (f.prototype.__super__, p, {
					value: (function (p){
						var curr;
						return function (){
							if (!sup){
								throw "Cannot call the super property \"" + p + "\" because the class does not" +
										" extend from any other class.";
							}
							
							curr = sup;
							sup = sup.__metadata__.extend;
							var r = curr.prototype[p].apply (metadata.self, arguments);
							sup = curr;
							
							return r;
						};
					})(p)
				});
			}
		}
	};
	
	var rebuild = function (f, metadata){
		if (!metadata.init){
			f.__metadata__.defaultConstructor = true;
			metadata.init = function (){
				if (f.__metadata__.extend) this.__super__ ();
			};
		}
		
		f.__metadata__.init = metadata.init;
		
		if (metadata.fullyQualifiedName !== undefined &&
				metadata.fullyQualifiedName !== f.__metadata__.fullyQualifiedName){
			if (metadata.fullyQualifiedName){
				if (f.__metadata__.fullyQualifiedName){
					var arr = f.__metadata__.fullyQualifiedName.split (".");
					delete namespace.using[arr[arr.length  - 1]];
				}
				namespace.using[metadata.name] = f;
				f.__metadata__.fullyQualifiedName = metadata.fullyQualifiedName;
			}else{
				var arr = f.__metadata__.fullyQualifiedName.split (".");
				delete namespace.using[arr[arr.length  - 1]];
			}
		}
		
		if (metadata.properties === undefined && f.__metadata__.properties){
			metadata.properties = f.__metadata__.properties;
		}
		
		if (metadata.properties !== undefined){
			if (metadata.properties || metadata.properties === null){
				for (var p in f.__metadata__.properties){
					delete f.prototype[p];
				}
			}
			
			if (metadata.properties !== null){
				for (var p in metadata.properties){
					f.prototype[p] = metadata.properties[p];
				}
			}else{
				metadata.properties = {};
			}
			
			f.__metadata__.properties = metadata.properties;
		}
	};
	
	var functions = {};
	
	var buildFullyQualifiedName = function (name){
		if (!(/^[a-z_][\w_]*$/i.test (name))){
			throw "Invalid class name.";
		}
		return namespace.string ? namespace.string + "." + name : name;
	};
	
	var getClassByName = function (name){
		var f = namespace (namespace.using, name, false) || namespace (functions, name, false);
		if (f instanceof Function){
			return f;
		}
		
		return null;
	};
	
	var namespace = function (root, chain, write){
		if (write === undefined) write = false;
		
		var levels = chain.split (".");
		var o = root;

		for (var i=0, len=levels.length; i<len; i++){
			var t = o[levels[i]] || ((write) ? {} : null);
			if (!t) return null;
			o = o[levels[i]] = t;
		}
		
		return o;
	};
	namespace.using = functions;
	namespace.string = "";
	
	var searchClass = function (clazz){
		if (typeof clazz === "string"){
			clazz = getClassByName (clazz);
			if (!clazz){
				throw "Class not found.";
			}
		}
		
		if (clazz.__metadata__.singleton){
			throw "Cannot extend a singleton.";
		}
		
		return clazz;
	};
	
	return {
		create: function (definition){
			var metadata = {
				fullyQualifiedName: null,
				properties: {},
				init: null,
				extend: null,
				singleton: false
			};
			
			var save = false;
			
			if (definition){
				if (definition.singleton !== undefined){
					metadata.singleton = definition.singleton;
				}
				
				if (definition.name !== undefined){
					metadata.fullyQualifiedName = buildFullyQualifiedName (definition.name);
					save = true;
				}
				
				if (definition.constructor !== undefined && definition.constructor !== Object){
					metadata.init = definition.constructor;
				}
				
				if (definition.properties !== undefined){
					metadata.properties = definition.properties;
				}
				
				if (definition.extend !== undefined){
					metadata.extend = searchClass (definition.extend);
				}
			}
			
			var f = build (metadata);
			
			if (save){
				namespace.using[definition.name] = f;
			}
			
			return f;
		},
		getClassByName: getClassByName,
		getNamespace: function (chain){
			if (!chain) return functions;
			var n = namespace (functions, chain, false);
			return n instanceof Function ? null : n;
		},
		namespace: function (chain){
			if (!chain){
				namespace.string = "";
				namespace.using = functions;
			}else{
				namespace.string = chain;
				namespace.using = namespace (functions, chain, true);
			}
		},
		update: function (f, changes){
			if (!changes) return;
			f = searchClass (f);
			
			var metadata = {
				fullyQualifiedName: undefined,
				name: changes.name,
				properties:  undefined,
				init: f.__metadata__.init
			};
			
			if (changes.name !== undefined){
				metadata.fullyQualifiedName = changes.name === null ? null : buildFullyQualifiedName (changes.name);
			}
			
			if (changes.constructor !== undefined && changes.constructor !== Object){
				metadata.init = changes.constructor;
			}
			
			if (changes.properties !== undefined){
				metadata.properties = changes.properties;
			}
			
			if (changes.augment){
				if (!metadata.properties){
					metadata.properties = f.__metadata__.properties;
				}
				
				for (var p in changes.augment){
					metadata.properties[p] = changes.augment[p];
				}
			}
			
			rebuild (f, metadata);
		}
	};
})();

holder.Class = Class;
})(this);