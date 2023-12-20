import { RAIZ_IMAGENES ,RAIZ_IMGS_CINEMATICS,CONTROLES_OVERWORLD} from "./constants.js";
import {RAIZ_SOUNDS,RAIZ_SOUNDS_MUSICA} from "./constants.js";


export class FinalCinematica extends Phaser.Scene {
    //cargar aqui los datos de la escena.
    constructor() {
        super('finalCinematica')
    }
    preload() {   
        this.load.image('Fin1', RAIZ_IMAGENES+RAIZ_IMGS_CINEMATICS+'Fin1.png');
        this.load.image('Texto10', RAIZ_IMAGENES+RAIZ_IMGS_CINEMATICS+'Texto10.png');
        this.load.image('Texto11', RAIZ_IMAGENES+RAIZ_IMGS_CINEMATICS+'Texto11.png');
        this.load.image('Logo', RAIZ_IMAGENES+RAIZ_IMGS_CINEMATICS+'GREENBEAN.png');
        this.load.audio('musicFin', RAIZ_SOUNDS+RAIZ_SOUNDS_MUSICA+'Cinematica final.mp3')        
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
        this.MainTheme = this.sound.add('musicFin');
        this.MainTheme.play(musicConfig);
        
        this.Fin1 = this.add.image(450, 300, 'Fin1');
        this.Fin1.scale = 0.35;
        this.text = this.add.image(450, 100, 'Texto10');
        this.text.scale = 1.5   
        /*this.BackGround1 = this.add.image(0, 0, 'BackgroundCinematica');
        this.BackGround1.scale = 70;        
        this.Im1 = this.add.image(450, 200, 'Inicio1');
        this.Im1.scale = 10;
        this.text = this.add.image(450, 500, 'Texto1');
        this.text.scale = 1.5   */
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
                this.text = this.add.image(450, 100, 'Texto11');
                this.text.scale = 1.5;
            }
            if(this.Pos == 2){
                this.text.destroy();    
                this.Fin1.destroy();
                this.Im4 = this.add.image(450, 250, 'Logo');
                this.Im4.scale = 4;
                this.sound.stopAll();            
            }
            this.OldPos = this.Pos;
        }
    }
};
