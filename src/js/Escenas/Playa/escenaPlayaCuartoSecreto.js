import Character from "../../character.js";
import { RAIZ_IMAGENES } from "../../constants.js";
import dialogo from "../../dialogo.js";

export class EscenaPlayaSalaSecreta extends Phaser.Scene {    
constructor(){
    super('escenaPlayaSalaSecreta')
}
init(data){
    this.myGameData = data.obj;
    this.cx = data.cx;  
    this.cy = data.cy;       
    this.dir = data.dir;  
    this.Texto = false;
}
    preload() {        
        this.load.tilemapTiledJSON('PlayaSala', 'assets/json/PlayaSalaSecreta.json');
        this.load.image('tileset_mercadona', RAIZ_IMAGENES+'tilesets/tileset_mercadona.png');
        //this.load.image('tileset_playa', RAIZ_IMAGENES+'tilesets/tileset_playa.png');
        this.load.spritesheet('character', RAIZ_IMAGENES+'spritespjs/Main_char.png', {frameWidth: 28, frameHeight: 26})
    }

    //crear aqui los objetos de la escena
    create() {
        this.map = this.make.tilemap({ 
            key: 'PlayaSala', 
            tileWidth: 16, 
            tileHeight: 16 
          });
          this.interactKey = this.input.keyboard.addKey('E');
          this.interact = 1;
          const tileset1 = this.map.addTilesetImage('tileset_mercadona', 'tileset_mercadona');
          //const tileset2 = this.map.addTilesetImage('tileset_playa', 'tileset_playa');          
          this.FloorLayer = this.map.createLayer('Suelo', tileset1);          
          this.WallLayer = this.map.createLayer('Paredes', tileset1);
          this.WallLayer.setCollisionByExclusion([-1]);     
          
          this.hitbox1 = this.map.createFromObjects('Transiciones', {id:1});          
          this.physics.add.existing(this.hitbox1[0]);


          this.character = new Character(this, this.cx, this.cy,this.dir);
          this.physics.world.enable(this.character);
          this.physics.add.collider(this.character, this.WallLayer);                    


          this.physics.add.overlap(this.character, this.hitbox1[0], ()=>{
            if(this.interact == 0)this.scene.start('escenaPlaya',{obj:this.myGameData,cx:2095, cy:235, dir:3});
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
