import { TextoDescriptivo } from "./TextoDescriptivo.js";

class PersonajeMenu {
    constructor(scene, personaje, x, y, descripcion) {
        scene.add.image(x, y, personaje.name).setScale(4);
        this.selectIcon = scene.add.image(x - 48, y, 'selectorPersonaje').setScale(2.8);
        this.unselect();
        this.descripcion = descripcion;
    }

    //Cambia la visibilidad de la flechita indicadora a que no se vea
    select() {
        this.describir();
        this.selectIcon.visible = true;
    }

    //Cambia la visibilidad de la flechita indicadora  a que si se vea
    unselect() {
        this.selectIcon.visible = false;
    }

    describir() {
        //TODO
    }
}

export class SelectorPersonajesMenu extends Phaser.GameObjects.Container {
    /**
     * 
     * @param {scene} scene La escena donde se construira el elemento
     * @param {Personaje[]} personajes Los personajes a añadir
     * @param {num} x La posición horizontal donde comenzará la lista de personajes
     * @param {num} y La posición vertical donde comenzará la lista de personajes
     * @param {num} nFila La cantidad de personajes mostrados por fila
     * @param {num} padY El espacio en px entre elementos en vertical (filas)
     * @param {num} padX El espacio en px entre elementos en horizontal (columnas)
     * @param {TextoDescriptivo} descripcion El objeto de texto descriptivo donde mostrar la información del personaje
     */

    constructor(scene, personajes, x, y, nFila, padY, padX, descripcion) {
        super(scene);
        this.personajes = personajes;
        this.opciones = [];
        this.selection = 0;
        let fila = 0;
        let col = 0;
        for (let i = 0; i < personajes.length; i++) {
            this.opciones.push(new PersonajeMenu(this.scene, personajes[i], x + col, y + padY * fila, descripcion));
            if(i != 0 && i % nFila == 0) {
                fila++;
                col = 0;
            } else {
                col += padX;
            }
        }
    }

    mostrar() {
        this.opciones[this.selection].select();
    }

    ocultar() {
        this.opciones.forEach(element => {
            element.unselect();
        });
    }

    /**
    * Cambia la selección de accion a la siguiente
    */
    siguiente() {
        //Condición para evitar que se salga del array
        if (this.selection < this.opciones.length - 1) {
            this.opciones[this.selection].unselect();
            this.selection = this.selection + 1;
            this.opciones[this.selection].select();
        }
    }

    /**
     * Cambia la selección de accion a la anterior
     */
    anterior() {
        //Condición para evitar que se salga del array
        if (this.selection > 0) {
            this.opciones[this.selection].unselect();
            this.selection = this.selection - 1;
            this.opciones[this.selection].select();
        }
    }
}