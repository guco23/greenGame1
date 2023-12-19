import Character from "../../character.js";
import { RAIZ_IMAGENES } from "../../constants.js";
import dialogo from "../../dialogo.js";
import { CONTROLES_OVERWORLD } from "../../constants.js";
import { enemies } from "../../../../assets/EnemyInfo/EnemiesDATA.js";
import SlimeEnemigo from "../../SlimeEnemigo.js"
import { Item } from "../../Item.js"
import { items } from "../../../../assets/EquipItemDATA.js";

export class EscenaPlayaBosque extends Phaser.Scene {    
constructor(){
    super('escenaPlayaBosque')
}
init(data){
    this.myGameData = data.obj;
    this.cx = data.cx;  
    this.cy = data.cy;       
    this.dir = data.dir;  
}
    preload() {        
        this.load.tilemapTiledJSON('PlayaBosque', 'assets/json/PlayaInteriorBosque.json');
        this.load.image('Madera', RAIZ_IMAGENES+'Objetos/Madera.png');
        this.load.image('tileset_playa', RAIZ_IMAGENES+'tilesets/tileset_playa.png');
        this.load.spritesheet('character', RAIZ_IMAGENES+'spritespjs/Main_char.png', {frameWidth: 28, frameHeight: 26});
        this.load.spritesheet('Slime', RAIZ_IMAGENES+'Slime.png', { frameWidth: 16, frameHeight: 16 });
    }

    //crear aqui los objetos de la escena
    create() {
        this.sound.stopAll();
        this.timer = 0;
        this.map = this.make.tilemap({ 
            key: 'PlayaBosque', 
            tileWidth: 16, 
            tileHeight: 16 
          });
          this.interactKey = this.input.keyboard.addKey(CONTROLES_OVERWORLD.ACCEPT);
          this.interact = 1;
          //const tileset1 = this.map.addTilesetImage('tileset_mercadona', 'tileset_mercadona');
          const tileset2 = this.map.addTilesetImage('tileset_playa', 'tileset_playa');          
          this.FloorLayer = this.map.createLayer('Suelo', tileset2);          
          this.WallLayer = this.map.createLayer('Paredes', tileset2);
          this.WallLayer.setCollisionByExclusion([-1]);     
          
          this.hitbox1 = this.map.createFromObjects('Transiciones', {id:1});          
          this.physics.add.existing(this.hitbox1[0]);
          if(!this.myGameData.CheckObjetoClave(5)){
            this.Madera = this.map.createFromObjects('Items', {id:2});          
            this.physics.add.existing(this.Madera[0]);
            this.MaderaImage = this.add.image(799, 576, 'Madera');
        }

          this.character = new Character(this, this.cx, this.cy,this.dir);
          this.physics.world.enable(this.character);
          this.physics.add.collider(this.character, this.WallLayer);
          
          this.TopWallLayer = this.map.createLayer('ParedesSobrepuestas', tileset2);


          this.physics.add.overlap(this.character, this.hitbox1[0], ()=>{
            this.scene.start('escenaPlaya',{obj:this.myGameData,cx:3485, cy:1670, dir:3});
        })
        this.physics.add.overlap(this.character, this.Madera[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0&&!this.myGameData.CheckObjetoClave(5))new dialogo(this, this.character,33, function(){
                self.MaderaImage.destroy();   
                self.myGameData.AñadeObjetoClave(5);
            })     
        })
        
                    
          this.cameras.main.startFollow(this.character);      
          this.cameras.main.zoom = 2.2;

          let slimes = [
            new SlimeEnemigo(this, 100, 1, 0, 800, 696, undefined, [enemies.langosta, enemies.piraña, enemies.cangrejo], this.WallLayer, this.character, this.myGameData, 'enem54'),
            ];
            slimes.forEach(slime => {
                if(this.myGameData.CheckDefeated(slime.slimeId)) {
                    slime.destroy();
                }
            });

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
