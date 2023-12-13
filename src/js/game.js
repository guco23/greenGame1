import {EscenaTilesets} from "./Escenas/Mercadona/escenaTileset.js"
import { CombateEscena } from "./CombateEscena.js";
import { EscenaTilesets2 } from  "./Escenas/Mercadona/escenaTileset2.js";
import { EscenaTilesets3 } from "./Escenas/Mercadona/escenaTileset3.js";
import { EscenaTilesets4 } from "./Escenas/Mercadona/escenaTileset4.js";
import { EscenaMercadona } from "./Escenas/Mercadona/escenaMercadona.js";
import {EscenaCajaFuerte } from "./Escenas/Mercadona/escenaCajaFuerte.js";
import {EscenaPlaya} from "./Escenas/Playa/escenaPlayaExterior.js";
import {EscenaPlayaBosque} from "./Escenas/Playa/escenaPlayaBosque.js";
import {EscenaPlayaFerreteria} from "./Escenas/Playa/escenaPlayaFerreteria.js";
import {EscenaPlayaSalaSecreta} from "./Escenas/Playa/escenaPlayaCuartoSecreto.js"
import {EscenaNuevosMinisterios} from "./Escenas/NuevosMinisterios/escenaNuevosMinisterios.js"
import {MenuEscena} from "./MenuEscena.js"

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
    scene: [EscenaTilesets, EscenaTilesets2,EscenaTilesets4,EscenaTilesets3, EscenaMercadona, EscenaCajaFuerte,EscenaPlaya,EscenaPlayaBosque,
        EscenaPlayaFerreteria,EscenaPlayaSalaSecreta,EscenaNuevosMinisterios,CombateEscena, MenuEscena], //Array con todas las escenas
    parent: 'espacio-juego' //El elemento de html sobre el que se colocará el "canvas" de Phaser
};

//Inicializa el juego
var game = new Phaser.Game(config);
