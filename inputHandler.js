global.inputHandler.parse = function parse(codeStr)
{
	function getArguments(startPos)
	{
		var args = [0];

		for(var idx = startPos;codeStr[idx] != '}';idx ++)
		{
			if(codeStr[idx] >= '0' && codeStr[idx] <= '9')
			{
				args[params.length-1] *= 10; // example: 56 -> 560
				args[params.length-1] += codeStr[idx] - '0'; // 560 -> 567
			}

			if(codeStr[idx] == ',')
				args.push(0); // go to next argument/parameter
		}

		return args;
	}

	function translateToObj(insChar, params)
	{
		var obj = {};

		if(params == undefined)
		{
			if(insChar == 'u' || insChar == 'd' || insChar == 'l' || insChar == 'r')
				obj.jumpSize = 10;
		}
		else
		{
			switch(insChar)
			{
				case 'c':
					obj.color = "rgb(" + params[0] + "," + params[1] + "," + params[2] + ")";
					break;
			}
		}
		return obj;
	}

	var output = []; // self explanatory
	for(var idx in codeStr)
	{
		if(codeStr[idx] == '{') {continue;}

		var arguments = undefined;
		if(idx+1 < codeStr.length && codeStr[idx+1]=='{')
			arguments = getArguments();

		output.push(
			new global.common.Instruction(global.config.codes[codeStr[idx]].id, translateToObj(codeStr[idx], arguments))
		);
	}

	return output;
}
