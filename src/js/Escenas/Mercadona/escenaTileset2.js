import Character from "../../character.js";
import { RAIZ_IMAGENES } from "../../constants.js";
import { enemies } from "../../../../assets/EnemyInfo/EnemiesDATA.js";
import dialogo from "../../dialogo.js";
import SlimeEnemigo from "../../SlimeEnemigo.js"
import { CONTROLES_OVERWORLD } from "../../constants.js";

export class EscenaTilesets2 extends Phaser.Scene {
    //cargar aqui los datos de la escena.
    constructor() {
        super('escenaTilesets2')
    }
    preload() {
        /*this.load.image('javier', RAIZ_IMAGENES + 'javier.jpg');
        this.upscaleval = 0.001;*/
        this.load.tilemapTiledJSON('Almacen2', 'assets/json/Almacen2.json');
        this.load.image('tileset_mercadona', RAIZ_IMAGENES+'tilesets/tileset_mercadona.png');
        this.load.spritesheet('character', RAIZ_IMAGENES+'spritespjs/Main_char.png', { frameWidth: 28, frameHeight: 26 })
    }

    init(data) {
        this.myGameData = data.obj;
        this.cx = data.cx;
        this.cy = data.cy;
        this.dir = data.dir;

    }

    //crear aqui los objetos de la escena
    create() {
        this.map = this.make.tilemap({
            key: 'Almacen2',
            tileWidth: 16,
            tileHeight: 16
        });
        this.interactKey = this.input.keyboard.addKey(CONTROLES_OVERWORLD.ACCEPT);
        this.timer = 0;
        this.interact = 1;
        const tileset1 = this.map.addTilesetImage('tileset_mercadona', 'tileset_mercadona');
        this.FloorLayer = this.map.createLayer('Suelo', tileset1);
        this.WallLayer = this.map.createLayer('Paredes', tileset1);
        this.WallLayer.setCollisionByExclusion([-1]);
        this.hitbox1 = this.map.createFromObjects('Transiciones', { id: 4 });
        this.physics.add.existing(this.hitbox1[0]);
        this.hitbox2 = this.map.createFromObjects('Transiciones', { id: 3 });
        this.physics.add.existing(this.hitbox2[0]);
        this.hitbox3 = this.map.createFromObjects('Transiciones', { id: 2 });
        this.physics.add.existing(this.hitbox3[0]);
        this.hitbox4 = this.map.createFromObjects('TransicionesFalsas', { id: 5 });
        this.physics.add.existing(this.hitbox4[0]);
        this.hitbox5 = this.map.createFromObjects('TransicionesFalsas', { id: 6 });
        this.physics.add.existing(this.hitbox5[0]);
        this.hitbox6 = this.map.createFromObjects('TransicionesFalsas', { id: 7 });
        this.physics.add.existing(this.hitbox6[0]);
        this.hitbox7 = this.map.createFromObjects('TransicionesFalsas', { id: 8 });
        this.physics.add.existing(this.hitbox7[0]);
        this.hitbox8 = this.map.createFromObjects('TransicionesFalsas', { id: 9 });
        this.physics.add.existing(this.hitbox8[0]);
        this.hitbox9 = this.map.createFromObjects('TransicionesFalsas', { id: 10 });
        this.physics.add.existing(this.hitbox9[0]);
        this.hitbox10 = this.map.createFromObjects('TransicionesFalsas', { id: 11 });
        this.physics.add.existing(this.hitbox10[0]);

        this.character = new Character(this, this.cx, this.cy, this.dir);
        this.physics.world.enable(this.character);
        this.physics.add.collider(this.character, this.WallLayer);
        this.physics.add.overlap(this.character, this.hitbox1[0], () => {
            if (this.interact == 0) this.scene.start('escenaTilesets', { obj: this.myGameData, cx: 105, cy: 110, dir: 0 });
        })
        this.physics.add.overlap(this.character, this.hitbox3[0], () => {
            if (this.interact == 0) this.scene.start('escenaTilesets4', { obj: this.myGameData, cx: 165, cy: 162, dir: 1 });
        })
        
        this.physics.add.overlap(this.character, this.hitbox2[0], () => {            
            if (!this.Texto && this.interact == 0) {                
                this.scene.start('escenaTilesets3', { obj: this.myGameData, cx: 70, cy: 70, dir: 3 });
            }
        })
        this.physics.add.overlap(this.character, this.hitbox4[0], () => {
            if (!this.Texto && this.interact == 0) {                                
                if(this.myGameData.Interactablehitboxes[3] > 7){
                    new dialogo(this, this.character,30);                                      
                }else{                    
                    new dialogo(this, this.character,23 + this.myGameData.Interactablehitboxes[3]);
                    this.myGameData.Interactablehitboxes[3]++;
                }
            }
        })
        this.physics.add.overlap(this.character, this.hitbox5[0], () => {
            if (!this.Texto && this.interact == 0) {                
                if(this.myGameData.Interactablehitboxes[3] > 7){
                    new dialogo(this, this.character,30);                                      
                }else{                    
                    new dialogo(this, this.character,23 + this.myGameData.Interactablehitboxes[3]);
                    this.myGameData.Interactablehitboxes[3]++;
                }
            }
        })
        this.physics.add.overlap(this.character, this.hitbox6[0], () => {
            if (!this.Texto && this.interact == 0) {                
                if(this.myGameData.Interactablehitboxes[3] > 7){
                    new dialogo(this, this.character,30);                                      
                }else{                    
                    new dialogo(this, this.character,23 + this.myGameData.Interactablehitboxes[3]);
                    this.myGameData.Interactablehitboxes[3]++;
                }
            }
        })
        this.physics.add.overlap(this.character, this.hitbox7[0], () => {
            if (!this.Texto && this.interact == 0) {                
                if(this.myGameData.Interactablehitboxes[3] > 7){
                    new dialogo(this, this.character,30);                                      
                }else{                    
                    new dialogo(this, this.character,23 + this.myGameData.Interactablehitboxes[3]);
                    this.myGameData.Interactablehitboxes[3]++;
                }
            }
        })
        this.physics.add.overlap(this.character, this.hitbox8[0], () => {
            if (!this.Texto && this.interact == 0) {                
                if(this.myGameData.Interactablehitboxes[3] > 7){
                    new dialogo(this, this.character,30);                                      
                }else{                    
                    new dialogo(this, this.character,23 + this.myGameData.Interactablehitboxes[3]);
                    this.myGameData.Interactablehitboxes[3]++;
                }
            }
        })
        this.physics.add.overlap(this.character, this.hitbox9[0], () => {
            if (!this.Texto && this.interact == 0) {                
                if(this.myGameData.Interactablehitboxes[3] > 7){
                    new dialogo(this, this.character,30);                                      
                }else{                    
                    new dialogo(this, this.character,23 + this.myGameData.Interactablehitboxes[3]);
                    this.myGameData.Interactablehitboxes[3]++;
                }
            }
        })
        this.physics.add.overlap(this.character, this.hitbox10[0], () => {
            if (!this.Texto && this.interact == 0) {                
                if(this.myGameData.Interactablehitboxes[3] > 7){
                    new dialogo(this, this.character,30);                                      
                }else{                    
                    new dialogo(this, this.character,23 + this.myGameData.Interactablehitboxes[3]);
                    this.myGameData.Interactablehitboxes[3]++;
                }
            }
        })

        this.cameras.main.startFollow(this.character);
        this.cameras.main.zoom = 2.2;

        let slimes = [
            new SlimeEnemigo(this, 100, 1, 1, 427, 117, "item de prueba", [enemies.botella], this.WallLayer, this.character, this.myGameData, 'enem1')
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
