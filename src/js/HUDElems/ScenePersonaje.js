class ScenePersonaje extends Phaser.GameObjects.Container {
    constructor(scene, x, y, img) {
        super(scene);
        this.img = scene.add.image(x, y, img).setScale(0.05);
        this.img.setOrigin(0, 0);
    }

    ocultar() {
        this.img.visible = false;
    }
}

/**
 * Muestra los sprites de enemigos o aliados y gestiona su visibilidad y los estados
 */
export class CharacterArray {
    constructor(scene, x, y, height, type, personajes) {
        this.array = [];
        this.personajes = personajes;
        let eHeight = height / personajes.length;
        for (let i = 0; i < this.personajes.length; i++) {
            this.array[i] = new ScenePersonaje(scene, x, y + eHeight * i, personajes[i].imgLink);
            console.log(i);
        }
        this.type = type;
    }

    /**Actualiza cada elemento del array con los estados y si ha muerto oculta */
    refresh() {
        for (let i = 0; i < this.personajes.length; i++) {
            if (!this.personajes[i].living)
                this.array[i].ocultar();
        }
    }
}