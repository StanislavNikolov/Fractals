global.common.Vector = function(x, y)
{
	var self = this;
	self.x = x;
	self.y = y;
}

global.common.Vector.prototype.add = function(v)
{
	this.x += v.x;
	this.y += v.y;
}

global.common.Trace = function(pos, color)
{
	var self = this;

	self.pos = pos;
	self.color = color;
}

global.common.Instruction = function Instruction(insId, params)
{
	var self = this;

	self.insId = insId;
	self.params = params;
}

global.common.Turtle = function Turtle(pos, code, trColor)
{
	var self = this;
	self.position = pos;
	self.code = code;
	self.nextIns = 0;
	self.path = [];
	self.trColor = trColor;
}

global.common.Turtle.prototype.move = function()
{
	var curr = this.code[this.nextIns ++];
	var newPos = new global.common.Vector(0, 0);
	newPos.add(this.position);
	switch(curr.insId)
	{
		case global.config.codes['u'].id: // up
			newPos.add({x: 0, y:-curr.params.jumpSize});
			break;

		case global.config.codes['d'].id: // down
			newPos.add({x:0, y:curr.params.jumpSize});
			break;

		case global.config.codes['l'].id: // left
			newPos.add({x:-curr.params.jumpSize, y: 0});
			break;

		case global.config.codes['r'].id: // right
			newPos.add({x:curr.params.jumpSize, y: 0});
			break;

		case global.config.codes['s'].id: // split
			if(global.simulator.turtles.length <= global.config.maxTurtles)
				global.simulator.turtles.push(new global.common.Turtle(newPos , this.code, this.trColor));
			break;

		case global.config.codes['c'].id: // set trace color
			this.trColor = curr.params.color;
			break;

	}

	this.path.push(new global.common.Trace(newPos, this.trColor));
	this.position = newPos;

	if(this.nextIns >= this.code.length)
		this.nextIns = 0;
}
