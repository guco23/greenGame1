import Character from "../../character.js";
import { RAIZ_IMAGENES } from "../../constants.js";
import { CONTROLES_OVERWORLD } from "../../constants.js";
import dialogo from "../../dialogo.js";
import { Item } from "../../Item.js"
import { items } from "../../../../assets/EquipItemDATA.js";

export class EscenaTilesets3 extends Phaser.Scene {
    //cargar aqui los datos de la escena.
constructor(){
    super('escenaTilesets3')
}
init(data){
    this.myGameData = data.obj;
    this.cx = data.cx;  
    this.cy = data.cy;       
    this.dir = data.dir;  
}
    preload() {
        /*this.load.image('javier', RAIZ_IMAGENES + 'javier.jpg');
        this.upscaleval = 0.001;*/
        this.load.tilemapTiledJSON('Almacen3', 'assets/json/Almacen3.json');
        this.load.image('tileset_mercadona', RAIZ_IMAGENES+'tilesets/tileset_mercadona.png');
        this.load.spritesheet('character', RAIZ_IMAGENES+'spritespjs/Main_char.png', {frameWidth: 28, frameHeight: 26})
        this.load.spritesheet('cofre',  RAIZ_IMAGENES+'Objetos/Cofres.png', {frameWidth: 16, frameHeight: 16});
    }

    //crear aqui los objetos de la escena
    create() {
        this.sound.stopAll();
        /*
        let screenWidth = this.game.config.width;
        let screenHeight = this.game.config.height;
        //Imagen 1
        this.image = this.add.image(screenWidth, screenHeight, 'javier'); //omg so sexy
        this.image.setScale(0.3);
        this.image.setPosition(screenWidth / 2, screenHeight / 2);*/
        this.timer = 0;

        this.anims.create({
			key: 'cofreCerrado',
			frames: this.anims.generateFrameNumbers('cofre', { start: 0, end: 0 }),
			frameRate: 16,
			repeat: -1
		});

        this.anims.create({
			key: 'cofreAbierto',
			frames: this.anims.generateFrameNumbers('cofre', { start: 1, end: 1 }),
			frameRate: 16,
			repeat: -1
		});

        this.map = this.make.tilemap({ 
            key: 'Almacen3', 
            tileWidth: 16, 
            tileHeight: 16 
          });
          this.interactKey = this.input.keyboard.addKey(CONTROLES_OVERWORLD.ACCEPT);
          this.interact = 1;
          const tileset1 = this.map.addTilesetImage('tileset_mercadona', 'tileset_mercadona');
          this.FloorLayer = this.map.createLayer('Suelo', tileset1);
          this.WallLayer = this.map.createLayer('Paredes', tileset1);
          this.WallLayer.setCollisionByExclusion([-1]);          
          this.hitbox1 = this.map.createFromObjects('Transicion', {id:1});          
          this.physics.add.existing(this.hitbox1[0]);

          this.character = new Character(this, this.cx, this.cy,this.dir);
          this.physics.world.enable(this.character);
          this.physics.add.collider(this.character, this.WallLayer);

          //Cofres
          let groupCofres = this.add.group();
          let cofre1 = this.map.createFromObjects('Cofres', {name: "cofre1", key: 'cofre', item: items.escudoMadera });
          this.anims.play('cofreCerrado', cofre1);
          groupCofres.addMultiple(cofre1);
          cofre1.forEach(obj => {
              console.log("uwu");
              this.physics.add.existing(obj);
          });

          this.physics.add.overlap(this.character, groupCofres, (character, cofre) => {
            if(this.interact == 0){
                if(!this.myGameData.AddItemEquipable(cofre.item))
                {
                    console.log("objeto conseguido");   
                }
                else
                {
                    console.log("vacio");  
                }
                this.anims.play('cofreAbierto', cofre);
            }
        });
          /*var self=this;
          var onCollision = function(){                   
            if(self.interact == 0) console.log("Hay colision");
            else console.log("No :C");
          }*/
          this.physics.add.overlap(this.character, this.hitbox1[0], ()=>{
            if(this.interact == 0) this.scene.start('escenaTilesets2',{obj:this.myGameData,cx:295, cy:160, dir:1});            
        })
                    
          this.cameras.main.startFollow(this.character);      
          this.cameras.main.zoom = 2.2;

    }


    update() {
        if (this.interactKey.isDown) {
            if(this.timer==0)this.interact = 0;
            if(this.Texto)this.timer = 25;
        } else {
            this.interact = 1;
            if(this.timer >0 && !this.Texto) this.timer--;
        }        
        
    } 
};
