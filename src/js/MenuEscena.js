import { RAIZ_IMAGENES, CONTROLES } from "./constants.js";
import { SelectorAcciones } from "./HUDElems/SelectorAcciones.js";
import { TextoDescriptivo } from "./HUDElems/TextoDescriptivo.js";
import { DatosAccion  } from "./HUDElems/SelectorAcciones.js";

export class MenuEscena extends Phaser.Scene {

    constructor() {
        super('MenuEscena')
    }

    init(data) {
        this.myGameData = data.obj;
        this.returnScene = data.scene;
    }

    //Para cerrar el menu y volver a la escena anterior
    CerrarMenu() {
        this.returnScene.scene.setActive(true);
        this.scene.sleep();
    }

    preload() {
        this.load.image("selectorAccion", RAIZ_IMAGENES + 'seleccionAccion.png');
    }

    create() {
        this.graphics = this.add.graphics();
        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x0033cc, 1);
        var hudBox1 = this.graphics.fillRoundedRect(2, 50, 270, 200, { tl: 12, tr: 12, bl: 12, br: 12 });
        var hudBox2 = this.graphics.fillRoundedRect(275, 50, 600, 400, { tl: 12, tr: 12, bl: 12, br: 12 });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown',(event) => {
            if (event.code === CONTROLES.CANCEL) {
                this.CerrarMenu();
            }
        });

        this.descripcion = new TextoDescriptivo(this, 300, 360, "Selecciona una opción"); //Cuadro de descripción de la escena
        //Establece las opciones primarias de la escena
        let datosAcciones = [
            new DatosAccion("Grupo", "Escoge los personajes para combatir"),
            new DatosAccion("Equipamiento", "Equipa objetos a tus personajes")
        ];
        this.opcionPrimaria = new SelectorAcciones(this, this.descripcion, 40, 70, 30, datosAcciones);

        this.menuActual = this.opcionPrimaria;

        /**
         * Lo primero es un selector arriba, probablemente en horizontal en el que puedas escoger modificar el equipo o equipar objetos
         * A la derecha se mostrará el equipo actual (sprites), su vida actual y el nombre del objeto que tienen equipado
         * Debajo del todo en el rectángulo de la derecha se mostrará el cuadro de descripción
         * 
         * Si seleccionas "seleccion de grupo" se despliega un menú con todos los sprites y al pasar por encima de ellos, se muestra su información
         * Si seleccionas equipamiento se despliega un menú con todos los objetos y según pasas pore ellos 
         */
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown', (event) => {
            if (event.code === CONTROLES.UP) {
                this.menuActual.anterior();
            }
            else if (event.code === CONTROLES.DOWN) {
                this.menuActual.siguiente();
            }
         });
    }
}