//import {Scene} from 'phaser';
import Character from "../../character.js";
import { RAIZ_IMAGENES } from "../../constants.js";
import { RAIZ_IMGS_OVERWORLD} from "../../constants.js";
import GameData from "../../GameData.js";
import { enemies } from "../../../../assets/EnemyInfo/EnemiesDATA.js";
import SlimeEnemigo from "../../SlimeEnemigo.js"
import { Personaje } from "./../../Combate JS/Personajes/Personaje.js";
import { Protagonista } from "./../../Combate JS/Personajes/Protagonista.js"; //NTS ES AQUÍ EL CAMBIO
import { personajes } from "../../../../assets/CharactersInfo/CharactersDATA.js";
import { Item } from "../../Item.js"
import { items } from "../../../../assets/EquipItemDATA.js";
import { CONTROLES_OVERWORLD } from "../../constants.js";
import dialogo from "../../dialogo.js";

export class EscenaTilesets extends Phaser.Scene {
    //cargar aqui los datos de la escena.
    constructor() {
        super('escenaTilesets')
        this.myGameData = new GameData();
        this.cx = 50;
        this.cy = 110;
        this.dir = 2;
    }
    init(data) {
        if (data.obj != null) {
            this.myGameData = data.obj;
            this.cx = data.cx;
            this.cy = data.cy;
            this.dir = data.dir;
        }
    }

    preload() {        
        this.load.tilemapTiledJSON('Almacen1', 'assets/json/Almacen1.json');
        this.load.image('tileset_mercadona', RAIZ_IMAGENES+'tilesets/tileset_mercadona.png');
        this.load.image('Frikol', RAIZ_IMAGENES+RAIZ_IMGS_OVERWORLD+'/Frikol.png');
        this.load.image('Judini', RAIZ_IMAGENES+RAIZ_IMGS_OVERWORLD+'/Judini.png');
        this.load.image('JudioCaesar', RAIZ_IMAGENES+RAIZ_IMGS_OVERWORLD+'/JudioCaesar.png');
        this.load.image('MrBean', RAIZ_IMAGENES+RAIZ_IMGS_OVERWORLD+'/MrBean.png');
        this.load.image('Emmet', RAIZ_IMAGENES+RAIZ_IMGS_OVERWORLD+'/EmmetBeanckowski.png');
        this.load.image('Gato', RAIZ_IMAGENES+RAIZ_IMGS_OVERWORLD+'/FrijolConBotas.png');
        this.load.image('BealonMusk', RAIZ_IMAGENES+RAIZ_IMGS_OVERWORLD+'/BealonMusk.png');
        this.load.image('Greta', RAIZ_IMAGENES+RAIZ_IMGS_OVERWORLD+'/GretaJudberg.png');
        this.load.image('Rajoy', RAIZ_IMAGENES+RAIZ_IMGS_OVERWORLD+'/MarianoRajoy.png');
        this.load.image('Selena', RAIZ_IMAGENES+RAIZ_IMGS_OVERWORLD+'/SelenaBeamez.png');
        this.load.image('Albert', RAIZ_IMAGENES+RAIZ_IMGS_OVERWORLD+'/AlbertBeanstein.png');       
        this.load.image('Donald', RAIZ_IMAGENES+RAIZ_IMGS_OVERWORLD+'/DonaldBean.png');       
        this.load.image('Indiana', RAIZ_IMAGENES+RAIZ_IMGS_OVERWORLD+'/IndianaBeans.png');       
        this.load.image('Jhonny', RAIZ_IMAGENES+RAIZ_IMGS_OVERWORLD+'/JhonnyBean.png');       
        this.load.image('SambaDoJudia', RAIZ_IMAGENES+RAIZ_IMGS_OVERWORLD+'/SambaDoJudia.png');       
        this.load.image('SaulJudman', RAIZ_IMAGENES+RAIZ_IMGS_OVERWORLD+'/SaulJudman.png');       
        this.load.image('UI', RAIZ_IMAGENES+'UI_dialogo.png');
        this.load.spritesheet('Slime', RAIZ_IMAGENES+'Slime.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('character', RAIZ_IMAGENES+'spritespjs/Main_char.png', { frameWidth: 28, frameHeight: 26 });
        this.load.spritesheet('checkPoint',  RAIZ_IMAGENES+'Objetos/CheckPoint.png', {frameWidth: 32, frameHeight: 32});
    }

    //crear aqui los objetos de la escena
    create() {
        this.sound.stopAll();
        /*let screenWidth = this.game.config.width;
        let screenHeight = this.game.config.height;
        //Imagen 1
        this.image = this.add.image(screenWidth, screenHeight, 'javier'); //omg so sexy
        this.image.setScale(0.3);
        this.image.setPosition(screenWidth / 2, screenHeight / 2);*/
        
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
            key: 'Almacen1',
            tileWidth: 16,
            tileHeight: 16
        });
        this.timer = 0;
        this.interactKey = this.input.keyboard.addKey(CONTROLES_OVERWORLD.ACCEPT);
        this.interact = 1;
        const tileset1 = this.map.addTilesetImage('tileset_mercadona', 'tileset_mercadona');
        this.FloorLayer = this.map.createLayer('Suelo', tileset1);
        this.WallLayer = this.map.createLayer('Paredes', tileset1);
        this.WallLayer.setCollisionByExclusion([-1]);
        this.hitbox = this.map.createFromObjects('Cambio Escena Objetos', { id: 1 });
        this.physics.add.existing(this.hitbox[0]);
        this.Hitboxdialogo = this.map.createFromObjects('Dialogo', { id: 5 });
        this.physics.add.existing(this.Hitboxdialogo[0]);

