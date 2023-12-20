export class BarraVida extends Phaser.GameObjects.Container {
    /**
     * Una barra de vida para colocar sobre un personaje en la escena y mostrar su vida
     * La ubicacion la saca de la imagen que le pasas
     * @param {Phaser.Scene} scene La escena donde se va a pintar
     * @param {Phaser.image} img La imagen del personaje que va a obtener la barra
     * @param {num} w El tamaño horizontal de la barra
     * @param {num} h La imagen del personaje que va a obtener la barra
    * @param {Personaje} h El personaje al que pertenece la barra
    */
    constructor(scene, img, w, h, personaje) {
        super(scene);
        this.personaje = personaje;
        let x = img.x - img.displayWidth / 2.7;
        let y = img.y - img.displayHeight / 2;

        this.prop = w / personaje.maxHp; //La proporcion resultante del tamaño y la vida máxima, utilizada para cambiar el tamaño de la barra
        this.rectBase = scene.add.rectangle(x, y, w, h, 0xffffff).setOrigin(0, 0);
        this.rectRed = scene.add.rectangle(x, y + 1, w - 2, h - 2, 0xf90c24).setOrigin(0, 0);
        this.rectHp = scene.add.rectangle(x, y + 1, w - 2, h - 2, 0x00ff00).setOrigin(0, 0);
    }

    actualizarHp() {
        if (this.personaje.living) {
            this.rectHp.setSize(this.prop * this.personaje.currentHp, this.rectHp.height);
        } else {
            this.rectBase.visible = false;
            this.rectHp.visible = false;
            this.rectRed.visible = false;
        }
    }
}