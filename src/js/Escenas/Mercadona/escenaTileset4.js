import Character from "../../character.js";
import dialogo from "../../dialogo.js";
import { RAIZ_IMAGENES } from "../../constants.js";

export class EscenaTilesets4 extends Phaser.Scene {
    //cargar aqui los datos de la escena.
constructor(){
    super('escenaTilesets4')
}
init(data){
    this.myGameData = data.obj;
    this.cx = data.cx;  
    this.cy = data.cy;       
    this.dir = data.dir;  
}
    preload() {
        this.load.image('Frikol', RAIZ_IMAGENES+'OverworldCharacters/Frikol.png');
        this.load.tilemapTiledJSON('Almacen4', 'assets/json/Almacen4.json');
        this.load.image('tileset_mercadona', RAIZ_IMAGENES+'tilesets/tileset_mercadona.png');
        this.load.spritesheet('character', RAIZ_IMAGENES+'spritespjs/Main_char.png', {frameWidth: 28, frameHeight: 26})
    }

    //crear aqui los objetos de la escena
    create() {/*
        let screenWidth = this.game.config.width;
        let screenHeight = this.game.config.height;
        //Imagen 1
        this.image = this.add.image(screenWidth, screenHeight, 'javier'); //omg so sexy
        this.image.setScale(0.3);
        this.image.setPosition(screenWidth / 2, screenHeight / 2);*/
        this.map = this.make.tilemap({ 
            key: 'Almacen4', 
            tileWidth: 16, 
            tileHeight: 16 
          });
          this.interactKey = this.input.keyboard.addKey('E');
          this.interact = 1;
          const tileset1 = this.map.addTilesetImage('tileset_mercadona', 'tileset_mercadona');
          this.FloorLayer = this.map.createLayer('Suelo', tileset1);
          this.WallLayer = this.map.createLayer('Paredes', tileset1);
          this.WallLayer.setCollisionByExclusion([-1]);          
          this.hitbox1 = this.map.createFromObjects('Transiciones', {id:2});          
          this.hitbox2 = this.map.createFromObjects('Transiciones', {id:1});    
          this.physics.add.existing(this.hitbox1[0]);
          this.physics.add.existing(this.hitbox2[0]);

          this.hitboxFrikol = this.map.createFromObjects('Personajes', {id:3});   
          this.physics.add.existing(this.hitboxFrikol[0]);          
          this.Frikol = this.map.createFromObjects('Personajes', {name: "Frikol", key: 'Frikol' });                    

          this.character = new Character(this, this.cx, this.cy,this.dir);
          this.physics.world.enable(this.character);
          this.physics.add.collider(this.character, this.WallLayer);


          this.physics.add.overlap(this.character, this.hitbox1[0], ()=>{
            if(this.interact == 0) this.scene.start('escenaTilesets2',{obj:this.myGameData,cx:565, cy:120, dir:3});            
        })
        this.physics.add.overlap(this.character, this.hitbox2[0], ()=>{
            if(this.interact == 0) this.scene.start('escenaMercadona',{obj:this.myGameData,cx:645, cy:420, dir:1});            
        })
        this.physics.add.overlap(this.character, this.hitboxFrikol[0], ()=>{
            var self = this;
            if(!this.Texto&&this.interact == 0)new dialogo(this, this.character, ["Frikol: Em... Disculpa señor, pero este es un área restringida a los clientes...",
        "Judini: ¿Qué está pasando?", "Judini: Había una especie de monstruo en el almacén...", "Frikol: Ah, sí, esos bichos...", "Frikol:Desde que empezó el apocalipsis esos bichos han ido apareciendo y tomando el control del establecimiento", 
        "Frikol: Mis compañeros se han largado, pero yo sé muy bien que no recibimos nuestros 5 minutos de descanso hasta dentro de 30 minutos", "Frikol: Se lo diré al encargado cuando vuelva", 
        "Judini: Maldición, si quiero salvar el mundo tendré que abrirme paso entre todos esos monstruos, pero no se si podré hacerlo solo...", "Judini: Oye... ¿Me podrías ayudar a evitar el apocalipsis y salvar a la humanidad?",
        "Frikol: De hecho, somos judías, no humanos", "Judini: ...", "Judini: ¿Vas a venir o no?", "Frikol: Vale, supongo que no tengo nada mejor que hacer", "Frikol se ha unido al grupo"],
            function(){
                self.Frikol.visible = false;                
            })     
        })
        
        
          this.cameras.main.startFollow(this.character);      
          this.cameras.main.zoom = 2.2;

    }


    update() {   
        if(this.interactKey.isDown){
            this.interact = 0;
            
        }else{
            this.interact = 1;            
        }        
    }    
};
