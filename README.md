Classful JS
===========

#### The definitive JavaScript class library ####

Version: 1.1 revision 1

*Classful JS* is a library that eases the manipulation and usage of JavaScript prototypes.

This library aims to provide a simple, lightweight and easy to use class module. It's basically a shortcut to the `prototype` property. Due to the nature of JavaScript, some hacks must be done to implement a correct prototypal inheritance. Also, take into account that classes are just functions so they can be called with "new" or without it. That's a problem.

There are some other JavaScript class libraries out in the market but they lack in some points:

* Class modifications during run-time. They can't modify the classes, with *Classful JS* you can with some limitations.
* Partial inheritance. Most libraries can only call the super constructor, but what happens if you are overriding an inherited property? You probably want to call the super property. With *Classful JS* you can achieve this and more.
* Complexity. Some libraries tend to be huge, heavy, with a lot of features that you probably will never use. For some reason they want to convert a dynamic language like JavaScript, into a static language like Java or C#. *Classful JS* has been designed to be simple and easy to use, with just the necessary features to wrap the `prototype` property.  
* Ugly and messy syntax. If you're writing JavaScript code why some libraries try to simulate the syntax of other languages? If you're creating a class why some libraries create them improperly from the design and usability points of view? *Classful JS* prioritizes a good design.

The *Classful JS* library unifies all of these aspects and also performs some internal validations to ensure the correct usage.

#### Quick example ####

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

#### Benchmark ####

  * Loops: 10000.
  * Runs: 10.
  * Time calculated by (the smallest, the best):
    
    ![Speed benchmark formula](http://image.gxzone.com/images/9/4/94ea3db6db7.gif)
  * Hardware: Intel i5-2500K @ 4.1GHz, 8GB DDR3 @ 686MHz.
  * Browser: Firefox 11.
  * For more information about the benchmark see: [Benchmark](https://github.com/Gagle/Classful-JS/blob/master/test/benchmark.html).

![Benchmark definition](http://image.gxzone.com/images/a/7/a7e4df0aee6.png)  
![Benchmark instantiation](http://image.gxzone.com/images/c/b/cb7f17b1769.png)

#### Documentation ####

[Usage](https://github.com/Gagle/Classful-JS/wiki/Usage)  
[Advanced topics](https://github.com/Gagle/Classful-JS/wiki/Advanced-topics)  
[Reference](https://github.com/Gagle/Classful-JS/wiki/Reference)  
[Change log](https://github.com/Gagle/Classful-JS/wiki/Change-log)  
[MIT License](https://github.com/Gagle/Classful-JS/blob/master/LICENSE)