export class BarraVida extends Phaser.GameObjects.Container {
    constructor(scene, x, y, maxHp) {
        super(scene);
        this.graphics = scene.graphics;
        this.graphics.fillStyle(0xffffff, 1);
        this.rectBase = this.graphics.fillRect(x, y, 50, 10)
        this.graphics.fillStyle(0x00ff00, 1);
        this.rectHp = this.graphics.fillRect(x + 1, y + 1, 48, 8)
    }
}