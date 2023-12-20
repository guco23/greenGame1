import { RAIZ_IMAGENES ,RAIZ_IMGS_CINEMATICS,CONTROLES_OVERWORLD} from "./constants.js";
import {RAIZ_SOUNDS,RAIZ_SOUNDS_MUSICA} from "./constants.js";


export class IntroCinematica extends Phaser.Scene {
    //cargar aqui los datos de la escena.
    constructor() {
        super('introCinematica')
    }
    preload() {        
        this.load.image('BackgroundCinematica', RAIZ_IMAGENES+RAIZ_IMGS_CINEMATICS+'Background.png');
        this.load.image('Background2Cinematica', RAIZ_IMAGENES+RAIZ_IMGS_CINEMATICS+'Background2.jpg');
        this.load.image('Inicio1', RAIZ_IMAGENES+RAIZ_IMGS_CINEMATICS+'Inicio1.png');
        this.load.image('Inicio2', RAIZ_IMAGENES+RAIZ_IMGS_CINEMATICS+'Inicio2.png');
        this.load.image('Inicio3', RAIZ_IMAGENES+RAIZ_IMGS_CINEMATICS+'Inicio3.png');
        this.load.image('Texto1', RAIZ_IMAGENES+RAIZ_IMGS_CINEMATICS+'Texto1.png');
        this.load.image('Texto2', RAIZ_IMAGENES+RAIZ_IMGS_CINEMATICS+'Texto2.png');
        this.load.image('Texto3', RAIZ_IMAGENES+RAIZ_IMGS_CINEMATICS+'Texto3.png');
        this.load.image('Texto4', RAIZ_IMAGENES+RAIZ_IMGS_CINEMATICS+'Texto4.png');
        this.load.image('Texto5', RAIZ_IMAGENES+RAIZ_IMGS_CINEMATICS+'Texto5.png');
        this.load.image('Texto6', RAIZ_IMAGENES+RAIZ_IMGS_CINEMATICS+'Texto6.png');
        this.load.image('Texto7', RAIZ_IMAGENES+RAIZ_IMGS_CINEMATICS+'Texto7.png');
        this.load.image('Texto8', RAIZ_IMAGENES+RAIZ_IMGS_CINEMATICS+'Texto8.png');
        this.load.image('Texto9', RAIZ_IMAGENES+RAIZ_IMGS_CINEMATICS+'Texto9.png');
        this.load.image('Logo', RAIZ_IMAGENES+RAIZ_IMGS_CINEMATICS+'GREENBEAN.png');
        this.load.audio('musicIntro', RAIZ_SOUNDS+RAIZ_SOUNDS_MUSICA+'Cinematica inicial.mp3')        
    }

    //crear aqui los objetos de la escena
    create() {
        this.interactKey = this.input.keyboard.addKey(CONTROLES_OVERWORLD.ACCEPT);
        this.timer = 0;
        this.Pos = 0;
        this.OldPos = 0;
        this.sound.stopAll();
        const musicConfig = {
            mute: false,
            volume: 0.5,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.MainTheme = this.sound.add('musicIntro');
        this.MainTheme.play(musicConfig);
        this.BackGround1 = this.add.image(0, 0, 'BackgroundCinematica');
        this.BackGround1.scale = 70;        
        this.Im1 = this.add.image(450, 200, 'Inicio1');
        this.Im1.scale = 10;
        this.text = this.add.image(450, 500, 'Texto1');
        this.text.scale = 1.5
        //this.Im2 = this.add.image(450, 200, 'Inicio2');
        //this.Im2.scale = 10;
        //this.BackGround2 = this.add.image(0, 100, 'Background2Cinematica');
        //this.Im3 = this.add.image(450, 350, 'Inicio3');
        //this.Im3.scale = 8;        
    }
    update() {        
        if (this.interactKey.isDown) {                        
            if(this.timer==0){
                this.Pos++;          
                this.timer = 25;                
            }
        } else {                        
            if(this.timer >0) this.timer--;
        }        
        if(this.OldPos != this.Pos){
            if(this.Pos == 1) {
                this.text.destroy();
                this.text = this.add.image(450, 500, 'Texto2');
                this.text.scale = 1.5;
            }
            if(this.Pos == 2){
                this.Im1.destroy();
                this.Im2 = this.add.image(450, 200, 'Inicio2');
                this.Im2.scale = 10;
                this.text.destroy();
                this.text = this.add.image(450, 500, 'Texto3');
                this.text.scale = 1.5;
            }
            if(this.Pos == 3){
                this.text.destroy();
                this.text = this.add.image(450, 500, 'Texto4');
                this.text.scale = 1.5;
            }
            if(this.Pos == 4){
                this.text.destroy();
                this.text = this.add.image(450, 500, 'Texto5');
                this.text.scale = 1.5;
            }            
            if(this.Pos == 5){
                this.Im2.destroy();
                this.BackGround1.destroy();
                this.BackGround2 = this.add.image(0, 100, 'Background2Cinematica');
                this.Im3 = this.add.image(450, 350, 'Inicio3');
                this.Im3.scale = 8; 
                this.text.destroy(); 
                this.text = this.add.image(450, 500, 'Texto6');
                this.text.scale = 1.5;
            }
            if(this.Pos == 6){
                this.BackGround2.destroy();
                this.Im3.destroy();
                this.text.destroy();
                this.text = this.add.image(450, 500, 'Texto7');
                this.text.scale = 1.5;
            }
            if(this.Pos == 7){
                this.Im1 = this.add.image(450, 200, 'Inicio1');
                this.Im1.scale = 10;
                this.text.destroy();
                this.text = this.add.image(450, 500, 'Texto8');
                this.text.scale = 1.5;
            }
            if(this.Pos == 8){                
                this.text.destroy();
                this.text = this.add.image(450, 500, 'Texto9');
                this.text.scale = 1.5;
            }
            if(this.Pos == 9){  
                this.text.destroy();         
                this.Im1.destroy();     
                this.Im4 = this.add.image(450, 250, 'Logo');
                this.Im4.scale = 4;
                this.sound.stopAll();
            }
            if(this.Pos == 10){
                this.scene.start('escenaTilesets');
            }


            this.OldPos = this.Pos;
        }
    }
};
