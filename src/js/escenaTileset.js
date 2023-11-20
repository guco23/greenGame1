import { RAIZ_IMAGENES } from "./constants.js";

export class EscenaTilesets extends Phaser.Scene {
    //cargar aqui los datos de la escena.

    preload() {
        /*this.load.image('javier', RAIZ_IMAGENES + 'javier.jpg');
        this.upscaleval = 0.001;*/
        this.load.tilemapTiledJSON('Prueba', 'src/js/Prueba.json');
        this.load.image('tileset_mercadona', 'assets/images/tilesets/tileset_mercadona.png');

    }

    //crear aqui los objetos de la escena
    create() {
        /*let screenWidth = this.game.config.width;
        let screenHeight = this.game.config.height;
        //Imagen 1
        this.image = this.add.image(screenWidth, screenHeight, 'javier'); //omg so sexy
        this.image.setScale(0.3);
        this.image.setPosition(screenWidth / 2, screenHeight / 2);*/
        this.map = this.make.tilemap({ 
            key: 'Prueba', 
            tileWidth: 16, 
            tileHeight: 16 
          });
          const tileset1 = this.map.addTilesetImage('tileset_mercadona', 'tileset_mercadona');
          this.backgroundLayer = this.map.createLayer('Capa de patrones 1', tileset1);
    }

    update() {
        /*this.image.scale += this.upscaleval;
        if (this.image.scale > 0.6)
            this.upscaleval = -0.001;
        else if (this.image.scale < 0.2)
            this.upscaleval = 0.001;*/
    }
};
