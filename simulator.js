global.simulator.turtles = [];

global.simulator.Trace = function(pos, color)
{
	var self = this;

	self.pos = pos;
	self.color = color;
}

global.simulator.Instruction = function Instruction(insId, params)
{
	var self = this;

	self.insId = insId;
	self.params = params;
}

global.simulator.Turtle = function Turtle(pos, code)
{
	var self = this;
	self.position = pos;
	self.code = code;
	self.nextIns = 0;
	self.path = [];
	self.trColor = "blue";

	self.move = function()
	{
		var curr = code[self.nextIns];
		var newPos = new global.common.Vector(0, 0);
		newPos.add(self.position);
		switch(curr.insId)
		{
			case 0: // up
				newPos.add({x: 0, y:curr.params.jumpSize});
				break;

			case 1: // down
				newPos.add({x:0, y:curr.params.jumpSize});
				break;

			case 2: // left
				newPos.add({x:curr.params.jumpSize, y: 0});
				break;

			case 3: // right
				newPos.add({x:curr.params.jumpSize, y: 0});
				break;

			case 4: // split
				if(global.simulator.turtles.length > global.config.maxTurtles)
					global.simulator.turtles.push(new global.simulator.Turtle(newPos , self.code));
				break;

			case 5: // set trace color
				self.trColor = curr.params.color;
				break;

		}

		self.path.push(new global.simulator.Trace(newPos, self.trColor));
		self.position = newPos;

		self.nextIns ++;
		if(self.nextIns >= code.length)
			self.nextIns = 0;
	}
}


function autoSimulate()
{
	for(var i in global.simulator.turtles)
	{
		global.simulator.turtles[i].move();
	}
}
