global.simulation.turtles = [];

global.simulation.Trace = function(pos, color)
{
	var self = this;

	self.pos = pos;
	self.color = color;
}

global.simulation.Instruction = function Instruction(insId, params)
{
	var self = this;

	self.insId = insId;
	self.params = params;
}

global.simulation.Turtle = function Turtle(pos, code)
{
	var self = this;
	self.position = pos;
	self.code = code;
	self.nextIns = 0;
	self.path = [];
	self.trColor = "blue";

	self.move = function()
	{
		var curr = code[nextIns];
		var newPos = self.position;
		switch(curr.insId)
		{
			case 0: // up
				newPos.add({y:curr.params.jumpSize});
				break;

			case 1: // down
				newPos.add({y:curr.params.jumpSize});
				break;

			case 2: // left
				newPos.add({x:curr.params.jumpSize});
				break;

			case 3: // right
				newPos.add({x:curr.params.jumpSize});
				break;

			case 4: // split
				if(global.simulation.turtles.length > global.config.maxTurtles)
					global.simulation.turtles.push(new global.simulation.Turtle(newPos , self.code));
				break;

			case 5: // set trace color
				self.trColor = curr.params.color;
				break;

		}

		self.path.push(new global.simulation.Trace(newPos, self.trColor));
		self.position = newPos;

		nextIns ++;
		if(nextIns >= code.length)
			nextIns = 0;
	}
}


function autoSimulate()
{
	for(var i in global.simulation.turtles)
	{
		global.simulation.turtles[i].move();
	}
}
