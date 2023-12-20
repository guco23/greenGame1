import Character from "../../character.js";
import { RAIZ_IMAGENES } from "../../constants.js";
import {RAIZ_SOUNDS,RAIZ_SOUNDS_MUSICA} from "../../constants.js";
import dialogo from "../../dialogo.js";
import { Personaje	 } from "../../Combate JS/Personajes/Personaje.js";
import { personajes } from "../../../../assets/CharactersInfo/CharactersDATA.js";
import { enemies } from "../../../../assets/EnemyInfo/EnemiesDATA.js";
import SlimeEnemigo from "../../SlimeEnemigo.js"
import { CONTROLES_OVERWORLD } from "../../constants.js";
import { Item } from "../../Item.js"
import { items } from "../../../../assets/EquipItemDATA.js";

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
        this.load.spritesheet('Slime', RAIZ_IMAGENES+'Slime.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('tileset_playa', RAIZ_IMAGENES+'tilesets/tileset_playa.png');
        this.load.image('Planos', RAIZ_IMAGENES+'Objetos/Planos.png');
        this.load.spritesheet('character', RAIZ_IMAGENES+'spritespjs/Main_char.png', {frameWidth: 28, frameHeight: 26});
        this.load.spritesheet('cofre',  RAIZ_IMAGENES+'Objetos/Cofres.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('checkPoint',  RAIZ_IMAGENES+'Objetos/CheckPoint.png', {frameWidth: 32, frameHeight: 32});
        this.load.audio('musicPlaya', RAIZ_SOUNDS+RAIZ_SOUNDS_MUSICA+'Playa.mp3')
    }

    //crear aqui los objetos de la escena
    create() {        
        this.sound.stopAll();
        const musicConfig = {
            mute: false,
            volume: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.MainTheme = this.sound.add('musicPlaya');
        this.MainTheme.play(musicConfig);
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

        this.anims.create({
			key: 'banderaRoja',
			frames: this.anims.generateFrameNumbers('checkPoint', { start: 0, end: 0 }),
			frameRate: 16,
			repeat: -1
		});

        this.anims.create({
			key: 'banderaVerde',
			frames: this.anims.generateFrameNumbers('checkPoint', { start: 1, end: 1 }),
			frameRate: 16,
			repeat: -1
		});

        this.map = this.make.tilemap({ 
            key: 'Playa', 
            tileWidth: 16, 
            tileHeight: 16 
          });
          this.interactKey = this.input.keyboard.addKey(CONTROLES_OVERWORLD.ACCEPT);
          this.interact = 1;
          //const tileset1 = this.map.addTilesetImage('tileset_mercadona', 'tileset_mercadona');
          const tileset2 = this.map.addTilesetImage('tileset_playa', 'tileset_playa');
          this.BackgroundLayer = this.map.createLayer('AGUA', tileset2);
          this.FloorLayer = this.map.createLayer('Suelo', tileset2);
          this.WallLayer = this.map.createLayer('Paredes', tileset2);
          this.WallLayer.setCollisionByExclusion([-1]);     
          
          if(!this.myGameData.Interactablehitboxes[4]){
              this.AguaPuente = this.map.createLayer('CapaDeAguaPuenteRoto', tileset2);
              this.AguaPuente.setCollisionByExclusion([-1]);  
          }
          
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
          if(!this.myGameData.Interactablehitboxes[4]){
            this.hitbox6 = this.map.createFromObjects('Items', {id:23});          
            this.physics.add.existing(this.hitbox6[0]);            
        }
        this.hitbox7 = this.map.createFromObjects('Items', {id:30});          
          this.physics.add.existing(this.hitbox7[0]);
          
          if(!this.myGameData.CheckObjetoClave(6)){
              this.Planos = this.map.createFromObjects('Items', {id:20});          
              this.physics.add.existing(this.Planos[0]);
              this.PlanosImage = this.add.image(961, 722, 'Planos');
          }

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
          if(!this.myGameData.Interactablehitboxes[4])this.AguaPuenteCollider = this.physics.add.collider(this.character, this.AguaPuente);
          
          this.TopWallLayer = this.map.createLayer('ParedesSobrepuestas', tileset2);
        
        //CheckPoints
        let groupCheckPoints = this.add.group();
        let check = this.map.createFromObjects('CheckPoints', {name: "checkPoint", key: 'checkPoint'});
        this.anims.play('banderaRoja', check);
        groupCheckPoints.addMultiple(check);
        check.forEach(obj => {
			console.log("uwu");
			this.physics.add.existing(obj);
		});
        //Cofres, mejor tocar lo minimo posible, unicamente cambiar que el item q de al jugador como tal en vez de ser un string sea un item
        //Se que puede parecer una peruanada esto de abajo, pero por favor son la 1 de la mañana, he perdido el tiempo con la puta mierda de la memoria cahe del navegador
        //y quedan menos de 24 horas asi que dejemonos de cosas de limpieza de codigo con esto
        //POR FAVOR, HACED CASO A LO DICHO D,:
        let groupCofres = this.add.group();
        let cofre1 = this.map.createFromObjects('Cofres', {name: "cofre1", key: 'cofre'});
		this.anims.play('cofreCerrado', cofre1);
        groupCofres.addMultiple(cofre1);
        cofre1.forEach(obj => {
			console.log("uwu");
			this.physics.add.existing(obj);
		});

        //Por cuestiones de diseño, el cofre2 ha sido borrado

        let cofre3 = this.map.createFromObjects('Cofres', {name: "cofre3", key: 'cofre'});
		this.anims.play('cofreCerrado', cofre3);
        groupCofres.addMultiple(cofre3);
        cofre3.forEach(obj => {
			console.log("uwu");
			this.physics.add.existing(obj);
		});

        let cofre4 = this.map.createFromObjects('Cofres', {name: "cofre4", key: 'cofre'});
		this.anims.play('cofreCerrado', cofre4);
        groupCofres.addMultiple(cofre4);
        cofre4.forEach(obj => {
			console.log("uwu");
			this.physics.add.existing(obj);
		});


        this.physics.add.overlap(this.character, groupCheckPoints, (character, checkPoint) => {
            this.myGameData.UpdateCheckPoint(this, character.x, character.y);
            this.anims.play('banderaVerde', checkPoint);
        });

        this.physics.add.overlap(this.character, groupCofres, (character, cofre) => {
            if(this.interact == 0){
                if (cofre.name == "cofre1"){
                    if(!self.myGameData.AñadeItemEquipable(items.escudoBronce))
                    {   
                    new dialogo(this, this.character,47);
                    console.log("Nombre del ítem:", items.escudoBronce.nombre);
                    console.log("objeto conseguido");   
                    }
                    else    
                    if(this.timer == 0)new dialogo(this, this.character,48);  
    
                }
                else if (cofre.name == "cofre3"){
                    if(!self.myGameData.AñadeItemEquipable(items.guanteCueroPlus))
                    {  
                    new dialogo(this, this.character,47);
                    console.log("Nombre del ítem:", items.guanteCueroPlus.nombre);
                    console.log("objeto conseguido");   
                    }
                    else    
                    if(this.timer == 0)new dialogo(this, this.character,48);
                }
                else if (cofre.name == "cofre4"){
                    if(!self.myGameData.AñadeItemEquipable(items.escudoBronce))
                    {   
                    new dialogo(this, this.character,47);
                    console.log("Nombre del ítem:", items.escudoBronce.nombre);
                    console.log("objeto conseguido");   
                    }
                    else    
                    if(this.timer == 0)new dialogo(this, this.character,48);
                }
                this.anims.play('cofreAbierto', cofre);
            }
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
        var self=this;
        this.physics.add.overlap(this.character, this.hitbox6[0], ()=>{  
            if(this.myGameData.CheckObjetoClave(4)&&this.myGameData.CheckObjetoClave(5)&&this.myGameData.CheckObjetoClave(6))          
            if(!this.Texto && !this.myGameData.Interactablehitboxes[4])new dialogo(this, this.character, 34,function(){                                
                self.myGameData.Interactablehitboxes[4] = true;                
                self.AguaPuente.visible = false;                  
                self.AguaPuenteCollider.destroy();
                new dialogo(self, self.character, 35);
            })     
        })
        this.physics.add.overlap(this.character, this.hitbox7[0], ()=>{
            if(!this.myGameData.CheckDefeated('boss2')){
                new dialogo(this, this.character, 50, function(){
                    self.scene.start('combatScene', {
                        gameData: self.myGameData,
                        enemigos: [enemies.pepsi, enemies.acuarius, enemies.pepsi],
                        objeto: items.undefined,
                        scene: self.scene.key,
                        cx: self.character.x,
                        cy: self.character.y,
                        dir: self.character.dir,
                        id: "boss2"
                    });
                })    
            }            
        })
        this.physics.add.overlap(this.character, this.Planos[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0&&!this.myGameData.CheckObjetoClave(6))new dialogo(this, this.character,31, function(){
                self.PlanosImage.destroy();   
                self.myGameData.AñadeObjetoClave(6);
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
            new SlimeEnemigo(this, 100, 0, 1, 1439, 328, undefined, [enemies.botella2, enemies.platanoMaduro, enemies.platanoMaduro], this.WallLayer, this.character, this.myGameData, 'enem8'),
            new SlimeEnemigo(this, 100, 1, 1, 964, 500, undefined, [enemies.pepsi, enemies.pepsi, enemies.platanoMaduro], this.WallLayer, this.character, this.myGameData, 'enem9'),
            new SlimeEnemigo(this, 100, 1, 0, 958, 774, undefined, [enemies.pirania, enemies.langosta, enemies.pezPayaso], this.WallLayer, this.character, this.myGameData, 'enem10'),

            new SlimeEnemigo(this, 70, 1, 0, 2283, 792, items.chalecoBronce, [enemies.pirania, enemies.pezGlobo], this.WallLayer, this.character, this.myGameData, 'enem11'),
            new SlimeEnemigo(this, 100, 0, 1, 2625, 1366, undefined, [enemies.botella2, enemies.pepsi, enemies.pepsi, enemies.platanoMaduro], this.WallLayer, this.character, this.myGameData, 'enem12'),
            new SlimeEnemigo(this, 70, 1, 0, 2295, 1919, items.chalecoBronce, [enemies.cangrejo, enemies.platanoMaduro, enemies.platanoMaduro, enemies.platanoMaduro], this.WallLayer, this.character, this.myGameData, 'enem13'),

            new SlimeEnemigo(this, 100, 1, 0, 2294, 1142, undefined, [enemies.cangrejo, enemies.langosta], this.WallLayer, this.character, this.myGameData, 'enem14'),
            new SlimeEnemigo(this, 50, 1, 1, 2000, 2192, undefined, [enemies.medusa, enemies.langosta, enemies.medusa], this.WallLayer, this.character, this.myGameData, 'enem15'),
            new SlimeEnemigo(this, 100, 1, 1, 1586, 2152, items.chalecoBronce, [enemies.pezGlobo, enemies.pezGlobo, enemies.pirania, enemies.pirania], this.WallLayer, this.character, this.myGameData, 'enem16'),

            new SlimeEnemigo(this, 50, 1, 1, 903, 1966, undefined, [enemies.cangrejo, enemies.botella2, enemies.langosta], this.WallLayer, this.character, this.myGameData, 'enem17'),
            new SlimeEnemigo(this, 50, 0, 1, 966, 1709, undefined, [enemies.pezPayaso, enemies.pepsi, enemies.pepsi, enemies.medusa], this.WallLayer, this.character, this.myGameData, 'enem18'),
            new SlimeEnemigo(this, 50, 1, 0, 1060, 1301, items.escudoHierro, [enemies.pezPayaso, enemies.pezPayaso, enemies.pezPayaso, enemies.pezPayaso], this.WallLayer, this.character, this.myGameData, 'enem19'),

            new SlimeEnemigo(this, 50, 1, -1, 2896, 2178, items.guanteCueroPlus, [enemies.langosta, enemies.pezPayaso, enemies.langosta], this.WallLayer, this.character, this.myGameData, 'enem20'),
            new SlimeEnemigo(this, 100, 1, 0, 3526, 2103, items.escudoHierro, [enemies.cangrejo, enemies.cangrejo, enemies.pepsi], this.WallLayer, this.character, this.myGameData, 'enem21'),
            new SlimeEnemigo(this, 50, 0, 1, 3430, 2036, undefined, [enemies.calamar, enemies.cangrejo, enemies.calamar], this.WallLayer, this.character, this.myGameData, 'enem22'),

            new SlimeEnemigo(this, 50, 0, 1, 3430, 1925, undefined, [enemies.pezGlobo, enemies.medusa, enemies.pepsi, enemies.pepsi], this.WallLayer, this.character, this.myGameData, 'enem23'),
            new SlimeEnemigo(this, 100, 0, 1, 3624, 2003, undefined, [enemies.pezGlobo, enemies.medusa, enemies.pezPayaso], this.WallLayer, this.character, this.myGameData, 'enem24')
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
