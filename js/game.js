import { Escena1 } from "./escena1.js";

var config = {
    type: Phaser.AUTO,
    width: 900, //Configurar aquí el tamaño de la ventana de juego
    height: 600,
    pixelArt: true,
    scene: Escena1,
    parent: 'espacio-juego'
};

var game = new Phaser.Game(config);
