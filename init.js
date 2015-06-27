function init()
{
	function genRandomInstructions()
	{
		var simpleInstructions = "udlrs", output = "";
		var n = Math.floor(Math.random()*10) + 5;

		for(var i = 0;i < n;i ++)
			output += simpleInstructions[Math.floor(Math.random() * simpleInstructions.length)];

		return output;
	}

	var codeStr = prompt("Enter initial instruction set", genRandomInstructions());

	// Check if initial instruction set is valid
	var bracketBalance = 0;
	for(var idx = 0;idx < codeStr.length;idx ++)
	{
		if(codeStr[idx] == '{')
			{ bracketBalance ++; }
		else if(codeStr[idx] == '}')
			{ bracketBalance --; }
		else if(global.config.codes[codeStr[idx]] == undefined && bracketBalance <= 0)
			{ throw ("Unknown instruction " + codeStr[idx]); }
	}
	if(bracketBalance > 0) {throw "Too many braces."}
	if(bracketBalance < 0) {throw "Not enough braces."}

	var vec = new global.common.Vector(200, 200); // Initial position
	var ins = global.inputHandler.parse(codeStr); // Initial instructions
	global.simulator.turtles.push( new global.common.Turtle(vec, ins, "blue") );
}

init();
