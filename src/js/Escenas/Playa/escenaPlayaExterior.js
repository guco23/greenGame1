import Character from "../../character.js";
import { RAIZ_IMAGENES } from "../../constants.js";
import dialogo from "../../dialogo.js";
import { Personaje	 } from "../../Combate JS/Personajes/Personaje.js";
import { personajes } from "../../../../assets/CharactersInfo/CharactersDATA.js";
import { enemies } from "../../../../assets/EnemyInfo/EnemiesDATA.js";
import SlimeEnemigo from "../../SlimeEnemigo.js"

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
        this.load.spritesheet('Slime', RAIZ_IMAGENES+'Slime.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('tileset_playa', RAIZ_IMAGENES+'tilesets/tileset_playa.png');
        this.load.spritesheet('character', RAIZ_IMAGENES+'spritespjs/Main_char.png', {frameWidth: 28, frameHeight: 26})
        this.load.spritesheet('cofre',  RAIZ_IMAGENES+'Objetos/Cofres.png', {frameWidth: 16, frameHeight: 16})
    }

    //crear aqui los objetos de la escena
    create() {
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

        //Cofres, mejor tocar lo minimo posible, unicamente cambiar que el item q de al jugador como tal en vez de ser un string sea un item
        //Se que puede parecer una peruanada esto de abajo, pero por favor son la 1 de la mañana, he perdido el tiempo con la puta mierda de la memoria cahe del navegador
        //y quedan menos de 24 horas asi que dejemonos de cosas de limpieza de codigo con esto
        //POR FAVOR, HACED CASO A LO DICHO D,:
        let groupCofres = this.add.group();
        let cofre1 = this.map.createFromObjects('Cofres', {name: "cofre1", key: 'cofre', item: "item1" });
		this.anims.play('cofreCerrado', cofre1);
        groupCofres.addMultiple(cofre1);
        cofre1.forEach(obj => {
			console.log("uwu");
			this.physics.add.existing(obj);
		});

        let cofre2 = this.map.createFromObjects('Cofres', {name: "cofre2", key: 'cofre', item: "item2" });
		this.anims.play('cofreCerrado', cofre2);
        groupCofres.addMultiple(cofre2);
        cofre2.forEach(obj => {
			console.log("uwu");
			this.physics.add.existing(obj);
		});

        let cofre3 = this.map.createFromObjects('Cofres', {name: "cofre3", key: 'cofre', item: "item3" });
		this.anims.play('cofreCerrado', cofre3);
        groupCofres.addMultiple(cofre3);
        cofre3.forEach(obj => {
			console.log("uwu");
			this.physics.add.existing(obj);
		});

        let cofre4 = this.map.createFromObjects('Cofres', {name: "cofre4", key: 'cofre', item: "item4" });
		this.anims.play('cofreCerrado', cofre4);
        groupCofres.addMultiple(cofre4);
        cofre4.forEach(obj => {
			console.log("uwu");
			this.physics.add.existing(obj);
		});

        let cofre5 = this.map.createFromObjects('Cofres', {name: "cofre5", key: 'cofre', item: "item5" });
		this.anims.play('cofreCerrado', cofre5);
        groupCofres.addMultiple(cofre5);
        cofre5.forEach(obj => {
			console.log("uwu");
			this.physics.add.existing(obj);
		});

        let cofre6 = this.map.createFromObjects('Cofres', {name: "cofre6", key: 'cofre', item: "item6" });
		this.anims.play('cofreCerrado', cofre6);
        groupCofres.addMultiple(cofre6);
        cofre6.forEach(obj => {
			console.log("uwu");
			this.physics.add.existing(obj);
		});



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

        let slimes = [
            new SlimeEnemigo(this, 100, 0, 1, 1439, 328, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem1'),
            new SlimeEnemigo(this, 100, 1, 1, 964, 500, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem2'),
            new SlimeEnemigo(this, 70, 1, 0, 2289, 497, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem3'),

            new SlimeEnemigo(this, 70, 1, 0, 2283, 792, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem1'),
            new SlimeEnemigo(this, 100, 0, 1, 2625, 1366, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem2'),
            new SlimeEnemigo(this, 70, 1, 0, 2295, 1919, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem3'),

            new SlimeEnemigo(this, 100, 1, 0, 2294, 1142, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem1'),
            new SlimeEnemigo(this, 50, 1, 1, 2000, 2192, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem2'),
            new SlimeEnemigo(this, 100, 1, 1, 1586, 2152, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem3'),

            new SlimeEnemigo(this, 50, 1, 1, 903, 1966, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem1'),
            new SlimeEnemigo(this, 50, 0, 1, 966, 1709, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem2'),
            new SlimeEnemigo(this, 50, 1, 0, 1060, 1301, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem3'),

            new SlimeEnemigo(this, 50, 1, -1, 2896, 2178, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem1'),
            new SlimeEnemigo(this, 100, 1, 0, 3526, 2103, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem2'),
            new SlimeEnemigo(this, 50, 0, 1, 3430, 2036, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem3'),

            new SlimeEnemigo(this, 50, 0, 1, 3430, 1925, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem1'),
            new SlimeEnemigo(this, 100, 0, 1, 3624, 2003, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem2')
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
