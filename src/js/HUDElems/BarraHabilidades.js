export class BarraHabilidades extends Phaser.GameObjects.Container {
    /**
     * 
     * @param {Phaser.Scene} scene La escena en la que se va a pintar
     * @param {num} x la posicion en horizontal donde se colocará la barra
     * @param {num} y la posicion en vertical donde se colocará la barra
     * @param {num} width El tamaño en vertical de la barra
     * @param {num} height El tamaño en horizontal de la barra
     * @param {CombatManager} combatManager el manager de combate, para saber en todo momento los puntos de habilidad que tenemos
     * @param {num} cantAliados los aliados que hay en la escena, necesarios para saber como previsualizar la barra
     */
    constructor(scene, x, y, width, height, combatManager, cantAliados) {
        super(scene);
        this.x = x;
        this.y = y;
        this.combatManager = combatManager;
        this.cantAliados = cantAliados;
        this.base = [];
        this.red = [];
        this.green = [];
        for (let i = 0; i < 5; i++) {
            this.base.push(scene.add.rectangle(x + width * i, y, width, height, 0xaf53ed).setOrigin(0, 0));
            this.green.push(scene.add.rectangle(x + width * i, y, width, height, 0x04ea17).setOrigin(0, 0));
            this.red.push(scene.add.rectangle(x + width * i, y, width, height, 0xfc0a0e).setOrigin(0, 0));
        }
        this.actualizar();
    }

    /**
     * Actualiza la barra de habilidades con los datos actuales del game manager
     */
    actualizar() {
        let actual = this.combatManager.spPoints;
        console.log(actual);
        for (let i = 0; i < 5; i++) {
            this.green[i].visible = false;
            this.red[i].visible = false;
            if (i < actual)
                this.base[i].visible = true;
            else
                this.base[i].visible = false;

        }
    }

    /**
     * Previsualiza el estado de la barra si se ganan puntos
     */
    showIncrease() {
        if (this.combatManager.spPoints < 5 && this.combatManager.spPoints < this.cantAliados) {
            this.green[this.combatManager.spPoints].visible = true;
        }
        this.red[this.combatManager.spPoints - 1].visible = false;
    }

    /**
     * Previsualiza el estado de la barra si se pierden puntos
     */
    showDecrease() {
        if (this.combatManager.spPoints > 0) {
            this.red[this.combatManager.spPoints - 1].visible = true;
            this.green[this.combatManager.spPoints].visible = false;
        }
    }
}