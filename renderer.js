function render()
{
	var context = global.renderer.context;
	context.clearRect(0, 0, global.renderer.canvas.width, global.renderer.canvas.height);

	context.globalAlpha = 1;
	context.fullStyle = "red";

	for(var turt in global.simulator.turtles)
	{
		var currPath = global.simulator.turtles[turt].path;
		
		for(var idx in currPath)
		{
			if(idx > 0)
			{
				context.beginPath();

				context.strokeStyle = currPath[idx].color;
				context.moveTo(currPath[idx-1].pos.x, currPath[idx-1].pos.y);
				context.lineTo(currPath[idx].pos.x, currPath[idx].pos.y);

				context.stroke();
				context.closePath();
			}
		}
		
		var turtPos = global.simulator.turtles[turt].position;
		context.fillRect(turtPos.x, turtPos.y, 3, 3);
	}
}

var renderInterval = setInterval(render, 1000/5);
