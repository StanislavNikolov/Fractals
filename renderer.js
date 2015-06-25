function render()
{
	for(var turt in global.simulator.turtles)
	{
		var currPath = global.simulator.turtles[turt].path;
		
		var context = global.renderer.context;
		for(var idx in currPath)
		{
			if(idx > 0)
			{
				context.beginPath();

				context.strokeStyle = currPath[idx-1].color;
				context.moveTo(currPath[idx-1].pos.x, currPath[idx-1].pos.y);
				context.lineTo(currPath[idx].pos.x, currPath[idx].pos.y);

				context.stroke();
				context.closePath();
			}
		}
	}
}

var renderInterval = setInterval(render, 1000/10);
console.log("Asd");
