import Character from "../../character.js";
import dialogo from "../../dialogo.js";
import { RAIZ_IMAGENES } from "../../constants.js";
import { personajes } from "../../../../assets/CharactersInfo/CharactersDATA.js";
import { Personaje } from "../../Combate JS/Personajes/Personaje.js";
import { Logista } from "../../Combate JS/Personajes/Logista.js";
import { CONTROLES_OVERWORLD } from "../../constants.js";

export class EscenaTilesets4 extends Phaser.Scene {
    //cargar aqui los datos de la escena.
constructor(){
    super('escenaTilesets4')
}
init(data){
    this.myGameData = data.obj;
    this.cx = data.cx;  
    this.cy = data.cy;       
    this.dir = data.dir;  
}
    preload() {        
        this.load.tilemapTiledJSON('Almacen4', 'assets/json/Almacen4.json');        
    }

    //crear aqui los objetos de la escena
    create() {  
        this.sound.stopAll();      
        this.map = this.make.tilemap({ 
            key: 'Almacen4', 
            tileWidth: 16, 
            tileHeight: 16 
          });
          this.interactKey = this.input.keyboard.addKey(CONTROLES_OVERWORLD.ACCEPT);
          this.timer =0;
          this.interact = 1;
          const tileset1 = this.map.addTilesetImage('tileset_mercadona', 'tileset_mercadona');
          this.FloorLayer = this.map.createLayer('Suelo', tileset1);
          this.WallLayer = this.map.createLayer('Paredes', tileset1);
          this.WallLayer.setCollisionByExclusion([-1]);          
          this.hitbox1 = this.map.createFromObjects('Transiciones', {id:2});          
          this.hitbox2 = this.map.createFromObjects('Transiciones', {id:1});    
          this.physics.add.existing(this.hitbox1[0]);
          this.physics.add.existing(this.hitbox2[0]);
          
          if(!this.myGameData.CheckCharacter(personajes.frikol)){
            this.hitboxFrikol = this.map.createFromObjects('Personajes', {id:3});   
            this.physics.add.existing(this.hitboxFrikol[0]);                    
            this.Frikol = this.add.image(231.5, 97.5, 'Frikol');                    
          }

          this.character = new Character(this, this.cx, this.cy,this.dir);
          this.physics.world.enable(this.character);
          this.physics.add.collider(this.character, this.WallLayer);


          this.physics.add.overlap(this.character, this.hitbox1[0], ()=>{
            if(this.interact == 0) this.scene.start('escenaTilesets2',{obj:this.myGameData,cx:565, cy:120, dir:3});            
        })
        this.physics.add.overlap(this.character, this.hitbox2[0], ()=>{
            if(this.interact == 0) this.scene.start('escenaMercadona',{obj:this.myGameData,cx:645, cy:420, dir:1});            
        })
        
        this.physics.add.overlap(this.character, this.hitboxFrikol[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0&&!this.myGameData.CheckCharacter(personajes.frikol))new dialogo(this, this.character, 0, function(){
                self.Frikol.destroy();   
                self.myGameData.AddCharacter(new Logista(personajes.frikol));
            })     
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