        this.character = new Character(this, this.cx, this.cy, this.dir);
        this.physics.world.enable(this.character);
        this.physics.add.collider(this.character, this.WallLayer);
        this.Texto = false;


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

        this.physics.add.overlap(this.character, this.hitbox[0], () => {
            if (this.interact == 0) {                
                this.scene.start('escenaTilesets2', { obj: this.myGameData, cx: 30, cy: 110, dir: 2 });                                
                //this.scene.start('escenaPlaya',{obj:this.myGameData,cx:2285, cy:320, dir:3});
                //this.scene.start('escenaNuevosMinisterios',{obj:this.myGameData,cx:1820, cy:985, dir:0});            
                //this.scene.start('zonaFinal', { obj: this.myGameData, cx: 270, cy: 40, dir: 3 });                                
            }            
        })
        this.physics.add.overlap(this.character, this.Hitboxdialogo[0], () => {            
            if (this.interact == 0 && !this.Texto) {                
                new dialogo(this, this.character,48);
            }
        })


        this.cameras.main.startFollow(this.character);
        this.cameras.main.zoom = 2.2;
                
        let slimes = [
            new SlimeEnemigo(this, 0, 0, 0, 50, 140, undefined, [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem1')
        ];
        slimes.forEach(slime => {
            if(this.myGameData.CheckDefeated(slime.slimeId)) {
                slime.destroy();
            }
        });

        this.myGameData.AddCharacter(new Protagonista(personajes.protagonista)); //No te olvides de cambiarlo de vuelta al final
        /*
        this.myGameData.AddCharacter(new Protagonista(personajes.MrBean)); //No te olvides de cambiarlo de vuelta al final
        this.myGameData.AddCharacter(new Protagonista(personajes.albert)); //No te olvides de cambiarlo de vuelta al final
        this.myGameData.AddCharacter(new Protagonista(personajes.frikol)); //No te olvides de cambiarlo de vuelta al final
        this.myGameData.AddCharacter(new Protagonista(personajes.donald)); //No te olvides de cambiarlo de vuelta al final
        this.myGameData.AddCharacter(new Protagonista(personajes.emmet)); //No te olvides de cambiarlo de vuelta al final
        this.myGameData.AddCharacter(new Protagonista(personajes.greta)); //No te olvides de cambiarlo de vuelta al final
        this.myGameData.AddCharacter(new Protagonista(personajes.bealonMusk)); //No te olvides de cambiarlo de vuelta al final
        this.myGameData.AddCharacter(new Protagonista(personajes.indiana)); //No te olvides de cambiarlo de vuelta al final
        this.myGameData.AddCharacter(new Protagonista(personajes.johnny)); //No te olvides de cambiarlo de vuelta al final
        this.myGameData.AddCharacter(new Protagonista(personajes.judioCesar)); //No te olvides de cambiarlo de vuelta al final
        this.myGameData.AddCharacter(new Protagonista(personajes.frijolConBotas)); //No te olvides de cambiarlo de vuelta al final
        this.myGameData.AddCharacter(new Protagonista(personajes.samba)); //No te olvides de cambiarlo de vuelta al final
        this.myGameData.AddCharacter(new Protagonista(personajes.saulJudman)); //No te olvides de cambiarlo de vuelta al final
        this.myGameData.AddCharacter(new Protagonista(personajes.selena)); //No te olvides de cambiarlo de vuelta al final
        this.myGameData.AddCharacter(new Protagonista(personajes.rajoy)); //No te olvides de cambiarlo de vuelta al final

        this.myGameData.AñadeItemEquipable(items.armaduraBronce);
        this.myGameData.AñadeItemEquipable(items.armaduraDiamante);
*/

        if(!this.myGameData.Interactablehitboxes[8]){
            new dialogo(this, this.character,44) //Comentad si no queréis que os moleste durante el desarrollo
            this.myGameData.Interactablehitboxes[8] = true;
        }
        
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
