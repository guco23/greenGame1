import Character from "../../character.js";
import { RAIZ_IMAGENES } from "../../constants.js";
import {RAIZ_IMGS_OBJETOS} from "../../constants.js";
import dialogo from "../../dialogo.js";
import { personajes } from "../../../../assets/CharactersInfo/CharactersDATA.js";
import { Personaje } from "../../Combate JS/Personajes/Personaje.js";
import { CONTROLES_OVERWORLD } from "../../constants.js";
import { Comandante } from "../../Combate JS/Personajes/Comandante.js";
import { Emprendedor } from "../../Combate JS/Personajes/Emprendedor.js";
import { enemies } from "../../../../assets/EnemyInfo/EnemiesDATA.js";
import SlimeEnemigo from "../../SlimeEnemigo.js"


export class EscenaMercadona extends Phaser.Scene {
    //cargar aqui los datos de la escena.
    constructor() {
        super('escenaMercadona')        		
    }
    init(data) {
        this.myGameData = data.obj;
        this.cx = data.cx;
        this.cy = data.cy;
        this.dir = data.dir;
    }
    preload() {
        this.load.tilemapTiledJSON('SalaMercadona', 'assets/json/SalaMercadona.json');
        this.load.image('tileset_mercadona', RAIZ_IMAGENES + 'tilesets/tileset_mercadona.png');
        this.load.image('Notas', RAIZ_IMAGENES + RAIZ_IMGS_OBJETOS+'Notas.png');
        this.load.spritesheet('character', RAIZ_IMAGENES + 'spritespjs/Main_char.png', { frameWidth: 28, frameHeight: 26 })
        this.load.spritesheet('Slime', RAIZ_IMAGENES+'Slime.png', { frameWidth: 16, frameHeight: 16 });
    }

