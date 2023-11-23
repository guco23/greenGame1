export class BarraVida extends Phaser.GameObjects.Container {
    constructor(scene, x, y, w, h, maxHp) {
        super(scene);
        this.prop = w / maxHp; //La proporcion resultante del tamaño y la vida máxima, utilizada para cambiar el tamaño de la barra
        this.rectBase = scene.add.rectangle(x, y, w, h, 0xffffff).setOrigin(0,0);
        this.rectRed = scene.add.rectangle(x + 1, y + 1, w - 2, h - 2, 0xf90c24).setOrigin(0,0);
        this.rectHp = scene.add.rectangle(x + 1, y + 1, w - 2, h - 2, 0x00ff00).setOrigin(0,0);
    }

    actualizarHp(hp) {
        this.rectHp.setSize(this.prop * hp, this.rectHp.height);
    }
}