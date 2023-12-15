import { BarraVida } from "./BarraVida.js";
import { RAIZ_IMAGENES } from "../constants.js";

class PersonajeMenu {
    constructor(scene, character, x, y) {
        scene.add.image(x, y, character.name).setScale(4);
    }

}

export class SelectorPersonajesMenu extends Phaser.GameObjects.Container {
    /**
     * 
     * @param {scene} scene 
     * @param {Personaje[]} characters 
     * @param {num} x La posición horizontal donde comenzará la lista de personajes
     * @param {num} y La posición vertical donde comenzará la lista de personajes
     * @param {num} nFila La cantidad de personajes mostrados por fila
     * @param {num} padY El espacio en px entre elementos en vertical (filas)
     * @param {num} padX El espacio en px entre elementos en horizontal (columnas)
     */
    
    constructor(scene, characters, x, y, nFila, padY, padX) {
        super(scene);
        this.characters = characters;
        this.imgsChars = [];
        for(let i = 0; i < characters.length; i++) {
            this.imgsChars.push(new PersonajeMenu(this.scene, characters[i], x + padX * i, y));
        }
    }
}