import Character from "../../character.js";
import { RAIZ_IMAGENES } from "../../constants.js";
import dialogo from "../../dialogo.js";

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
        this.load.spritesheet('character', RAIZ_IMAGENES + 'spritespjs/Main_char.png', { frameWidth: 28, frameHeight: 26 })
    }

    create() {
        this.map = this.make.tilemap({
            key: 'SalaMercadona',
            tileWidth: 16,
            tileHeight: 16
        });
        this.interactKey = this.input.keyboard.addKey('E');
        this.interact = 1;
        const tileset1 = this.map.addTilesetImage('tileset_mercadona', 'tileset_mercadona');
        this.FloorLayer = this.map.createLayer('Suelo', tileset1);
        this.WallLayer = this.map.createLayer('Paredes', tileset1);
        this.DoorJokeLayer = this.map.createLayer('ChisteDeLaPuerta', tileset1);
        this.WallLayer.setCollisionByExclusion([-1]);

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
        this.JudioCesar = this.map.createFromObjects('Personajes', { id: 7 });
        this.physics.add.existing(this.JudioCesar[0]);
        this.JudioCaesarImage = this.add.image(735, 168, 'JudioCaesar');
        this.MrBean = this.map.createFromObjects('Personajes', { id: 8 });
        this.physics.add.existing(this.MrBean[0]);
        this.MrBeanImage = this.add.image(190, 210, 'MrBean');

        this.character = new Character(this, this.cx, this.cy, this.dir);
        this.physics.world.enable(this.character);
        this.physics.add.collider(this.character, this.WallLayer);
        this.Texto = false;

        this.NoWallLayer = this.map.createLayer('Paredes atravesables', tileset1); //Esta capa se coloca después para que esté por "encima" del jugador

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
        var self=this;
        this.physics.add.overlap(this.character, this.hitbox4[0], ()=>{
            if(this.interact == 0 && !this.Texto) {
                new dialogo(this, this.character, 1,function(){
                    self.DoorJokeLayer.visible = false;                                        
                })                
            }
        })
        this.physics.add.overlap(this.character, this.MrBean[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0)new dialogo(this, this.character, 4, function(){
                self.MrBeanImage.destroy();   
               // self.myGameData.AddCharacter(new Personaje(personajes.frikol));
            })     
        })
        this.physics.add.overlap(this.character, this.JudioCesar[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0)new dialogo(this, this.character, 3, function(){
                self.JudioCaesarImage.destroy();   
               // self.myGameData.AddCharacter(new Personaje(personajes.frikol));
            })     
        })

        this.cameras.main.startFollow(this.character);
        this.cameras.main.zoom = 2.2;

    }


    update() {
        if (this.interactKey.isDown) {
            this.interact = 0;

        } else {
            this.interact = 1;
        }
    }
};
