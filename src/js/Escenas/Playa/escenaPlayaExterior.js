import Character from "../../character.js";
import { RAIZ_IMAGENES } from "../../constants.js";
import dialogo from "../../dialogo.js";
export class EscenaPlaya extends Phaser.Scene {    
constructor(){
    super('escenaPlaya')
}
init(data){
    this.myGameData = data.obj;
    this.cx = data.cx;  
    this.cy = data.cy;       
    this.dir = data.dir;  
}
    preload() {        
        this.load.tilemapTiledJSON('Playa', 'assets/json/PlayaExterior.json');
        //this.load.image('tileset_mercadona', RAIZ_IMAGENES+'tilesets/tileset_mercadona.png');
        this.load.image('tileset_playa', RAIZ_IMAGENES+'tilesets/tileset_playa.png');
        this.load.spritesheet('character', RAIZ_IMAGENES+'spritespjs/Main_char.png', {frameWidth: 28, frameHeight: 26})
    }

    //crear aqui los objetos de la escena
    create() {
        this.map = this.make.tilemap({ 
            key: 'Playa', 
            tileWidth: 16, 
            tileHeight: 16 
          });
          this.interactKey = this.input.keyboard.addKey('E');
          this.interact = 1;
          //const tileset1 = this.map.addTilesetImage('tileset_mercadona', 'tileset_mercadona');
          const tileset2 = this.map.addTilesetImage('tileset_playa', 'tileset_playa');
          this.BackgroundLayer = this.map.createLayer('AGUA', tileset2);
          this.FloorLayer = this.map.createLayer('Suelo', tileset2);
          this.WallLayer = this.map.createLayer('Paredes', tileset2);
          this.WallLayer.setCollisionByExclusion([-1]);     
          this.AguaPuente = this.map.createLayer('CapaDeAguaPuenteRoto', tileset2);
          this.AguaPuente.setCollisionByExclusion([-1]);  
          
          this.hitbox1 = this.map.createFromObjects('Transiciones', {id:8});          
          this.physics.add.existing(this.hitbox1[0]);
          this.hitbox2 = this.map.createFromObjects('Transiciones', {id:9});          
          this.physics.add.existing(this.hitbox2[0]);
          this.hitbox3 = this.map.createFromObjects('Transiciones', {id:10});          
          this.physics.add.existing(this.hitbox3[0]);
          this.hitbox4 = this.map.createFromObjects('Transiciones', {id:11});          
          this.physics.add.existing(this.hitbox4[0]);
          this.hitbox5 = this.map.createFromObjects('Transiciones', {id:12});          
          this.physics.add.existing(this.hitbox5[0]);

          this.character = new Character(this, this.cx, this.cy,this.dir);
          this.physics.world.enable(this.character);
          this.physics.add.collider(this.character, this.WallLayer);
          this.physics.add.collider(this.character, this.AguaPuente);
          
          this.TopWallLayer = this.map.createLayer('ParedesSobrepuestas', tileset2);


          this.physics.add.overlap(this.character, this.hitbox1[0], ()=>{
            if(this.interact == 0) this.scene.start('escenaTilesets3',{obj:this.myGameData,cx:295, cy:160, dir:1});            
        })
        this.physics.add.overlap(this.character, this.hitbox2[0], ()=>{
            this.scene.start('escenaPlayaBosque',{obj:this.myGameData,cx:800, cy:884, dir:1});                        
        })
        this.physics.add.overlap(this.character, this.hitbox3[0], ()=>{
            if(this.interact == 0) this.scene.start('escenaPlayaFerreteria',{obj:this.myGameData,cx:715, cy:1090, dir:1});            
        })
        this.physics.add.overlap(this.character, this.hitbox4[0], ()=>{
            if(this.interact == 0) this.scene.start('escenaMercadona',{obj:this.myGameData,cx:40, cy:200, dir:2});            
        })
        var self=this;
        this.physics.add.overlap(this.character, this.hitbox5[0], ()=>{
            if(!this.Texto)new dialogo(this, this.character, ["Notas que hay una puerta en el lateral del Mercadona TM", "Decides atravesarla"],function(){
                self.scene.start('escenaMercadona',{obj:this.myGameData,cx:40, cy:200, dir:2});
            })     
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
