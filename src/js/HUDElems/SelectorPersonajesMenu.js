import { TextoDescriptivo } from "./TextoDescriptivo.js";

class PersonajeMenu {
    constructor(scene, personaje, x, y, descripcion, imgScale) {
        this.personaje = personaje;
        this.image = scene.add.image(x, y, this.personaje.name).setScale(imgScale);
        this.selectIcon = scene.add.image(x - 48, y, 'selectorPersonaje').setScale(imgScale);
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

    /**
     * Muestra los datos del personaje en el cuadro de descripción
     */
    describir() {
        let itemName;
        
        if(this.personaje.item === -1) {
            itemName = "SIN EQUIPAR"
        } else {
            itemName = this.personaje.item.name;
        }
        this.descripcion.aplicarTexto(this.personaje.name + "\n" + this.personaje.MBTI + "\n" + this.personaje.descripcion + 
        "\n" + itemName);
    }

    ocultar() {
        this.selectIcon.visible = false;
        this.image.visible = false;
    }

    mostrar() {
        this.image.visible = true;
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
     * @param {num} imgScale La escala de las imágenes de los personajes
     * @param {TextoDescriptivo} descripcion El objeto de texto descriptivo donde mostrar la información del personaje
     */

    constructor(scene, personajes, x, y, nFila, padY, padX, imgScale, descripcion) {
        super(scene);
        this.personajes = personajes;
        this.descripcion = descripcion;
        this.x = x;
        this.y = y;
        this.padY = padY;
        this.padX = padX;
        this.selection = 0;
        this.nFila = nFila;
        this.imgScale = imgScale;

        //La construcción del elemento visual se produce en el refresh
        this.refresh();
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

    hide() {
        this.opciones.forEach(element => {
            element.ocultar();
        });
    }

    show() {
        this.opciones.forEach(element => {
            element.mostrar();
        });
    }

    refresh() {
        //Elimina las imagenes anteriores
        if (this.opciones !== undefined) {
            this.opciones.forEach(element => {
                element.image.destroy();
                element.selectIcon.destroy();
            });
        }
        this.opciones = [];
        let fila = 0;
        let col = 0;
        this.opciones.push(new PersonajeMenu(this.scene, this.personajes[0], this.x + col, this.y + this.padY * fila, this.descripcion, this.imgScale));
        for (let i = 1; i < this.personajes.length; i++) {
            if (i % this.nFila == 0) {
                fila++;
                col = 0;
            } else {
                col += this.padX;
            }
            this.opciones.push(new PersonajeMenu(this.scene, this.personajes[i], this.x + col, this.y + this.padY * fila, this.descripcion, this.imgScale));
        }
    }
}