import Character from "../../character.js";
import { RAIZ_IMAGENES } from "../../constants.js";
import dialogo from "../../dialogo.js";
import { Personaje	 } from "../../Combate JS/Personajes/Personaje.js";
import { personajes } from "../../../../assets/CharactersInfo/CharactersDATA.js";
export class EscenaPlaya extends Phaser.Scene {    
constructor(){
    super('escenaPlaya')
}
init(data){
    this.myGameData = data.obj;
    this.cx = data.cx;  
    this.cy = data.cy;       
    this.dir = data.dir;  
    this.Texto = false;
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
          this.interactKey = this.input.keyboard.addKey('Z');
          this.interact = 1;
          //const tileset1 = this.map.addTilesetImage('tileset_mercadona', 'tileset_mercadona');
          const tileset2 = this.map.addTilesetImage('tileset_playa', 'tileset_playa');
          this.BackgroundLayer = this.map.createLayer('AGUA', tileset2);
          this.FloorLayer = this.map.createLayer('Suelo', tileset2);
          this.WallLayer = this.map.createLayer('Paredes', tileset2);
          this.WallLayer.setCollisionByExclusion([-1]);     
          this.AguaPuente = this.map.createLayer('CapaDeAguaPuenteRoto', tileset2);
          //this.AguaPuente.setCollisionByExclusion([-1]);  
          
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

          if(!this.myGameData.CheckCharacter(personajes.bealonMusk)){
              this.BealonMusk = this.map.createFromObjects('Personajes', { id: 18 });
              this.physics.add.existing(this.BealonMusk[0]);
              this.BealonMuskImage = this.add.image(3595, 1990, 'BealonMusk');
          }
          if(!this.myGameData.CheckCharacter(personajes.emmet)){            
              this.Emmet = this.map.createFromObjects('Personajes', { id: 17 });
              this.physics.add.existing(this.Emmet[0]);
              this.EmmetImage = this.add.image(2379, 2253, 'Emmet');
          }
          if(!this.myGameData.CheckCharacter(personajes.rajoy)){
              this.MarianoRajoy = this.map.createFromObjects('Personajes', { id: 13 });
              this.physics.add.existing(this.MarianoRajoy[0]);
              this.MarianoRajoyImage = this.add.image(303, 543, 'Rajoy');
          }
          if(!this.myGameData.CheckCharacter(personajes.greta)){            
              this.Greta = this.map.createFromObjects('Personajes', { id: 14 });
              this.physics.add.existing(this.Greta[0]);
              this.GretaImage = this.add.image(2567, 263, 'Greta');
          }
          if(!this.myGameData.CheckCharacter(personajes.frijolConBotas)){            
              this.Gato = this.map.createFromObjects('Personajes', { id: 15 });
              this.physics.add.existing(this.Gato[0]);
              this.GatoImage = this.add.image(1037, 1006, 'Gato');
          }
          if(!this.myGameData.CheckCharacter(personajes.selena)){            
              this.Selena = this.map.createFromObjects('Personajes', { id: 16 });
              this.physics.add.existing(this.Selena[0]);
              this.SelenaImage = this.add.image(2122, 1355, 'Selena');
          }

          this.character = new Character(this, this.cx, this.cy,this.dir);
          this.physics.world.enable(this.character);
          this.physics.add.collider(this.character, this.WallLayer);
          this.physics.add.collider(this.character, this.AguaPuente);
          
          this.TopWallLayer = this.map.createLayer('ParedesSobrepuestas', tileset2);


          this.physics.add.overlap(this.character, this.hitbox1[0], ()=>{
            if(this.interact == 0) this.scene.start('escenaNuevosMinisterios',{obj:this.myGameData,cx:1820, cy:985, dir:0});            
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
            if(!this.Texto)new dialogo(this, this.character, 2,function(){                
                self.scene.start('escenaPlayaSalaSecreta',{obj:this.myGameData,cx:40, cy:85, dir:2});
            })     
        })
        this.physics.add.overlap(this.character, this.BealonMusk[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0&&!this.myGameData.CheckCharacter(personajes.bealonMusk))new dialogo(this, this.character,11, function(){
                self.BealonMuskImage.destroy();   
                self.myGameData.AddCharacter(new Personaje(personajes.bealonMusk));
            })     
        })
        this.physics.add.overlap(this.character, this.Gato[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0&&!this.myGameData.CheckCharacter(personajes.frijolConBotas))new dialogo(this, this.character,12, function(){
                self.GatoImage.destroy();   
                self.myGameData.AddCharacter(new Personaje(personajes.frijolConBotas));
            })     
        })
        this.physics.add.overlap(this.character, this.Emmet[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0&&!this.myGameData.CheckCharacter(personajes.emmet))new dialogo(this, this.character,13, function(){
                self.EmmetImage.destroy();   
                self.myGameData.AddCharacter(new Personaje(personajes.emmet));
            })     
        })
        this.physics.add.overlap(this.character, this.MarianoRajoy[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0&&!this.myGameData.CheckCharacter(personajes.rajoy))new dialogo(this, this.character,14, function(){
                self.MarianoRajoyImage.destroy();   
                self.myGameData.AddCharacter(new Personaje(personajes.rajoy));
            })     
        })
        this.physics.add.overlap(this.character, this.Greta[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0&&!this.myGameData.CheckCharacter(personajes.greta))new dialogo(this, this.character,15, function(){
                self.GretaImage.destroy();   
                self.myGameData.AddCharacter(new Personaje(personajes.greta));
            })     
        })
        this.physics.add.overlap(this.character, this.Selena[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0&&!this.myGameData.CheckCharacter(personajes.selena))new dialogo(this, this.character,16  , function(){
                self.SelenaImage.destroy();   
                self.myGameData.AddCharacter(new Personaje(personajes.selena));
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
