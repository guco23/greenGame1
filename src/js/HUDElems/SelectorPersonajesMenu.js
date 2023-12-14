import { Selector } from "./SelectorPersonajes";
import { BarraVida } from "./BarraVida";

export class SelectorPersonajesMenu extends Phaser.GameObjects.Container {
    /**
     * 
     * @param {scene} scene 
     * @param {Personaje[]} party 
     * @param {Personaje[]} allies 
     * @param {num} x La posición horizontal donde comenzará la lista de personajes
     * @param {num} y La posición vertical donde comenzará la lista de personajes
     * @param {num} nFila La cantidad de personajes mostrados por fila
     * @param {num} padY El espacio en px entre elementos en vertical (filas)
     * @param {num} padX El espacio en px entre elementos en horizontal (columnas)
     */
    
    constructor(scene, party, allies, x, y, nFila, padY, padX) {
        super(scene);
        this.party = party;
        this.allies = allies;


    }
}