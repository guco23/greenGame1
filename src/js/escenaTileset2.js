import character from "./character.js";
import { RAIZ_IMAGENES } from "./constants.js";
import ObjetoClave from "./ObjetoClave.js";

export class EscenaTilesets2 extends Phaser.Scene {
    //cargar aqui los datos de la escena.
constructor(){
    super('escenaTilesets2')
}
    preload() {
        /*this.load.image('javier', RAIZ_IMAGENES + 'javier.jpg');
        this.upscaleval = 0.001;*/
        this.load.tilemapTiledJSON('Almacen2', 'src/json/Almacen2.json');
        this.load.image('tileset_mercadona', 'assets/images/tilesets/tileset_mercadona.png');
        this.load.spritesheet('character', 'assets/images/spritespjs/Main_char.png', {frameWidth: 28, frameHeight: 26})
    }

    init(data){
        this.myObjetoclave = data.obj;
        console.log("tu mama 2");

    }

    //crear aqui los objetos de la escena
    create() {/*
        let screenWidth = this.game.config.width;
        let screenHeight = this.game.config.height;
        //Imagen 1
        this.image = this.add.image(screenWidth, screenHeight, 'javier'); //omg so sexy
        this.image.setScale(0.3);
        this.image.setPosition(screenWidth / 2, screenHeight / 2);*/
        this.map = this.make.tilemap({ 
            key: 'Almacen2', 
            tileWidth: 16, 
            tileHeight: 16 
          });
          this.interactKey = this.input.keyboard.addKey('E');
          this.interact = 1;
          const tileset1 = this.map.addTilesetImage('tileset_mercadona', 'tileset_mercadona');
          this.FloorLayer = this.map.createLayer('Suelo', tileset1);
          this.WallLayer = this.map.createLayer('Paredes', tileset1);
          this.WallLayer.setCollisionByExclusion([-1]);          
          this.hitbox1 = this.map.createFromObjects('Transiciones', {id:4});          
          this.physics.add.existing(this.hitbox1[0]);
          this.hitbox2 = this.map.createFromObjects('Transiciones', {id:3});
          this.physics.add.existing(this.hitbox2[0]);
          this.hitbox3 = this.map.createFromObjects('Transiciones', {id:2});
          this.physics.add.existing(this.hitbox3[0]);

          this.Char = new character(this, 70, 100);
          this.physics.world.enable(this.Char);
          this.physics.add.collider(this.Char, this.WallLayer);
          /*var self=this;
          var onCollision = function(){                   
            if(self.interact == 0) console.log("Hay colision");
            else console.log("No :C");
          }*/
          this.physics.add.overlap(this.Char, this.hitbox1[0], ()=>{
            if(this.interact == 0) this.scene.start('escenaTilesets',{obj:this.myObjetoclave});
            else console.log("No :C");
        })
        this.physics.add.overlap(this.Char, this.hitbox2[0], ()=>{
            
            this.myObjetoclave.CheckObjetoClave(1);
            if(this.interact == 0) this.scene.start('escenaTilesets3',{obj:this.myObjetoclave});
            else console.log("No :C");
        })
        this.physics.add.overlap(this.Char, this.hitbox3[0], ()=>{
            if(this.interact == 0) this.scene.start('escenaTilesets4',{obj:this.myObjetoclave});
            else console.log("No :C");
        })
                    
          this.cameras.main.startFollow(this.Char);      
          this.cameras.main.zoom = 2.2;

    }


    update() {   
        if(this.interactKey.isDown){
            this.interact = 0;
            
        }else{
            this.interact = 1;            
        }        
    }    
};
