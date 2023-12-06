//import {Scene} from 'phaser';
import character from "./character.js"; 
import { RAIZ_IMAGENES } from "./constants.js";
import dialogo from "./dialogo.js";
import ObjetoClave from "./ObjetoClave.js";

export class EscenaTilesets extends Phaser.Scene {
    //cargar aqui los datos de la escena.
    constructor(){
        super('escenaTilesets')
        console.log("xd");
        if (this.myObjetoclave == null)
        this.myObjetoclave = new ObjetoClave();
    }
    init(data){
        if (data.obj != null){
            this.myObjetoclave = data.obj;
            console.log("tu mama 1");
        }
    }

    preload() {
        /*this.load.image('javier', RAIZ_IMAGENES + 'javier.jpg');
        this.upscaleval = 0.001;*/
        this.load.tilemapTiledJSON('Almacen1', 'src/json/Almacen1.json');
        this.load.image('tileset_mercadona', 'assets/images/tilesets/tileset_mercadona.png');
        this.load.image('UI', 'assets/images/UI_dialogo.png');
        this.load.spritesheet('character', 'assets/images/spritespjs/Main_char.png', {frameWidth: 28, frameHeight: 26})
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
          this.hitbox = this.map.createFromObjects('Cambio Escena Objetos', {id:1});
          this.physics.add.existing(this.hitbox[0]);
          this.Hitboxdialogo = this.map.createFromObjects('Dialogo', {id:5});
          this.physics.add.existing(this.Hitboxdialogo[0]);

          this.Char = new character(this, 70, 100);
          this.physics.world.enable(this.Char);
          this.physics.add.collider(this.Char, this.WallLayer);
          this.Texto = false;
          /*var self=this;
          var onCollision = function(){                   
            if(self.interact == 0) console.log("Hay colision");
            else console.log("No :C");
          }*/
          
          this.physics.add.overlap(this.Char, this.hitbox[0], ()=>{
            if(this.interact == 0) this.scene.start('escenaTilesets2', {obj:this.myObjetoclave});
        })
        this.physics.add.overlap(this.Char, this.Hitboxdialogo[0], ()=>{
            this.myObjetoclave. AñadeObjetoClave(1);
            if(this.interact == 0 && !this.Texto) {                
                new dialogo(this, this.Char, ["Queso", "Pimiento", "Pimsahbhsahbiento", "Pimientoaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"]);                
                this.Texto = true;
            }            
        })
                    
          this.cameras.main.startFollow(this.Char);      
          this.cameras.main.zoom = 2.2;

          /*var objetos = {
            this.Objets = [];
		this.Objets[0]={
            'Nombre': "Nota1",
            'Pillado': false,            
            };
            this.Objets[1]={
                'Nombre': "Nota2",
                'Pillado': false,            
            };
            this.Objets[2]={
                'Nombre': "Nota3",
                'Pillado': false,            
            };
            this.Objets[3]={
                'Nombre': "ValeCajaFuerte",
                'Pillado': false,            
            };
            this.Objets[4]={s
                'Nombre': "CajaDeHerramientas",
                'Pillado': false,            
            };
            this.Objets[5]={
                'Nombre': "Madera",
                'Pillado': false,            
            };
            this.Objets[6]={
                'Nombre': "PlanosPuente",
                'Pillado': false,            
            };
          }*/
            
    }


    update() {   
        if(this.interactKey.isDown){
            this.interact = 0;
        }else{
            this.interact = 1;            
        }       
        /*this.image.scale += this.upscaleval;
        if (this.image.scale > 0.6)
            this.upscaleval = -0.001;
        else if (this.image.scale < 0.2)
            this.upscaleval = 0.001;*/
    }    
};