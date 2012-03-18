/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // The base JohnResigClass implementation (does nothing)
  this.JohnResigClass = function(){};
 
  // Create a new JohnResigClass that inherits from this JohnResigClass
  JohnResigClass.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base JohnResigClass (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-JohnResigClass
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);       
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy JohnResigClass constructor
    function JohnResigClass() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    JohnResigClass.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    JohnResigClass.prototype.constructor = JohnResigClass;

    // And make this JohnResigClass extendable
    JohnResigClass.extend = arguments.callee;
   
    return JohnResigClass;
  };
})();