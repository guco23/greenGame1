class AccionText extends Phaser.GameObjects.Container {
    constructor(scene, x, y, text, textoDescriptivo) {
        super(scene);
        this.textoDescriptivo = textoDescriptivo;
        this.textElem = scene.add.text(x, y, text);
    }

    selected() {
        this.textElem.setTint(0xFFFF00);
    }

    unselect() {
        this.textElem.setTint(0xFFFFFF);
    }

}

export class SelectorAcciones extends Phaser.GameObjects.Container {

    constructor(scene, x, y, textoDescriptivo) {
        super(scene);
        this.selection = 0;
        this.textoDescriptivo = textoDescriptivo;
        this.opciones = [];
        this.opciones.push(new AccionText(scene, x, y, "Atacar", "Inflige daño a un enemigo"));
        this.opciones.push(new AccionText(scene, x, y + 40, "Habilidad", "TODO: depende de cada aliado"));
        this.opciones.push(new AccionText(scene, x, y + 80, "Defender", "Reduce el daño recibido hasta el siguiente turno"));
        this.select();
    }

    select() {
        this.opciones[this.selection].selected();
        //Muestra la descripción de la acción
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
     * Oculta la UI de las acciones
     */
    ocultar() {
        this.visible = false;
    }

    /**
     * Muestra la UI de las acciones
     */
    mostrar() {
        this.visible = true;
    }
}