    create() {
        this.timer = 0;
        this.map = this.make.tilemap({
            key: 'SalaMercadona',
            tileWidth: 16,
            tileHeight: 16
        });
        this.interactKey = this.input.keyboard.addKey(CONTROLES_OVERWORLD.ACCEPT);
        this.interact = 1;
        const tileset1 = this.map.addTilesetImage('tileset_mercadona', 'tileset_mercadona');
        this.FloorLayer = this.map.createLayer('Suelo', tileset1);
        this.WallLayer = this.map.createLayer('Paredes', tileset1);
        this.WallLayer.setCollisionByExclusion([-1]);
        if(!this.myGameData.Interactablehitboxes[1])this.DoorJokeLayer = this.map.createLayer('ChisteDeLaPuerta', tileset1);
        if(!this.myGameData.CheckObjetoClave(0)) this.Nota1Im = this.add.image(364, 340, 'Notas');
        if(!this.myGameData.CheckObjetoClave(1)) this.Nota2Im = this.add.image(131, 340, 'Notas');
        if(!this.myGameData.CheckObjetoClave(2)) this.Nota3Im = this.add.image(353, 85, 'Notas');


        this.hitbox1 = this.map.createFromObjects('Transiciones', { id: 1 });
        this.physics.add.existing(this.hitbox1[0]);
        this.hitbox2 = this.map.createFromObjects('Transiciones', { id: 2 });
        this.physics.add.existing(this.hitbox2[0]);
        this.hitbox3 = this.map.createFromObjects('Transiciones', { id: 3 });
        this.physics.add.existing(this.hitbox3[0]);
        this.hitbox4 = this.map.createFromObjects('Transiciones', { id: 4 });
        this.physics.add.existing(this.hitbox4[0]);
        this.hitbox5 = this.map.createFromObjects('Transiciones', { id: 6 });
        this.physics.add.existing(this.hitbox5[0]);
        this.hitbox6 = this.map.createFromObjects('Bloqueo', { id: 9 });
        this.physics.add.existing(this.hitbox6[0]);
        this.Nota1 = this.map.createFromObjects('Items', { id: 10 });
        this.physics.add.existing(this.Nota1[0]);
        this.Nota2 = this.map.createFromObjects('Items', { id: 11 });
        this.physics.add.existing(this.Nota2[0]);
        this.Nota3 = this.map.createFromObjects('Items', { id: 12 });
        this.physics.add.existing(this.Nota3[0]);
        if(!this.myGameData.CheckCharacter(personajes.judioCesar)){
            this.JudioCesar = this.map.createFromObjects('Personajes', { id: 7 });
            this.physics.add.existing(this.JudioCesar[0]);
            this.JudioCaesarImage = this.add.image(735, 168, 'JudioCaesar');
        }
        if(!this.myGameData.CheckCharacter(personajes.MrBean)){
            this.MrBean = this.map.createFromObjects('Personajes', { id: 8 });
            this.physics.add.existing(this.MrBean[0]);
            this.MrBeanImage = this.add.image(190, 210, 'MrBean');
        }

        this.character = new Character(this, this.cx, this.cy, this.dir);
        this.physics.world.enable(this.character);
        this.physics.add.collider(this.character, this.WallLayer);
        this.Texto = false;

        this.NoWallLayer = this.map.createLayer('Paredes atravesables', tileset1); //Esta capa se coloca después para que esté por "encima" del jugador

        var self=this;
        this.physics.add.overlap(this.character, this.hitbox1[0], () => {
            if (this.interact == 0) this.scene.start('escenaTilesets4', { obj: this.myGameData, cx: 100, cy: 65, dir: 3 });
        })
        this.physics.add.overlap(this.character, this.hitbox2[0], () => {
            if (this.interact == 0) this.scene.start('escenaCajaFuerte', { obj: this.myGameData, cx: 55, cy: 170, dir: 1 });
        })
        this.physics.add.overlap(this.character, this.hitbox3[0], () => {
            if (this.interact == 0) this.scene.start('escenaCajaFuerte', { obj: this.myGameData, cx: 485, cy: 170, dir: 1 });
        })
        this.physics.add.overlap(this.character, this.hitbox5[0], () => {
            if (this.interact == 0) this.scene.start('escenaPlaya', { obj: this.myGameData, cx: 2285, cy: 320, dir: 3 });
        })
        this.physics.add.overlap(this.character, this.hitbox6[0], () => {
            if(!this.Texto){
                if(this.myGameData.CheckObjetoClave(3)){
                    //Aquí va el combate con libra y todo eso...
                }else{                    
                    new dialogo(this, this.character, 8,function(){
                        self.character.x = self.character.x + 5;
                    }) 
                }
            }
        })
        this.physics.add.overlap(this.character, this.hitbox4[0], ()=>{
            if(this.interact == 0 && !this.Texto) {
                if(this.myGameData.Interactablehitboxes[1]){
                    new dialogo(this, this.character, 7) 
                }else{
                    new dialogo(this, this.character, 1,function(){
                        self.DoorJokeLayer.visible = false;                                                                
                    }) 
                    this.myGameData.Interactablehitboxes[1] = true;
                }
                               
            }
        })
        this.physics.add.overlap(this.character, this.Nota1[0], () => {
            if (this.interact == 0 && !this.myGameData.CheckObjetoClave(0)) {
                new dialogo(this, this.character, 10);
                this.myGameData.AñadeObjetoClave(0);
                this.Nota1Im.destroy();
            }
        })
        this.physics.add.overlap(this.character, this.Nota2[0], () => {
            if (this.interact == 0 && !this.myGameData.CheckObjetoClave(1)) {
                new dialogo(this, this.character, 10);
                this.myGameData.AñadeObjetoClave(1);
                this.Nota2Im.destroy();
            }
        })
        this.physics.add.overlap(this.character, this.Nota3[0], () => {
            if (this.interact == 0 && !this.myGameData.CheckObjetoClave(2)) {
                new dialogo(this, this.character, 10);
                this.myGameData.AñadeObjetoClave(2);
                this.Nota3Im.destroy();
            }
        })
        this.physics.add.overlap(this.character, this.MrBean[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0&&!this.myGameData.CheckCharacter(personajes.MrBean))new dialogo(this, this.character, 4, function(){
                self.MrBeanImage.destroy();   
                self.myGameData.AddCharacter(new Emprendedor(personajes.MrBean));
            })     
        })
        this.physics.add.overlap(this.character, this.JudioCesar[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0&&!this.myGameData.CheckCharacter(personajes.judioCesar))new dialogo(this, this.character, 3, function(){
                self.JudioCaesarImage.destroy();   
                self.myGameData.AddCharacter(new Comandante(personajes.judioCesar));
            })     
        })

        this.cameras.main.startFollow(this.character);
        this.cameras.main.zoom = 2.2;

        let slimes = [
            new SlimeEnemigo(this, 65, 0, 1, 770, 421, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem2'),
            new SlimeEnemigo(this, 65, 0, 1, 740, 335, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem3'),
            new SlimeEnemigo(this, 65, 0, 1, 683, 246, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem4'),

            new SlimeEnemigo(this, 70, 1, -1, 435, 93, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem5'),
            new SlimeEnemigo(this, 110, 0, 1, 338, 206, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem6'),
            new SlimeEnemigo(this, 70, 1, 1, 426, 319, "pene de plastico", [enemies.libra, enemies.libra], this.WallLayer, this.character, this.myGameData, 'enem7')
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
