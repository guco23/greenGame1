class Selector extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene);
        //Construye un rectángulo hasta que tengamos un sprite de flecha
        this.rect = scene.add.rectangle(x, y, 10, 10, 0xff0000);
        this.unselect();
        //El indice en el array de personajes del personaje que señala este selector
    }

    //Cambia la visibilidad de el objeto a que no se vea
    select() {
        this.rect.visible = true;
    }

    //Cambia la visibilidad de el objeto a que si se vea
    unselect() {
        this.rect.visible = false;
    }
}

export class MarcadorActivo extends Phaser.GameObjects.Container {
    constructor(scene, sceneList) {
        super(scene);
        this.opciones = [];
        for(let i = 0; i < sceneList.length; i++) {
            console.log(i);
            this.opciones.push(new Selector(scene, sceneList[i].x, sceneList[i].y));
        }
    }

    refresh(current) {
        this.opciones.forEach(element => {
            element.unselect();
        });
        this.opciones[current].select();
    }
}