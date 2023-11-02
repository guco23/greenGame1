export class Escena1 extends Phaser.Scene {
    //cargar aqui los datos de la escena.

    preload() {
        this.load.image('javier', '../images/javier.jpg');
        this.upscaleval = 0.001;

    }

    //crear aqui los objetos de la escena
    create() {
        let screenWidth = this.game.config.width;
        let screenHeight = this.game.config.height;
        //Imagen 1
        this.image = this.add.image(screenWidth, screenHeight, 'javier'); //omg so sexy
        this.image.setScale(0.3);
        this.image.setPosition(screenWidth / 2, screenHeight / 2);
    }

    update() {
        this.image.scale += this.upscaleval;
        if (this.image.scale > 0.6)
            this.upscaleval = -0.002;
        else if (this.image.scale < 0.2)
            this.upscaleval = 0.003;
    }
};
