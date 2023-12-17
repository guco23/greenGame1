import { RAIZ_IMAGENES } from "../constants.js";

class AccionText extends Phaser.GameObjects.Container {
    /**
     * Clase de uso interno que contiene un elemento de la lista, su indicador y los metodos para cambiar su aspecto
     * @param {Escena en la que se va a pintar} scene 
     * @param {Posición horizontal en la que colocar el elemento} x
     * @param {Posición horizontal en la que colocar el elemento} y
     * @param {El objeto DatosAccion a utilizar} datos
     */
    constructor(scene, x, y, datos) {
        super(scene);
        this.textoDescriptivo = datos.descripcion;
        this.textElem = scene.add.text(x, y, datos.nombre);
        //Aún necesitamos un sprite de flechita para esto
        this.icon = scene.add.image(x - 16, y + 8, 'selectorAccion').setScale(2);
        this.icon.visible = false;
    }

    selected() {
        this.textElem.setTint(0xFFFF00);
        this.icon.visible = true;
    }

    unselect() {
        this.textElem.setTint(0xFFFFFF);
        this.icon.visible = false;
    }

    visible(t) {
        this.textElem.visible = t;
        if (!t)
            this.icon.visible = false;
    }

}

export class DatosAccion {
    constructor(nombre, descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}

/**Selector estándar para menús de selección basados en texto */
export class SelectorAcciones extends Phaser.GameObjects.Container {
    /**
     * 
     * @param {La escena donde se va a pintar} scene 
     * @param {El cuadro de texto donde se escribe la información de la acción} textoDescriptivo 
     * @param {Posición horizontal donde colocar el menu (esquina superior izquierda)} x 
     * @param {Posición vertical donde colocar el menu (esquina superior izquierda)} y 
     * @param {El espacio entre cada elemento de la lista} padding
     * @param {Array con objetos de tipo DatosAccion con los elementos de la lista} datosAcciones
     * @param {Si quieres que se oculte todo el texto (true) o solo el indicador (false)} hiddingOption
     */
    constructor(scene, textoDescriptivo, x, y, padding, datosAcciones, hiddingOption) {
        super(scene);
        this.hiddingOption = hiddingOption;
        this.selection = 0;
        this.textoDescriptivo = textoDescriptivo;
        this.opciones = [];
        for (let i = 0; i < datosAcciones.length; i++) {
            this.opciones.push(new AccionText(scene, x, y + i * padding, datosAcciones[i]));
        }
        this.select();
    }

    /**Marca la selección actual y actualiza el texto descriptivo */
    select() {
        this.opciones[this.selection].selected();
        this.textoDescriptivo.aplicarTexto(this.opciones[this.selection].textoDescriptivo);
    }

    /**
     * Cambia la selección de accion a la siguiente
     */
    siguiente() {
        //Condición para evitar que se salga del array
        if (this.selection < this.opciones.length - 1) {
            this.opciones[this.selection].unselect();
            this.selection = this.selection + 1;
            this.select();
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
            this.select();
        }
    }

    /**
     * Oculta el menu de las acciones
     */
    ocultar() {
        if (this.hiddingOption) {
            this.opciones.forEach(opcion => opcion.visible(false));
        } else {
            this.opciones.forEach(opcion => opcion.unselect());
        }
        this.textoDescriptivo.aplicarTexto("");

    }

    /**
     * Muestra el menu de las acciones
     */
    mostrar() {
        if (this.hiddingOption) {
            this.opciones.forEach(opcion => opcion.visible(true));
            this.textoDescriptivo.visible(true);
            this.select();
        } else {
            this.select();
        }
    }
}