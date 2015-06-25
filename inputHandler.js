global.inputHandler.parse = function parse(codeStr)
{
	var output = [];
	var map = {u: 0, d: 1, l: 2, r: 3};

	for(var i in codeStr)
	{
		output.push(new global.simulator.Instruction(map[codeStr[i]], {jumpSize: 10}));
	}

	// TODO TODO TODO something different than "udlr"
	/*var inParamSec = false;
	var curr = 
	for(var idx in codeStr)
	{
		if(inParamSec)
	}*/

	//RRDC{256,0,$r}S = right, right, down, change color to rgb(256,0,random), split
	
	return output;
}


function debug()
{
	var vec = new global.common.Vector(10, 10);	
	var ins = global.inputHandler.parse("rrdl");
	global.simulator.turtles.push( new global.simulator.Turtle(vec, ins) );
}

debug();
