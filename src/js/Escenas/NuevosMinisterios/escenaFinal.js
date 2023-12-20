import Character from "../../character.js";
import dialogo from "../../dialogo.js";
import {RAIZ_SOUNDS,RAIZ_SOUNDS_MUSICA} from "../../constants.js";
import { RAIZ_IMAGENES,RAIZ_IMGS_COMBAT } from "../../constants.js";
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
        this.load.image('jefeFinal', RAIZ_IMAGENES+RAIZ_IMGS_COMBAT+'final_boss.png');
        this.load.image('jefeFinal2', RAIZ_IMAGENES+RAIZ_IMGS_COMBAT+'final_boss_texto.png');        
        this.load.image('tileset_nm', RAIZ_IMAGENES+'tilesets/tileset_nm.png');        
        this.load.spritesheet('character', RAIZ_IMAGENES+'spritespjs/Main_char.png', {frameWidth: 28, frameHeight: 26});                
        this.load.spritesheet('checkPoint',  RAIZ_IMAGENES+'Objetos/CheckPoint.png', {frameWidth: 32, frameHeight: 32});
        this.load.audio('musicNM', RAIZ_SOUNDS+RAIZ_SOUNDS_MUSICA+'Nuevos ministerios.mp3')
    }

    //crear aqui los objetos de la escena
    create() {
        this.sound.stopAll();
        this.MainTheme = this.sound.add('musicNM')
        this.MainTheme.play();
        this.Final = false;
        this.Fase2 = false;
        this.Texto = false;
        this.imageBoss;
        this.PosBoss = 999;
        this.timer = 0;        
        this.HaLlegadoAlFinal = false;
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
          this.hitboxFinal2 = this.map.createFromObjects('BatallaFinal', {id:5});          
          this.physics.add.existing(this.hitboxFinal2[0]);
            

        //Colisiones
        this.character = new Character(this, this.cx, this.cy,this.dir);
        this.physics.world.enable(this.character);
        this.physics.add.collider(this.character, this.WallLayer);

        this.physics.add.overlap(this.character, this.hitbox1[0], () => {            
            if (this.interact == 0) {                
                this.scene.start('escenaNuevosMinisterios', { obj: this.myGameData, cx: 1663, cy: 4448, dir: 1 });
            }
        })
        
        this.physics.add.overlap(this.character, this.hitboxFinal[0], () => {            
            if(!this.HaLlegadoAlFinal){
                this.sound.stopAll();   
                this.HaLlegadoAlFinal = true;        
                this.PosBoss = 150;
                this.imageBoss = this.add.image(270, 0, 'jefeFinal');                           
            }
            
        })
        let self = this;
        this.physics.add.overlap(this.character, this.hitboxFinal2[0], () => {                     
            if(this.HaLlegadoAlFinal){
                this.HaLlegadoAlFinal = false;
                this.character.Activate();                
            }
            if(this.Final && !this.Texto){
                new dialogo(this, this.character, 46,function(){
                    self.scene.start('combatScene', {
                        gameData: self.myGameData,
                        enemigos: [enemies.meteoro, enemies.judas, enemies.meteoro],
                        objeto: items.armaduraDiamante,
                        scene: self.scene.key,
                        cx: self.character.x,
                        cy: self.character.y,
                        dir: self.character.dir,
                        id: "boss3"
                    });
                })
                this.Final = false;
            }else{
                if(this.Final && !this.Fase2){
                    this.Fase2 = true;
                    new dialogo(this, this.character, 51,function(){
                        self.scene.start('combatScene', {
                            gameData: self.myGameData,
                            enemigos: [enemies.hands, enemies.hands, enemies.finalBoss, enemies.hands, enemies.hands],
                            objeto: undefined,
                            scene: self.scene.key,
                            cx: self.character.x,
                            cy: self.character.y,
                            dir: self.character.dir,
                            id: "boss3"
                        });
                    })
                }else{
                    if(this.Fase2){
                        this.scene.start('finalCinematica');
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
        if(this.PosBoss <290) {            
            this.PosBoss+=0.5;
            this.imageBoss.setY(this.PosBoss);            
            if(this.PosBoss >=290) this.Final = true;
        }
    }    
};
