//import {Scene} from 'phaser';
import Character from "../../character.js";
import { RAIZ_IMAGENES } from "../../constants.js";
import { RAIZ_IMGS_OVERWORLD} from "../../constants.js";
import GameData from "../../GameData.js";
import { enemies } from "../../../../assets/EnemyInfo/EnemiesDATA.js";
import SlimeEnemigo from "../../SlimeEnemigo.js"
import { Personaje } from "./../../Combate JS/Personajes/Personaje.js";
import { personajes } from "../../../../assets/CharactersInfo/CharactersDATA.js";

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
        this.load.image('UI', RAIZ_IMAGENES+'UI_dialogo.png');
        this.load.spritesheet('Slime', RAIZ_IMAGENES+'Slime.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('character', RAIZ_IMAGENES+'spritespjs/Main_char.png', { frameWidth: 28, frameHeight: 26 })
    }

    //crear aqui los objetos de la escena
    create() {
        /*let screenWidth = this.game.config.width;
        let screenHeight = this.game.config.height;
        //Imagen 1
        this.image = this.add.image(screenWidth, screenHeight, 'javier'); //omg so sexy
        this.image.setScale(0.3);
        this.image.setPosition(screenWidth / 2, screenHeight / 2);*/
        this.map = this.make.tilemap({
            key: 'Almacen1',
            tileWidth: 16,
            tileHeight: 16
        });
        this.interactKey = this.input.keyboard.addKey('E');
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
        /*var self=this;
        var onCollision = function(){                   
          if(self.interact == 0) console.log("Hay colision");
          else console.log("No :C");
        }*/

        this.physics.add.overlap(this.character, this.hitbox[0], () => {
            if (this.interact == 0) {
                //this.scene.start('escenaTilesets2', { obj: this.myGameData, cx: 30, cy: 110, dir: 2 });                                
                this.scene.start('escenaPlaya',{obj:this.myGameData,cx:2285, cy:320, dir:3});
            }
        })
        this.physics.add.overlap(this.character, this.Hitboxdialogo[0], () => {
            this.myGameData.AñadeObjetoClave(1);
            if (this.interact == 0) {                
            }
        })


        this.cameras.main.startFollow(this.character);
        this.cameras.main.zoom = 2.2;
                
        let slimes = [
            new SlimeEnemigo(this, 0, 0, 0, 50, 140, "pene de plastico", [enemies.botella, enemies.cocacola, enemies.pollo], this.WallLayer, this.character, this.myGameData, 'enem1')
        ];
        slimes.forEach(slime => {
            if(this.myGameData.CheckDefeated(slime.slimeId)) {
                slime.destroy();
            }
        });

        //Datos de party de prueba
        this.myGameData.AddCharacter(new Personaje(personajes.protagonista));
        this.myGameData.AddCharacter(new Personaje(personajes.frikol));
        this.myGameData.AddCharacter(new Personaje(personajes.protagonista));
        this.myGameData.AddCharacter(new Personaje(personajes.protagonista));
        this.myGameData.AddCharacter(new Personaje(personajes.protagonista));

    }


    update() {
        if (this.interactKey.isDown) {
            this.interact = 0;
        } else {
            this.interact = 1;
        }
        /*this.image.scale += this.upscaleval;
        if (this.image.scale > 0.6)
            this.upscaleval = -0.001;
        else if (this.image.scale < 0.2)
            this.upscaleval = 0.001;*/
    }
};
