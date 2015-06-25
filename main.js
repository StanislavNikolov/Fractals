var global = {};
global.renderer = {};
global.simulator = {};
global.common = {};
global.config = {maxTurtles:100};
global.inputHandler = {};

global.renderer.canvas = document.getElementById("mainCanvas");
global.renderer.context = global.renderer.canvas.getContext("2d");

function updateCanvasSize()
{ 
	global.renderer.canvas.width = window.innerWidth;
	global.renderer.canvas.height = window.innerHeight;
}

window.onresize = updateCanvasSize;
updateCanvasSize();
