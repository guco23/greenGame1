class ScenePersonaje extends Phaser.GameObjects.Container {
    constructor() {

    }

}

export class CharacterArray {
    constructor(scene, x, y, height, type, personajes) {
        this.array = [];
        this.personajes = personajes;
        this.imgs = [];
        let eHeight = height / personajes.length;
        for (let i = 0; i < this.personajes.length; i++) {
            this.imgs[i] = scene.add.image(x, y + eHeight * i, personajes[i].imgLink).setScale(0.05);
            this.imgs[i].setOrigin(0,0);
            console.log(i);
        }
        this.type = type;
    }
}