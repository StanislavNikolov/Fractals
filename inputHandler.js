global.inputHandler.parse = function parse(codeStr)
{
	var output = []; // self explanatory
	var map = {u:0, d:1, l:2, r:3, s:4, C:5}; // A dictionary holding the instruction codes

	function getParams(startPos)
	{
		// WARNING: The following code is ugly and probably broken. Fix it if you can.
		var params = [0];
		var escaped = false;
		var special = false;
		for(var idx = startPos;codeStr[idx] != '}';idx ++)
		{
			if(codeStr[idx] == '%') // ... so we can say c{0,0,%r}
				special = true;
			else
				special = false;

			if(codeStr[idx] == '\\') // for escaping(?) the '%' character
				escaped = true;
			else
				escaped = false;
			
			// Why (special == escaped) you might ask. Well....
			// I don't know. Just guessing.
			if((special == escaped) && codeStr[idx] >= '0' && codeStr[idx] <= '9')
			{
				// I really hope this behaves like in c/c++
				params[params.length-1] *= 10; // example: 56 -> 560 -> 567
				params[params.length-1] += codeStr[idx] - '0';
			}

			if(codeStr[idx] == ',')
				params.push(0); // next argument/parameter
		}
		
		return params;
		// End of ugly code.
	}

	function translateToObj(insChar, params)
	{
		/*
		* Get params returns array of all the argumens given in the {} block.
		* This function SHOULD translete the array to a object with things
		* like jumpSize, rgb, etc.
		*/
		var obj = {};
		switch(insChar)
		{
			case 'C':
				obj.color = "rgb(" + params[0] + "," + params[1] + "," + params[2] + ")";
				break;
		}
		
		return obj;
	}

	for(var idx in codeStr)
	{
		if(codeStr[idx] == '{') {continue;}
		if(codeStr[idx] >= 'A' && codeStr[idx] <= 'Z')
		{
			var args = getParams(idx);
			output.push(new global.simulator.Instruction(  map[codeStr[idx]], translateToObj(codeStr[idx], args)  ));
		}
		else if(codeStr[idx] >= 'a' && codeStr[idx] <= 'z')
		{
			output.push(new global.simulator.Instruction( map[codeStr[idx]], {jumpSize: 10} ));
		}
	}
	
	return output;
}


function init()
{
	var vec = new global.common.Vector(10, 10); // Initial position
	var ins = global.inputHandler.parse("drurrC{100,100,100}sddd"); // Instructions

	global.simulator.turtles.push( new global.simulator.Turtle(vec, ins, "blue") );
}

init();
