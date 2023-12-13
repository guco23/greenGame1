import Character from "../../character.js";
import { RAIZ_IMAGENES } from "../../constants.js";

export class EscenaNuevosMinisterios extends Phaser.Scene {
    //cargar aqui los datos de la escena.
constructor(){
    super('escenaNuevosMinisterios')
}
init(data){
    this.myGameData = data.obj;
    this.cx = data.cx;  
    this.cy = data.cy;       
    this.dir = data.dir;  
}
    preload() {        
        this.load.tilemapTiledJSON('NuevosMinisterios', 'assets/json/NuevosMinisterios.json');
        this.load.image('tileset_nm', RAIZ_IMAGENES+'tilesets/tileset_nm.png');
        this.load.spritesheet('character', RAIZ_IMAGENES+'spritespjs/Main_char.png', {frameWidth: 28, frameHeight: 26})
    }

    //crear aqui los objetos de la escena
    create() {
        this.map = this.make.tilemap({ 
            key: 'NuevosMinisterios', 
            tileWidth: 16, 
            tileHeight: 16 
          });
          this.interactKey = this.input.keyboard.addKey('E');
          this.interact = 1;
          const tileset1 = this.map.addTilesetImage('tileset_nm', 'tileset_nm');          
          this.LavaLayer = this.map.createLayer('Lava', tileset1);          
          this.FloorLayer = this.map.createLayer('Suelo', tileset1);
          this.WallLayer = this.map.createLayer('Paredes', tileset1);
          this.WallLayer.setCollisionByExclusion([-1]);          
          this.Puerta1 = this.map.createLayer('Puerta1', tileset1);
          this.Puerta2 = this.map.createLayer('Puerta2', tileset1);
          this.hitbox1 = this.map.createFromObjects('Transiciones', {id:1});          
          this.physics.add.existing(this.hitbox1[0]);
          this.hitbox2 = this.map.createFromObjects('Transiciones', {id:2});          
          this.physics.add.existing(this.hitbox2[0]);

          this.character = new Character(this, this.cx, this.cy,this.dir);
          this.physics.world.enable(this.character);
          this.physics.add.collider(this.character, this.WallLayer);
          
          this.NoWallLayer = this.map.createLayer('ParedesSobrepuestas', tileset1); //Esta capa se coloca después para que esté por "encima" del jugador

          this.physics.add.overlap(this.character, this.hitbox1[0], ()=>{
            if(this.interact == 0) this.scene.start('escenaPlaya',{obj:this.myGameData,cx:1780, cy:2730, dir:2});            
        })
        this.physics.add.overlap(this.character, this.hitbox2[0], ()=>{
            //Poner qué pasa si se supera la sección de nuevos ministerios 
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
