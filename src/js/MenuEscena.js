import { RAIZ_IMAGENES, CONTROLES, RAIZ_IMGS_OVERWORLD } from "./constants.js";
import { SelectorAcciones } from "./HUDElems/SelectorAcciones.js";
import { TextoDescriptivo } from "./HUDElems/TextoDescriptivo.js";
import { DatosAccion } from "./HUDElems/SelectorAcciones.js";
import { SelectorPersonajesMenu } from "./HUDElems/SelectorPersonajesMenu.js";
import { StatsDrawer } from "./HUDElems/StatsDrawer.js";

const Estados = {
    ESTANDAR: "seleccion_estandar", //El usuario está seleccionando que hacer en el menu
    CAMBIO_PERSONAJE: "seleccion_cambio", //El usuario ha seleccionado un personaje de la party y quiere cambiarlo por otro
}

export class MenuEscena extends Phaser.Scene {

    constructor() {
        super('MenuEscena')
    }

    init(data) {
        this.gameData = data.obj;
        this.returnScene = data.scene;
    }

    preload() {
        this.load.image('ui', RAIZ_IMAGENES + "UI_menuItems.png");
        this.load.image("selectorPersonaje", RAIZ_IMAGENES + "seleccionPersonaje.png");
        this.load.image("selectorAccion", RAIZ_IMAGENES + 'seleccionAccion.png');
        //Carga las imágenes de los aliados en la party y fuera de ella
        this.gameData.allies.forEach(ally => {
            this.load.image(ally.name, RAIZ_IMAGENES + RAIZ_IMGS_OVERWORLD + ally.idleImageLink);
            this.load.image(ally.name + "ic", RAIZ_IMAGENES + RAIZ_IMGS_OVERWORLD + ally.imgIconLink);
        });
        this.gameData.party.forEach(ally => {
            this.load.image(ally.name, RAIZ_IMAGENES + RAIZ_IMGS_OVERWORLD + ally.idleImageLink);
        });
    }

    create() {
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'ui').setScale(4, 4);

