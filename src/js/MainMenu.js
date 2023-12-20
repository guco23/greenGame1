import { RAIZ_IMAGENES ,RAIZ_IMGS_CINEMATICS,CONTROLES_OVERWORLD} from "./constants.js";
import {RAIZ_SOUNDS,RAIZ_SOUNDS_MUSICA} from "./constants.js";


export class MainMenu extends Phaser.Scene {
    //cargar aqui los datos de la escena.
    constructor() {
        super('mainMenu')
    }
    preload() {        
        this.load.image('Logo', RAIZ_IMAGENES+'LOGO GREEN BEAN REDEMPTION.png');
        this.load.audio('musicIntroMenu', RAIZ_SOUNDS+RAIZ_SOUNDS_MUSICA +'MenuInicio.mp3')        
    }

    //crear aqui los objetos de la escena
    create() {
        this.interactKey = this.input.keyboard.addKey(CONTROLES_OVERWORLD.ACCEPT);
        this.sound.stopAll();
        const musicConfig = {
            mute: false,
            volume: 0.5,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.MainTheme = this.sound.add('musicIntroMenu');
        this.MainTheme.play(musicConfig);
        this.BackGround1 = this.add.image(450, 200, 'Logo');
        this.BackGround1.scale = 3;      
        
        this.myText = this.add.text(370, 450, "Presiona Z", { font: '"Press Start 2P"' });
        this.myText.scale = 3;
        this.myText = this.add.text(360, 550, "BerdEstudios, 2023", { font: '"Press Start 2P"' });
        this.myText.scale = 2;
    }
    update() {        
        if (this.interactKey.isDown) {                        
            this.scene.start('introCinematica');
        }
    }
};
