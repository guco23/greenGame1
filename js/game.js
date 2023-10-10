//Elemento visual provisional
var canvas = document.querySelector('canvas').getContext('2d');

canvas.fillStyle = "green";
canvas.fillRect(10,12,120,100);

canvas.fillStyle = "red";
canvas.fillRect(30,32,120,100);

canvas.fillStyle = "blue";
canvas.fillRect(54,17,120,100);

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);