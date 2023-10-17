export class Escena1 extends Phaser.Scene {
    //cargar aqui los datos de la escena.
    preload() {
        this.load.image('javier', '../images/javier.jpg');
    }

    //crear aqui los objetos de la escena
    create() {
        this.add.image(400, 300, 'javier').setScale(0.7, 0.7); //omg so sexy
    }
};
