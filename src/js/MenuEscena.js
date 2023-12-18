import { RAIZ_IMAGENES, CONTROLES, RAIZ_IMGS_OVERWORLD } from "./constants.js";
import { SelectorAcciones } from "./HUDElems/SelectorAcciones.js";
import { TextoDescriptivo } from "./HUDElems/TextoDescriptivo.js";
import { DatosAccion } from "./HUDElems/SelectorAcciones.js";
import { SelectorPersonajesMenu } from "./HUDElems/SelectorPersonajesMenu.js";

export class MenuEscena extends Phaser.Scene {

    constructor() {
        super('MenuEscena')
    }

    init(data) {
        this.gameData = data.obj;
        this.returnScene = data.scene;
    }

    preload() {
        this.load.image("selectorPersonaje", RAIZ_IMAGENES + "seleccionPersonaje.png");
        this.load.image("selectorAccion", RAIZ_IMAGENES + 'seleccionAccion.png');
        //Carga las imágenes de los aliados en la party y fuera de ella
        this.gameData.allies.forEach(ally => {
            this.load.image(ally.name, RAIZ_IMAGENES + RAIZ_IMGS_OVERWORLD + ally.idleImageLink);
        });
        this.gameData.party.forEach(ally => {
            this.load.image(ally.name, RAIZ_IMAGENES + RAIZ_IMGS_OVERWORLD + ally.idleImageLink);
        });
    }

    create() {
        this.graphics = this.add.graphics();
        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x0033cc, 1);
        var hudBox1 = this.graphics.fillRoundedRect(33, 50, 200, 200, { tl: 12, tr: 12, bl: 12, br: 12 });
        var hudBox2 = this.graphics.fillRoundedRect(237, 50, 600, 500, { tl: 12, tr: 12, bl: 12, br: 12 });

        this.descripcion = new TextoDescriptivo(this, 250, 460, "Selecciona una opción"); //Cuadro de descripción de la escena
        //Establece las opciones primarias de la escena
        let accionesBase = [
            new DatosAccion("Grupo", "Escoge los personajes para combatir"),
            new DatosAccion("Equipamiento", "Equipa objetos a tus personajes")
        ];
        this.opcionPrimaria = new SelectorAcciones(this, this.descripcion, 66, 70, 30, accionesBase, false);

        this.menuActual = this.opcionPrimaria;

        this.selectorParty = new SelectorPersonajesMenu(this, this.gameData.party, 450, 110, 4, 100, 100);

        this.selectorAllies = new SelectorPersonajesMenu(this, this.gameData.allies, 300, 300, 4, 100, 100);

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
            if (event.code === CONTROLES.UP || event.code === CONTROLES.LEFT) {
                this.menuActual.anterior();
            }
            else if (event.code === CONTROLES.DOWN || event.code === CONTROLES.RIGHT) {
                this.menuActual.siguiente();
            } else if (event.code === CONTROLES.ACCEPT) {
                this.Seleccion();
            } else if (event.code === CONTROLES.CANCEL) {
                this.Cancel();
            }
        });
    }

    //Para cerrar el menu y volver a la escena anterior
    CerrarMenu() {
        this.returnScene.scene.setActive(true);
        this.scene.sleep();
    }

    Seleccion() {
        switch (this.menuActual) {
            case this.opcionPrimaria:
                if (this.opcionPrimaria.selection === 0) {
                    this.opcionPrimaria.ocultar();
                    this.menuActual = this.selectorParty;
                    this.selectorParty.mostrar();
                    this.descripcion.aplicarTexto("X para inspeccionar otros aliados.")
                }
                break;
        }
    }

    Cancel() {
        switch (this.menuActual) {
            case this.opcionPrimaria:
                this.CerrarMenu();
                break;
            case this.selectorParty:
                this.selectorParty.ocultar();
                this.menuActual = this.selectorAllies;
                this.selectorAllies.mostrar();
                break;
            case this.selectorAllies:
                this.selectorAllies.ocultar();
                this.menuActual = this.opcionPrimaria;
                this.opcionPrimaria.mostrar();
                break;
        }
    }
}