        this.descripcion = new TextoDescriptivo(this, 290, 460, "Selecciona una opción"); //Cuadro de descripción de la escena
        //Establece las opciones primarias de la escena
        let accionesBase = [
            new DatosAccion("Grupo", "Escoge los personajes para combatir"),
            new DatosAccion("Equipamiento", "Equipa objetos a tus personajes"),
        ];
        let listaAccionObjetos = [];
        this.gameData.items.forEach(item => {
            listaAccionObjetos.push(new DatosAccion(item.nombre, item.descripcion));
        });
        this.opcionPrimaria = new SelectorAcciones(this, this.descripcion, 72, 60, 30, accionesBase);
        this.menuActual = this.opcionPrimaria;
        this.selectorParty = new SelectorPersonajesMenu(this, this.gameData.party, 357, 110, 4, 100, 130, 4.3, this.descripcion, false);
        this.selectorAllies = new SelectorPersonajesMenu(this, this.gameData.allies, 317, 325, 8, 68, 68, 4.1, this.descripcion, true);
        this.equipadorPersonajes = new SelectorPersonajesMenu(this, this.gameData.party, 670, 130, 2, 120, 100, 4.3, this.descripcion);
        this.selectorObjetos = new SelectorAcciones(this, this.descripcion, 280, 70, 30, listaAccionObjetos);
        this.statsDrawer = new StatsDrawer(this, this.selectorParty, 20, 130, 317, 160);
        this.selectorObjetos.ocultar();
        this.equipadorPersonajes.hide();
        this.opcionPrimaria.activar();
        this.statsDrawer.update();
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
                this.SiguienteAnterior('anterior');
            }
            else if (event.code === CONTROLES.DOWN || event.code === CONTROLES.RIGHT) {
                this.SiguienteAnterior('siguiente');
            } else if (event.code === CONTROLES.ACCEPT) {
                this.Seleccion();
            } else if (event.code === CONTROLES.CANCEL) {
                this.Cancel();
            } else if (event.code === CONTROLES.MENU) {
                this.CerrarMenu();
            }
        });
        this.estado = Estados.ESTANDAR;
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
                    this.opcionPrimaria.desactivar();
                    this.menuActual = this.selectorParty;
                    this.selectorParty.mostrar();
                }
                else if (this.opcionPrimaria.selection === 1) {
                    this.opcionPrimaria.desactivar();
                    this.menuActual = this.selectorObjetos;
                    this.selectorObjetos.activar();
                }
                break;
            case this.selectorObjetos:
                this.selectorObjetos.desactivar();
                this.menuActual = this.equipadorPersonajes;
                this.equipadorPersonajes.mostrar();
                break;
            case this.equipadorPersonajes:
                this.equipadorPersonajes.ocultar();
                this.menuActual = this.selectorObjetos;
                this.selectorObjetos.activar();
                //Equipar el objero y actualizar la interfaz
                this.gameData.party[this.equipadorPersonajes.selection].equipItem(
                    this.gameData.items[this.selectorObjetos.selection]
                )
                break;
            case this.selectorParty:
                //Establece el estado cambio personaje para cambiar el funcionamiento consiguiente
                if (this.estado === Estados.ESTANDAR) {
                    this.estado = Estados.CAMBIO_PERSONAJE;
                    this.selectorParty.ocultar();
                    this.menuActual = this.selectorAllies;
                    this.selectorAllies.mostrar();
                    this.Describir(2);
                } else if (this.estado === Estados.CAMBIO_PERSONAJE) {
                    this.gameData.SwapCharacter(this.selectorParty.selection, this.selectorAllies.selection);
                    this.RefreshCharacterSelectors();
                    this.estado = Estados.ESTANDAR;
                    this.selectorParty.ocultar();
                    this.menuActual = this.selectorAllies;
                    this.selectorAllies.mostrar();
                    this.statsDrawer.update();
                }
                break;
            case this.selectorAllies:
                //Establece el estado cambio personaje para cambiar el funcionamiento consiguiente
                if (this.estado === Estados.ESTANDAR) {
                    this.estado = Estados.CAMBIO_PERSONAJE;
                    this.selectorAllies.ocultar();
                    this.menuActual = this.selectorParty;
                    this.selectorParty.mostrar();
                    this.Describir(2);
                } else if (this.estado === Estados.CAMBIO_PERSONAJE) {
                    this.gameData.SwapCharacter(this.selectorParty.selection, this.selectorAllies.selection);
                    this.RefreshCharacterSelectors();
                    this.estado = Estados.ESTANDAR;
                    this.selectorAllies.ocultar();
                    this.menuActual = this.selectorParty;
                    this.selectorParty.mostrar();
                    this.statsDrawer.update();
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
                if (this.estado === Estados.ESTANDAR) {
                    this.selectorParty.ocultar();
                    this.menuActual = this.selectorAllies;
                    this.selectorAllies.mostrar();
                } else if (this.estado === Estados.CAMBIO_PERSONAJE) {
                    this.selectorParty.ocultar();
                    this.menuActual = this.selectorAllies;
                    this.selectorAllies.mostrar();
                    this.estado = Estados.ESTANDAR;
                }
                break;
            case this.selectorAllies:
                if (this.estado === Estados.ESTANDAR) {
                    this.selectorAllies.ocultar();
                    this.menuActual = this.opcionPrimaria;
                    this.opcionPrimaria.activar();
                } else if (this.estado === Estados.CAMBIO_PERSONAJE) {
                    this.selectorAllies.ocultar();
                    this.menuActual = this.selectorParty;
                    this.selectorParty.mostrar();
                    this.estado = Estados.ESTANDAR;
                }
                break;
            case this.selectorObjetos:
                this.selectorObjetos.desactivar();
                this.menuActual = this.opcionPrimaria;
                this.opcionPrimaria.activar();
                break;
            case this.equipadorPersonajes:
                this.equipadorPersonajes.ocultar();
                this.menuActual = this.selectorObjetos;
                this.selectorObjetos.activar();
                break;
        }
    }

    SiguienteAnterior(opcion) {
        if (opcion === 'anterior') {
            this.menuActual.anterior();
        } else {
            this.menuActual.siguiente();
        }
        switch (this.menuActual) {
            case this.opcionPrimaria:
                if (this.opcionPrimaria.selection === 1) {
                    //Seleccion de objetos
                    this.selectorParty.hide();
                    this.selectorAllies.hide();
                    this.selectorObjetos.mostrar();
                    this.equipadorPersonajes.refresh();
                    this.statsDrawer.ocultar();
                } else if (this.opcionPrimaria.selection === 0) {
                    //Selección de personajes
                    this.selectorParty.show();
                    this.selectorAllies.show();
                    this.selectorObjetos.ocultar();
                    this.equipadorPersonajes.hide();
                    this.statsDrawer.update();
                    this.statsDrawer.mostrar();
                }
                break;
        }
    }

    Describir(d) {
        switch (d) {
            case 1:
                this.descripcion.aplicarTexto("X para inspeccionar otros aliados.\nZ para cambiar el personaje.");
                break;
            case 2:
                this.descripcion.aplicarTexto("Selecciona el personaje por el que lo quieres sustituir");
                break;
        }
    }

    RefreshCharacterSelectors() {
        this.selectorAllies.refresh();
        this.selectorParty.refresh();
    }
}