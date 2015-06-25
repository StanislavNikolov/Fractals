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
