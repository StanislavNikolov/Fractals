global.simulator.turtles = [];

function simulate()
{
	for(var i in global.simulator.turtles)
	{
		global.simulator.turtles[i].move();
	}
	console.log(global.simulator.turtles.length);
}

var simulateIntercval = setInterval(simulate, 1000/5);
