var Class = require ("../build/node/classful");

var d = require ("./benchmarks/default");
var DefaultDefinition = d.DefaultDefinition;
var DefaultInstantiation = d.DefaultInstantiation;

var c = require ("./benchmarks/classful");
var ClassfulDefinition = c.ClassfulDefinition;
var ClassfulInstantiation = c.ClassfulInstantiation;

var Benchmark = (function (){
	var _loops;
	var _runs;
	var _strategy;
	
	return Class.create ({
		constructor: function (loops, runs, strategy){
			_loops = loops;
			_runs = runs;
			_strategy = strategy;
		},
		properties: {
			run: function (){
				var average = 0;
	
				for (var r=0; r<_runs; r++){
					var start = new Date ().getTime ();
					
					for (var i=0; i<_loops; i++){
						_strategy.run ();
					}
					
					average += new Date ().getTime () - start;
				}
				
				average /= _runs;
				console.log ("Average: " + average + "ms");
			}
		}
	});
})();

var loops = 10000;
var runs = 10;

console.log ("Runs: " + runs);
console.log ("Loops per run: " + loops);

function benchDefaultDefinition (){ new Benchmark (loops, runs, new DefaultDefinition ()).run (); }
function benchDefaultInstantiation (){ new Benchmark (loops, runs, new DefaultInstantiation ()).run (); }

function benchClassfulDefinition (){ new Benchmark (loops, runs, new ClassfulDefinition ()).run (); }
function benchClassfulInstantiation (){ new Benchmark (loops, runs, new ClassfulInstantiation ()).run (); }

console.log ("\nDefault definition");
benchDefaultDefinition ();

console.log ("Default instantiation");
benchDefaultInstantiation ();

console.log ("\nClassful JS definition");
benchClassfulDefinition ();

console.log ("Classful JS instantiation");
benchClassfulInstantiation ();