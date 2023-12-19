const statusIconSize = {
    x: 20,
    y: 20
}

class ScenePersonaje extends Phaser.GameObjects.Container {
    constructor(scene, x, y, img, scale) {
        super(scene);
        this.img = scene.add.image(x, y, img + "C").setScale(scale);
        //Esto será un sprite cuando esté hecho
        this.stun = scene.add.rectangle(x + this.img.displayWidth - statusIconSize.x, y + this.img.displayHeight - statusIconSize.y, statusIconSize.x, statusIconSize.y, 0xFFFF00).setOrigin(0, 0);
        this.poison = scene.add.rectangle(x + this.img.displayWidth - statusIconSize.x * 2, y + this.img.displayHeight - statusIconSize.y, statusIconSize.x, statusIconSize.y, 0x9402fc).setOrigin(0, 0);
        this.stun.visible = false;
        this.poison.visible = false;
    }

    ocultar() {
        this.img.visible = false;
        this.stun.visible = false;
        this.poison.visible = false;
    }

    mostrar() {
        this.img.visible = true;
    }

    setPoisoned(b) {
        this.poison.visible = b;
    }

    setStunned(b) {
        this.stun.visible = b;
    }
}

/**
 * Muestra los sprites de enemigos o aliados y gestiona su visibilidad y los estados
 */
export class CharacterArray {
    constructor(scene, x, y, height, type, personajes, scale) {
        this.array = [];
        this.personajes = personajes;
        let eHeight = height / personajes.length;
        for (let i = 0; i < this.personajes.length; i++) {
            this.array[i] = new ScenePersonaje(scene, x, y + eHeight * i, personajes[i].name, scale);
            console.log(i);
        }
        this.type = type;
    }

    /**Actualiza cada elemento del array con los estados y si ha muerto oculta */
    refresh() {
        for (let i = 0; i < this.personajes.length; i++) {
            this.array[i].setStunned(this.personajes[i].stunned);
            this.array[i].setPoisoned(this.personajes[i].dot > 0);
            if (!this.personajes[i].living)
                this.array[i].ocultar();
            if (!this.array[i].img.visible && this.personajes[i].living) {
                this.array[i].mostrar();
            }
        }
    }
}