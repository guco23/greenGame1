import Character from "../../character.js";
import dialogo from "../../dialogo.js";
import { RAIZ_IMAGENES } from "../../constants.js";
import { Personaje } from "../../Combate JS/Personajes/Personaje.js";
import { personajes } from "../../../../assets/CharactersInfo/CharactersDATA.js";
import { enemies } from "../../../../assets/EnemyInfo/EnemiesDATA.js";
import SlimeEnemigo from "../../SlimeEnemigo.js"
import { CONTROLES_OVERWORLD } from "../../constants.js";

export class ZonaFinal extends Phaser.Scene {
    //cargar aqui los datos de la escena.
constructor(){
    super('zonaFinal')
}
init(data){
    this.myGameData = data.obj;
    this.cx = data.cx;  
    this.cy = data.cy;       
    this.dir = data.dir;  
}
    preload() {        
        this.load.tilemapTiledJSON('ZonaFinal', 'assets/json/ZonaFinal.json');
        this.load.image('tileset_nm', RAIZ_IMAGENES+'tilesets/tileset_nm.png');        
        this.load.spritesheet('character', RAIZ_IMAGENES+'spritespjs/Main_char.png', {frameWidth: 28, frameHeight: 26});                
        this.load.spritesheet('checkPoint',  RAIZ_IMAGENES+'Objetos/CheckPoint.png', {frameWidth: 32, frameHeight: 32});
    }

    //crear aqui los objetos de la escena
    create() {
        this.timer = 0;        

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
            key: 'ZonaFinal', 
            tileWidth: 16, 
            tileHeight: 16 
          });

        

          this.interactKey = this.input.keyboard.addKey(CONTROLES_OVERWORLD.ACCEPT);
          this.interact = 1;
          const tileset1 = this.map.addTilesetImage('tileset_nm', 'tileset_nm');                           
          this.FloorLayer = this.map.createLayer('Suelo', tileset1);
          this.WallLayer = this.map.createLayer('Paredes', tileset1);
          this.WallLayer.setCollisionByExclusion([-1]);          
                  
          this.hitbox1 = this.map.createFromObjects('Transiciones', {id:1});          
          this.physics.add.existing(this.hitbox1[0]);
          this.hitboxFinal = this.map.createFromObjects('BatallaFinal', {id:4});          
          this.physics.add.existing(this.hitboxFinal[0]);
            

        //Colisiones
        this.character = new Character(this, this.cx, this.cy,this.dir);
        this.physics.world.enable(this.character);
        this.physics.add.collider(this.character, this.WallLayer);

/*
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
*/

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
