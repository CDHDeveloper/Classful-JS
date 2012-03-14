var JClass2k = function(current,previous){
	previous = typeof previous == 'undefined' ? {} : previous.prototype;
	for(p in previous){
		if(typeof current[p] == 'undefined') current[p] = previous[p];
		else if(typeof previous[p] == 'function'){
			current[p] = (function(tmp){
				var _parent = function(){
					this.parent = _parent.parent;
					return tmp.apply(this, arguments);
				}
				return _parent;
			})(current[p]);
			current[p].parent = previous[p];
		}
	}
	var construct = function(){
		if(this.init) this.init.apply(this,arguments);
	}
	construct.prototype = current;
	construct.constructor = JClass2k;
	return construct;
}