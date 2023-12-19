import Character from "../../character.js";
import { RAIZ_IMAGENES } from "../../constants.js";
import dialogo from "../../dialogo.js";

export class EscenaCajaFuerte extends Phaser.Scene {
    //cargar aqui los datos de la escena.
constructor(){
    super('escenaCajaFuerte')
}
init(data){
    this.myGameData = data.obj;
    this.cx = data.cx;  
    this.cy = data.cy;       
    this.dir = data.dir;  
}
    preload() {
        this.load.tilemapTiledJSON('escenaCajaFuerte', 'assets/json/AlmacenCajaFuerte.json');
        this.load.image('tileset_mercadona', RAIZ_IMAGENES+'tilesets/tileset_mercadona.png');
        this.load.spritesheet('character', RAIZ_IMAGENES+'spritespjs/Main_char.png', {frameWidth: 28, frameHeight: 26})
    }
    
    create() {
        this.map = this.make.tilemap({ 
            key: 'escenaCajaFuerte', 
            tileWidth: 16, 
            tileHeight: 16 
          });
          this.timer = 0;
          this.interactKey = this.input.keyboard.addKey("Z");
          this.interact = 1;
          const tileset1 = this.map.addTilesetImage('tileset_mercadona', 'tileset_mercadona');
          this.FloorLayer = this.map.createLayer('Suelo', tileset1);
          this.WallLayer = this.map.createLayer('Paredes', tileset1);                    
          this.WallLayer.setCollisionByExclusion([-1]);     

          this.hitbox1 = this.map.createFromObjects('Transiciones', {id:1});          
          this.physics.add.existing(this.hitbox1[0]);
          this.hitbox2 = this.map.createFromObjects('Transiciones', {id:2});          
          this.physics.add.existing(this.hitbox2[0]);
          this.hitbox3 = this.map.createFromObjects('CajaFuerte', {id:3});          
          this.physics.add.existing(this.hitbox3[0]);

          this.character = new Character(this, this.cx, this.cy,this.dir);
          this.physics.world.enable(this.character);
          this.physics.add.collider(this.character, this.WallLayer);
          this.Texto = false;

          this.physics.add.overlap(this.character, this.hitbox1[0], ()=>{
            if(this.interact == 0) this.scene.start('escenaMercadona',{obj:this.myGameData,cx:185, cy:65, dir:3});
        })
        this.physics.add.overlap(this.character, this.hitbox2[0], ()=>{
            if(this.interact == 0) this.scene.start('escenaMercadona',{obj:this.myGameData,cx:610, cy:65, dir:1});
        })
        this.physics.add.overlap(this.character, this.hitbox3[0], ()=>{
            if(this.interact == 0 && !this.Texto) {
                if(this.myGameData.CheckObjetoClave(0)&&this.myGameData.CheckObjetoClave(1)&&this.myGameData.CheckObjetoClave(2)){
                    if(!this.myGameData.Interactablehitboxes[2]){
                        this.myGameData.Interactablehitboxes[2] = true;
                        new dialogo(this, this.character, 9)
                        this.myGameData.AñadeObjetoClave(3);
                    }                  
                }else{
                    if(this.myGameData.Interactablehitboxes[0]){
                        new dialogo(this, this.character, 6) 
                    }else{                                        
                        this.myGameData.Interactablehitboxes[0] = true;
                        new dialogo(this, this.character, 5) 
                    }
                }
            }
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
