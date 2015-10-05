global.inputHandler.parse = function (codeStr)
{
	function getArguments(startPos)
	{
		var args = [];
		var currentNumber = 0, multiplier = 1;

		for(var idx = startPos+2;codeStr[idx] != '}';++ idx)
		{
			if(codeStr[idx] >= '0' && codeStr[idx] <= '9')
			{
				currentNumber *= 10; // example: 56 -> 560
				currentNumber += codeStr[idx] - '0'; // 560 -> 567
			}
			if(codeStr[idx] == '-')
			{
				if(currentNumber == 0)
					multiplier = -1;
				else
					throw "Invalid use of \'-\'";
			}
			if(codeStr[idx] == '?')
			{
				args.push(
					function(){return Math.floor(Math.random()*
					(currentNumber==0?global.config.codes[codeStr[startPos]].randomMax:currentNumber));
				});
			}

			if((codeStr[idx] == ',' || codeStr[idx+1] == '}') && codeStr[idx-1] != '?')
			{
				// go to next argument
				args.push(function(){return currentNumber * multiplier;});
				currentNumber = 0;
				multiplier = 1;
			}
		}

		return args;
	}

	function translateToObj(insChar, params)
	{
		var obj = {};

		if(params === null)
		{
			if(insChar == 'u' || insChar == 'd' || insChar == 'l' || insChar == 'r')
				obj.jumpSize = function(){return 10;};

			if(insChar == 'c')
			{
				obj.red = function(){return Math.floor(Math.random() * 255)};
				obj.green = function(){return Math.floor(Math.random() * 255)};
				obj.blue = function(){return Math.floor(Math.random() * 255)};
			}
		}
		else
		{
			if(insChar == 'c')
			{
				obj.red = params[0];
				obj.green = params[1];
				obj.blue = params[2];
			}
			if(insChar == 'u' || insChar == 'd' || insChar == 'l' || insChar == 'r')
			{
				obj.jumpSize = params[0];
			}
		}
		return obj;
	}

	var output = [];
	var bracketBalance = 0;
	for(var idx = 0;idx < codeStr.length;++ idx)
	{
		if(codeStr[idx] == '{') {bracketBalance ++; continue;}
		if(codeStr[idx] == '}') {bracketBalance --; continue;}
		if(bracketBalance != 0) {continue;}

		var instructionArgs = null;
		if(idx+1 < codeStr.length && codeStr[idx+1]=='{')
			instructionArgs = getArguments(idx);

		output.push(
			new global.common.Instruction(global.config.codes[codeStr[idx]].id,
			translateToObj(codeStr[idx], instructionArgs))
		);

	}

	return output;
}
