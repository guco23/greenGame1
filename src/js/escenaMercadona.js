import Character from "./Character.js";
import { RAIZ_IMAGENES } from "./constants.js";
import GameData from "./GameData.js";
import dialogo from "./dialogo.js";

export class EscenaMercadona extends Phaser.Scene {
    //cargar aqui los datos de la escena.
constructor(){
    super('escenaMercadona')
}
init(data){
    this.myGameData = data.obj;
    this.cx = data.cx;  
    this.cy = data.cy;       
    this.dir = data.dir;  
}
    preload() {
        this.load.tilemapTiledJSON('SalaMercadona', 'src/json/SalaMercadona.json');
        this.load.image('tileset_mercadona', 'assets/images/tilesets/tileset_mercadona.png');
        this.load.spritesheet('character', 'assets/images/spritespjs/Main_char.png', {frameWidth: 28, frameHeight: 26})
    }
    
    create() {
        this.map = this.make.tilemap({ 
            key: 'SalaMercadona', 
            tileWidth: 16, 
            tileHeight: 16 
          });
          this.interactKey = this.input.keyboard.addKey('E');
          this.interact = 1;
          const tileset1 = this.map.addTilesetImage('tileset_mercadona', 'tileset_mercadona');
          this.FloorLayer = this.map.createLayer('Suelo', tileset1);
          this.WallLayer = this.map.createLayer('Paredes', tileset1);
          this.NoWallLayer = this.map.createLayer('Paredes atravesables', tileset1);          
          this.DoorJokeLayer = this.map.createLayer('ChisteDeLaPuerta', tileset1);  
          this.WallLayer.setCollisionByExclusion([-1]);     

          this.hitbox1 = this.map.createFromObjects('Transiciones', {id:1});          
          this.physics.add.existing(this.hitbox1[0]);
          this.hitbox2 = this.map.createFromObjects('Transiciones', {id:2});          
          this.physics.add.existing(this.hitbox2[0]);
          this.hitbox3 = this.map.createFromObjects('Transiciones', {id:3});          
          this.physics.add.existing(this.hitbox3[0]);
          this.hitbox4 = this.map.createFromObjects('Transiciones', {id:4});          
          this.physics.add.existing(this.hitbox4[0]);

          this.character = new Character(this, this.cx, this.cy,this.dir);
          this.physics.world.enable(this.character);
          this.physics.add.collider(this.character, this.WallLayer);
          this.Texto = false;

          this.physics.add.overlap(this.character, this.hitbox1[0], ()=>{
            if(this.interact == 0) this.scene.start('escenaTilesets4',{obj:this.myGameData,cx:100, cy:65, dir:3});
        })
        this.physics.add.overlap(this.character, this.hitbox2[0], ()=>{
            if(this.interact == 0) this.scene.start('escenaCajaFuerte',{obj:this.myGameData,cx:55, cy:170, dir:1});
        })
        this.physics.add.overlap(this.character, this.hitbox3[0], ()=>{
            if(this.interact == 0) this.scene.start('escenaCajaFuerte',{obj:this.myGameData,cx:485, cy:170, dir:1});
        })

        var self=this;
        this.physics.add.overlap(this.character, this.hitbox4[0], ()=>{
            if(this.interact == 0 && !this.Texto) {
                new dialogo(this, this.character, ["Recoges la puerta", "La puerta ha sido añadida a tu inventario"],function(){
                    self.DoorJokeLayer.visible = false;                    
                })                
            }
        })
                    
          this.cameras.main.startFollow(this.character);      
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
