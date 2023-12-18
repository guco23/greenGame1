import Character from "../../character.js";
import dialogo from "../../dialogo.js";
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
                                              
          this.Albert = this.map.createFromObjects('Personajes', { id: 4 });
          this.physics.add.existing(this.Albert[0]);
          this.AlbertImage = this.add.image(1587, 1008, 'Albert');
          this.Donald = this.map.createFromObjects('Personajes', { id: 7 });
          this.physics.add.existing(this.Donald[0]);
          this.DonaldImage = this.add.image(395, 1717, 'Donald');
          this.Indiana = this.map.createFromObjects('Personajes', { id: 5 });
          this.physics.add.existing(this.Indiana[0]);
          this.IndianaImage = this.add.image(1615, 2066, 'Indiana');
          this.Jhonny = this.map.createFromObjects('Personajes', { id: 8 });
          this.physics.add.existing(this.Jhonny[0]);
          this.JhonnyImage = this.add.image(3065, 2636, 'Jhonny');
          this.SambaDoJudia = this.map.createFromObjects('Personajes', { id: 6 });
          this.physics.add.existing(this.SambaDoJudia[0]);
          this.SambaDoJudiaImage = this.add.image(1095, 4002, 'SambaDoJudia');
          this.SaulJudman = this.map.createFromObjects('Personajes', { id: 9 });
          this.physics.add.existing(this.SaulJudman[0]);
          this.SaulJudmanImage = this.add.image(1368, 2592, 'SaulJudman');

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

        this.physics.add.overlap(this.character, this.Albert[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0)new dialogo(this, this.character,17, function(){
                self.AlbertImage.destroy();   
               // self.myGameData.AddCharacter(new Personaje(personajes.frikol));
            })     
        })
        this.physics.add.overlap(this.character, this.Donald[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0)new dialogo(this, this.character,18, function(){
                self.DonaldImage.destroy();   
               // self.myGameData.AddCharacter(new Personaje(personajes.frikol));
            })     
        })
        this.physics.add.overlap(this.character, this.Indiana[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0)new dialogo(this, this.character,19, function(){
                self.IndianaImage.destroy();   
               // self.myGameData.AddCharacter(new Personaje(personajes.frikol));
            })     
        })
        this.physics.add.overlap(this.character, this.Jhonny[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0)new dialogo(this, this.character,20, function(){
                self.JhonnyImage.destroy();   
               // self.myGameData.AddCharacter(new Personaje(personajes.frikol));
            })     
        })
        this.physics.add.overlap(this.character, this.SambaDoJudia[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0)new dialogo(this, this.character,21, function(){
                self.SambaDoJudiaImage.destroy();   
               // self.myGameData.AddCharacter(new Personaje(personajes.frikol));
            })     
        })
        this.physics.add.overlap(this.character, this.SaulJudman[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0)new dialogo(this, this.character,22 , function(){
                self.SaulJudmanImage.destroy();   
               // self.myGameData.AddCharacter(new Personaje(personajes.frikol));
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
