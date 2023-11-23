import character from "./character.js";
import { RAIZ_IMAGENES } from "./constants.js";

export class EscenaTilesets extends Phaser.Scene {
    //cargar aqui los datos de la escena.

    preload() {
        /*this.load.image('javier', RAIZ_IMAGENES + 'javier.jpg');
        this.upscaleval = 0.001;*/
        this.load.tilemapTiledJSON('Almacen1', 'src/json/Almacen1.json');
        this.load.image('tileset_mercadona', 'assets/images/tilesets/tileset_mercadona.png');
        this.load.image('character', 'assets/images/spritespjs/libra_boss.png')
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
            key: 'Almacen1', 
            tileWidth: 16, 
            tileHeight: 16 
          });
          const tileset1 = this.map.addTilesetImage('tileset_mercadona', 'tileset_mercadona');
          this.FloorLayer = this.map.createLayer('Suelo', tileset1);
          this.WallLayer = this.map.createLayer('Paredes', tileset1);
          this.WallLayer.setCollisionByExclusion([-1]);
          this.HighWallLayer = this.map.createLayer('Paredes atravesables', tileset1);
          
          let Char = new character(this, 70, 100);
          this.physics.world.enable(Char);
          this.physics.add.collider(Char, this.WallLayer);
                    
          this.cameras.main.startFollow(Char);      
          this.cameras.main.zoom = 2.2;

    }

    update() {                
        /*this.image.scale += this.upscaleval;
        if (this.image.scale > 0.6)
            this.upscaleval = -0.001;
        else if (this.image.scale < 0.2)
            this.upscaleval = 0.001;*/
    }
};
