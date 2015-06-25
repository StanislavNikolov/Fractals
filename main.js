var global = {};
global.renderer = {};
global.simulation = {};

global.renderer.canvas = document.getElementById("mainCanvas");
global.renderer.context = global.renderer.canvas.getContext("2d");

window.onresize = function resizeCanvas()
{ 
	console.log("Resizing canvas");	
};
