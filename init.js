function init()
{
	var vec = new global.common.Vector(200, 200); // Initial position
	var ins = global.inputHandler.parse(prompt("Enter initial instruction set", "rrrrsd")); // Initial instructions

	global.simulator.turtles.push( new global.common.Turtle(vec, ins, "blue") );
}

init();
