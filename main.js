var global = {};
global.renderer = {};
global.simulator = {};
global.common = {};
global.config = {maxTurtles:200};
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

global.config.codes = {};
global.config.codes['u'] = {id:0, name:"Go_Up", randomMax:10};
global.config.codes['d'] = {id:1, name:"Go_Down", randomMax:10};
global.config.codes['l'] = {id:2, name:"Go_Left", randomMax:10};
global.config.codes['r'] = {id:3, name:"Go_Right", randomMax:10};
global.config.codes['s'] = {id:4, name:"Split", randomMax:0};
global.config.codes['c'] = {id:5, name:"Change_Trace_Color", randomMax:255};
