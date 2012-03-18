<a name="start"></a>

Classful JS
===========

[Quick example](#quick-example) | [Availability](#availability) | [Benchmark](#benchmark) | [Compatibility](#compatibility) | [Documentation](#documentation) 

#### The definitive JavaScript class library ####

Version: 1.1.1

*Classful JS* is a library that eases the manipulation and usage of JavaScript prototypes.

This library aims to provide a simple, lightweight and easy to use class module. It's basically a shortcut to the `prototype` property. Due to the nature of JavaScript, some hacks must be done to implement a correct prototypal inheritance. Also, take into account that classes are just functions so they can be called with "new" or without it. That's a problem.

There are some other JavaScript class libraries out in the market but they lack in some points:

* Class modifications during run-time. They can't modify the classes, with *Classful JS* you can with some limitations.
* Partial inheritance. Most libraries can only call the super constructor, but what happens if you are overriding an inherited property? You probably want to call the super property. With *Classful JS* you can achieve this and more.
* Complexity. Some libraries tend to be huge, heavy, with a lot of features that you probably will never use. For some reason they want to convert a dynamic language like JavaScript, into a static language like Java or C#. *Classful JS* has been designed to be simple and easy to use, with just the necessary features to wrap the `prototype` property.  
* Ugly and messy syntax. If you're writing JavaScript code why some libraries try to simulate the syntax of other languages? If you're creating a class why some libraries create them improperly from the design and usability points of view? *Classful JS* prioritizes a good design.

The *Classful JS* library unifies all of these aspects and also performs some internal validations to ensure the correct usage.

***

<a name="quick-example"></a>
#### Quick example [↑](#start) ####

```javascript
var A = Class.create ({
	constructor: function (a){
		this._a = a;
	},
	properties: {
		a: function (){
			return this._a;
		}
	}
});

var B = Class.create ({
	extend: A,
	constructor: function (a){
		this.__super__.constructor (a);
	},
	properties: {
		a: function (){
			return "Letter: " + this.__super__.a ();
		}
	}
});

console.log (new B ("a").a ()); //Prints: Letter a
console.log (new B () instanceof A && new B () instanceof B); //Prints: true
```

***

<a name="availability"></a>
#### Availability [↑](#start) ####

_Classful JS_ is available in 3 ways:

__Standalone__  ([Download](https://github.com/Gagle/Classful-JS/blob/master/build/classful.js))  
Available through the global namespace `Class`.

```javascript
Class.create ();
```

__Module for AMD loaders__ ([Download](https://github.com/Gagle/Classful-JS/blob/master/build/amd/classful.js))  
Example with __RequireJS__:

```javascript
require.config ({
	paths: {
		"classful": "path/to/classful"
	}
});
require (["classful"], function (Class){
	Class.create ();
});
```

__Node.js__  


```
npm install classful
```

```javascript
var Class = require ("classful");
Class.create ();
```

***

<a name="benchmark"></a>
#### Benchmark [↑](#start) ####

  * Loops: 10000.
  * Runs: 10.
  * Time calculated by (the smallest, the best):
    
    ![Benchmark formula](http://image.gxzone.com/images/1/e/1ef2eaa20a1.png)
  * Hardware: Intel i5-2500K @ 4.1GHz, 8GB DDR3 @ 686MHz.
  * Browser: Firefox 11.
  * For more information about the benchmark see: [Benchmark](https://github.com/Gagle/Classful-JS/blob/master/test/benchmark.html).

![Benchmark definition](http://image.gxzone.com/images/a/7/a7e4df0aee6.png)  
![Benchmark instantiation](http://image.gxzone.com/images/c/b/cb7f17b1769.png)

***

<a name="compatibility"></a>
#### Compatibility [↑](#start) ####

✔ Chrome 5+  
✔ Firefox 4+  
✔ Internet Explorer 9+  
✔ Opera 11.60+  
✔ Safari 5+

***

<a name="documentation"></a>
#### Documentation [↑](#start) ####

[Usage](https://github.com/Gagle/Classful-JS/wiki/Usage)  
[Advanced topics](https://github.com/Gagle/Classful-JS/wiki/Advanced-topics)  
[Reference](https://github.com/Gagle/Classful-JS/wiki/Reference)  
[Change log](https://github.com/Gagle/Classful-JS/wiki/Change-log)  
[MIT License](https://github.com/Gagle/Classful-JS/blob/master/LICENSE)