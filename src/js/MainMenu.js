import { RAIZ_IMAGENES ,RAIZ_IMGS_CINEMATICS,CONTROLES_OVERWORLD} from "./constants.js";
import {RAIZ_SOUNDS,RAIZ_SOUNDS_MUSICA} from "./constants.js";


export class MainMenu extends Phaser.Scene {
    //cargar aqui los datos de la escena.
    constructor() {
        super('mainMenu')
    }
    preload() {        
        this.load.image('Logo', RAIZ_IMAGENES+'LOGO GREEN BEAN REDEMPTION.png');
        this.load.audio('musicIntro', RAIZ_SOUNDS+RAIZ_SOUNDS_MUSICA +'Cinematica inicial.mp3')        
    }

    //crear aqui los objetos de la escena
    create() {
        this.interactKey = this.input.keyboard.addKey(CONTROLES_OVERWORLD.ACCEPT);
        this.sound.stopAll();
        this.MainTheme = this.sound.add('musicIntro')
        this.MainTheme.play();
        this.BackGround1 = this.add.image(450, 200, 'Logo');
        this.BackGround1.scale = 3;      
        
        this.myText = this.add.text(370, 500, "Presiona Z", { font: '"Press Start 2P"' });
        this.myText.scale = 3;
    }
    update() {        
        if (this.interactKey.isDown) {                        
            this.scene.start('introCinematica');
        }
    }
};
