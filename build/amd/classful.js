'use strict';(function(){window.define({create:function(d){var b=function(){if(void 0!==this)c&&c.apply(this,arguments);else{var a=Object.create(b.prototype);c&&c.apply(a,arguments);return a}},c;if(d){var a=d.constructor;a!==Object&&(c=a);var e=d.extend;if(e)if(a=typeof e,"function"===a)b.prototype=Object.create(e.prototype),Object.defineProperties(b.prototype,{constructor:{value:b,enumerable:!1},__super__:{value:e.prototype,enumerable:!1}});else{if("object"===a)throw"Cannot extend a singleton.";
throw"Invalid class to extend.";}if(a=d.properties)if(e)for(var f in a)b.prototype[f]=a[f];else b.prototype=a,Object.defineProperty(b.prototype,"constructor",{value:b,enumerable:!1});if(a=d.singleton)e=b.prototype,b={getInstance:function(){var a;return function(){if(!a)return a=Object.create(b.prototype),c&&c.call(a),this.getInstance=function(){return a},a}}()},b.prototype=e;(a=d.onCreate)&&a(b)}return b},update:function(d,b){var c=b.properties;if(void 0!==c){for(var a in d.prototype)d.prototype.hasOwnProperty(a)&&
delete d.prototype[a];if(null!==c)for(a in c)d.prototype[a]=c[a]}if(c=b.augment)for(a in c)d.prototype[a]=c[a];(c=b.onUpdate)&&c(d)}})})();
