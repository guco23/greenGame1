import {EscenaTilesets} from "./escenaTileset.js"
import { CombateEscena } from "./CombateEscena.js";
import { EscenaTilesets2 } from "./escenaTileset2.js";
import { EscenaTilesets3 } from "./escenaTileset3.js";
import { EscenaTilesets4 } from "./escenaTileset4.js";
//Configuración inicial del juego
var config = {
    type: Phaser.AUTO, //Usa WebGL si es posible. En caso contrario, usa canvas 
    width: 900, //Configurar aquí el tamaño de la ventana de juego
    height: 600,
    pixelArt: true, //Asegura que no se va a fastidiar el pixel art al escalarlo
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALY, //Phaser centra la ventana
        //mode: Phaser.Scale.FIT,
        //zoom: 1
    },
    physics: { 
        default: 'arcade',         
        arcade:{
            debug: true
        },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    },
    scene: [CombateEscena, EscenaTilesets, EscenaTilesets2,EscenaTilesets4,EscenaTilesets3], //Probando la escena de combate
    parent: 'espacio-juego' //El elemento de html sobre el que se colocará el "canvas" de Phaser
};

//Inicializa el juego
var game = new Phaser.Game(config);
