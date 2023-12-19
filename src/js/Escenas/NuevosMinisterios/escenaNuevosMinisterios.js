import Character from "../../character.js";
import dialogo from "../../dialogo.js";
import { RAIZ_IMAGENES } from "../../constants.js";
import { Personaje } from "../../Combate JS/Personajes/Personaje.js";
import { personajes } from "../../../../assets/CharactersInfo/CharactersDATA.js";
import { enemies } from "../../../../assets/EnemyInfo/EnemiesDATA.js";
import SlimeEnemigo from "../../SlimeEnemigo.js"
import { CONTROLES_OVERWORLD } from "../../constants.js";

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
        this.load.spritesheet('Slime', RAIZ_IMAGENES+'Slime.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('character', RAIZ_IMAGENES+'spritespjs/Main_char.png', {frameWidth: 28, frameHeight: 26});
        this.load.spritesheet('coin',  RAIZ_IMAGENES+'Objetos/Coins.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('cofre',  RAIZ_IMAGENES+'Objetos/Cofres.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('checkPoint',  RAIZ_IMAGENES+'Objetos/CheckPoint.png', {frameWidth: 32, frameHeight: 32});
    }

    //crear aqui los objetos de la escena
    create() {
        this.timer = 0;
        this.anims.create({
			key: 'spin',
			frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 0 }),
			frameRate: 16,
			repeat: -1
		});

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
            key: 'NuevosMinisterios', 
            tileWidth: 16, 
            tileHeight: 16 
          });

        

          this.interactKey = this.input.keyboard.addKey(CONTROLES_OVERWORLD.ACCEPT);
          this.interact = 1;
          const tileset1 = this.map.addTilesetImage('tileset_nm', 'tileset_nm');          
          this.LavaLayer = this.map.createLayer('Lava', tileset1);          
          this.FloorLayer = this.map.createLayer('Suelo', tileset1);
          this.WallLayer = this.map.createLayer('Paredes', tileset1);
          this.WallLayer.setCollisionByExclusion([-1]);          
          
          if(!this.myGameData.Interactablehitboxes[5]){
              this.Puerta1 = this.map.createLayer('Puerta1', tileset1);
              this.Puerta1.setCollisionByExclusion([-1]);
          }
          if(!this.myGameData.Interactablehitboxes[6]){
              this.Puerta2 = this.map.createLayer('Puerta2', tileset1);
              this.Puerta2.setCollisionByExclusion([-1]);   
          }
          this.hitbox1 = this.map.createFromObjects('Transiciones', {id:1});          
          this.physics.add.existing(this.hitbox1[0]);
          this.hitbox2 = this.map.createFromObjects('Transiciones', {id:2});          
          this.physics.add.existing(this.hitbox2[0]);
          this.Caja1 =this.map.createFromObjects('CajasRegistradoras', {id:138});          
          this.physics.add.existing(this.Caja1[0]);    
          this.Caja2 =this.map.createFromObjects('CajasRegistradoras', {id:139});          
          this.physics.add.existing(this.Caja2[0]);    

          if(!this.myGameData.CheckCharacter(personajes.albert)){
              this.Albert = this.map.createFromObjects('Personajes', { id: 4 });
              this.physics.add.existing(this.Albert[0]);
              this.AlbertImage = this.add.image(1587, 1008, 'Albert');
          }
          if(!this.myGameData.CheckCharacter(personajes.donald)){
              this.Donald = this.map.createFromObjects('Personajes', { id: 7 });
              this.physics.add.existing(this.Donald[0]);
              this.DonaldImage = this.add.image(395, 1717, 'Donald');
          }
          if(!this.myGameData.CheckCharacter(personajes.indiana)){
              this.Indiana = this.map.createFromObjects('Personajes', { id: 5 });
              this.physics.add.existing(this.Indiana[0]);
              this.IndianaImage = this.add.image(1615, 2066, 'Indiana');          
          }
          if(!this.myGameData.CheckCharacter(personajes.johnny)){            
              this.Jhonny = this.map.createFromObjects('Personajes', { id: 8 });
              this.physics.add.existing(this.Jhonny[0]);
              this.JhonnyImage = this.add.image(3065, 2636, 'Jhonny');
          }
          if(!this.myGameData.CheckCharacter(personajes.samba)){            
              this.SambaDoJudia = this.map.createFromObjects('Personajes', { id: 6 });
              this.physics.add.existing(this.SambaDoJudia[0]);
              this.SambaDoJudiaImage = this.add.image(1095, 4002, 'SambaDoJudia');
          }
          if(!this.myGameData.CheckCharacter(personajes.saulJudman)){            
              this.SaulJudman = this.map.createFromObjects('Personajes', { id: 9 });
              this.physics.add.existing(this.SaulJudman[0]);
              this.SaulJudmanImage = this.add.image(1368, 2592, 'SaulJudman');
          }

        //Monedas
        let coinsNM = this.map.createFromObjects('Monedas', {name: "coin", key: 'coin' });
		this.anims.play('spin', coinsNM);
		
		let groupCoinsNM = this.add.group();
		groupCoinsNM.addMultiple(coinsNM);
		coinsNM.forEach(obj => {
			console.log("uwu");
			this.physics.add.existing(obj);
		});

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


        //Colisiones
        this.character = new Character(this, this.cx, this.cy,this.dir);
        this.physics.world.enable(this.character);
        this.physics.add.collider(this.character, this.WallLayer);
        if(!this.myGameData.Interactablehitboxes[5])this.Puerta1Collider = this.physics.add.collider(this.character, this.Puerta1);
        if(!this.myGameData.Interactablehitboxes[6])this.Puerta2Collider = this.physics.add.collider(this.character, this.Puerta2);
        this.physics.add.collider(this.character, groupCoinsNM, (character, coin) => {
            this.myGameData.AñadeMonedasNM(1);
            console.log(this.myGameData.GetMonedasNM())
            coin.destroy();
        });


        //CheckPoints
        let groupCheckPoints = this.add.group();
        let check = this.map.createFromObjects('CheckPoints', {name: "checkPoint", key: 'checkPoint'});
        this.anims.play('banderaRoja', check);
        groupCheckPoints.addMultiple(check);
        check.forEach(obj => {
			console.log("uwu");
			this.physics.add.existing(obj);
		});


        this.physics.add.overlap(this.character, groupCheckPoints, (character, checkPoint) => {
            this.myGameData.UpdateCheckPoint(this, this.character.x, this.character.y);
            this.anims.play('banderaVerde', checkPoint);
        });

        this.physics.add.overlap(this.character, groupCofres, (character, cofre) => {
            if(this.interact == 0){
                
                this.anims.play('cofreAbierto', cofre);
            }
        });

          this.NoWallLayer = this.map.createLayer('ParedesSobrepuestas', tileset1); //Esta capa se coloca después para que esté por "encima" del jugador

          this.physics.add.overlap(this.character, this.hitbox1[0], ()=>{
            if(this.interact == 0) this.scene.start('escenaPlaya',{obj:this.myGameData,cx:1780, cy:2730, dir:2});            
        })
        this.physics.add.overlap(this.character, this.hitbox2[0], ()=>{
            //Poner qué pasa si se supera la sección de nuevos ministerios 
        })   
        this.physics.add.overlap(this.character, this.Caja1[0], ()=>{
            if(!this.Texto&&this.interact == 0){
                let self = this;
                if(this.myGameData.Interactablehitboxes[5]){
                    new dialogo(this,this.character,38);
                }else{
                    if(this.myGameData.GetMonedasNM() >= 1){                        
                        new dialogo(this, this.character,37, function(){
                            self.myGameData.Interactablehitboxes[5] = true;
                            self.Puerta1.visible = false;                  
                            self.Puerta1Collider.destroy();
                        })     
                    }else{
                        new dialogo(this,this.character,36);
                    }
                }
            }
        })       
        this.physics.add.overlap(this.character, this.Caja2[0], ()=>{
            if(!this.Texto&&this.interact == 0){
                let self = this;
                if(this.myGameData.Interactablehitboxes[6]){
                    new dialogo(this,this.character,41);
                }else{
                    if(this.myGameData.GetMonedasNM() >= 65){                        
                        new dialogo(this, this.character,40, function(){
                            self.myGameData.Interactablehitboxes[6] = true;
                            self.Puerta2.visible = false;                  
                            self.Puerta2Collider.destroy();
                        })     
                    }else{
                        new dialogo(this,this.character,39);
                    }
                }
            }
        })   

        this.physics.add.overlap(this.character, this.Albert[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0&&!this.myGameData.CheckCharacter(personajes.albert))new dialogo(this, this.character,17, function(){
                self.AlbertImage.destroy();   
                self.myGameData.AddCharacter(new Personaje(personajes.albert));
            })     
        })
        this.physics.add.overlap(this.character, this.Donald[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0&&!this.myGameData.CheckCharacter(personajes.donald))new dialogo(this, this.character,18, function(){
                self.DonaldImage.destroy();   
                self.myGameData.AddCharacter(new Personaje(personajes.donald));
            })     
        })
        this.physics.add.overlap(this.character, this.Indiana[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0&&!this.myGameData.CheckCharacter(personajes.indiana))new dialogo(this, this.character,19, function(){
                self.IndianaImage.destroy();   
                self.myGameData.AddCharacter(new Personaje(personajes.indiana));
            })     
        })
        this.physics.add.overlap(this.character, this.Jhonny[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0&&!this.myGameData.CheckCharacter(personajes.johnny))new dialogo(this, this.character,20, function(){
                self.JhonnyImage.destroy();   
                self.myGameData.AddCharacter(new Personaje(personajes.johnny));
            })     
        })
        this.physics.add.overlap(this.character, this.SambaDoJudia[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0&&!this.myGameData.CheckCharacter(personajes.samba))new dialogo(this, this.character,21, function(){
                self.SambaDoJudiaImage.destroy();   
                self.myGameData.AddCharacter(new Personaje(personajes.samba));
            })     
        })
        this.physics.add.overlap(this.character, this.SaulJudman[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0&&!this.myGameData.CheckCharacter(personajes.saulJudman))new dialogo(this, this.character,22 , function(){
                self.SaulJudmanImage.destroy();   
                self.myGameData.AddCharacter(new Personaje(personajes.saulJudman));
            })     
        })


          this.cameras.main.startFollow(this.character);      
          this.cameras.main.zoom = 2.2;

        
        //Slimes
        let slimes = [
            new SlimeEnemigo(this, 50, 1, -1, 1412, 1250, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem25'),
            new SlimeEnemigo(this, 50, 1, 0, 1200, 1312, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem26'),
            new SlimeEnemigo(this, 50, 1, 1, 1376, 2048, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem27'),

            new SlimeEnemigo(this, 50, 1, 1, 2000, 2048, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem28'),
            new SlimeEnemigo(this, 50, 1, -1, 2336, 2064, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem29'),
            new SlimeEnemigo(this, 50, 1, 0, 2976, 2000, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem30'),

            new SlimeEnemigo(this, 50, 0, 1, 1984, 2338, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem31'),
            new SlimeEnemigo(this, 50, 0, 1, 2831, 2740, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem32'),
            new SlimeEnemigo(this, 50, 0, 1, 3022, 2694, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem33'),

            new SlimeEnemigo(this, 50, 0, 1, 3024, 3156, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem34'),
            new SlimeEnemigo(this, 50, 1, 1, 2476, 3152, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem35'),
            new SlimeEnemigo(this, 50, 1, -1, 2572, 3477, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem36'),

            new SlimeEnemigo(this, 50, 0, 1, 1943, 3040, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem37'),
            new SlimeEnemigo(this, 50, 1, -1, 1950, 3468, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem38'),
            new SlimeEnemigo(this, 50, 1, 0, 2345, 3962, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem39'),

            new SlimeEnemigo(this, 50, 1, 1, 1670, 2985, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem40'),
            new SlimeEnemigo(this, 50, 1, 1, 1333, 3470, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem41'),
            new SlimeEnemigo(this, 50, 1, 0, 1125, 3966, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem42'),

            new SlimeEnemigo(this, 50, 0, 1, 1097, 2297, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem43'),
            new SlimeEnemigo(this, 50, 1, 1, 880, 2064, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem44'),
            new SlimeEnemigo(this, 50, 1, 0, 1350, 2732, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem45'),

            new SlimeEnemigo(this, 50, 1, 1, 1108, 2958, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem46'),
            new SlimeEnemigo(this, 50, 1, 1, 880, 2064, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem47'),
            new SlimeEnemigo(this, 50, 1, 0, 757, 3473, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem48'),

            new SlimeEnemigo(this, 50, 1, -1, 703, 2867, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem49'),
            new SlimeEnemigo(this, 50, 1, -1, 487, 1744, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem50'),
            new SlimeEnemigo(this, 50, 0, 1, 322, 2955, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem51'),
            
            new SlimeEnemigo(this, 50, 0, 1, 321, 2088, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem52')
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
