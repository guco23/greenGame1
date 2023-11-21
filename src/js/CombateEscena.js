import { RAIZ_IMAGENES } from "./constants.js";
import { Enemigo } from "./Enemigo.js";
import { Personaje } from "./Personaje.js";
import { BarraVida } from "./HUDElems/BarraVida.js";

export class CombateEscena extends Phaser.Scene {
    //CombatManager combatManager;

    //cargar aqui los datos de la escena.
    preload() {
        //La escena va a recibir combat manager y a partir de sus datos va a crear la escena
        //Primero, tomará un array con los enemigos y los aliados a partir de los cuales creará los objetos en pantalla

        //Placeholders
        //Es importante que los sprites finales tengan la misma resolución
        //Esto finalmente deberán ser datos traídos del combat manager
        let aliados = ['javier.jpg', 'javier.jpg', 'javier.jpg', 'javier.jpg']; //En la version final sacará esto de combatManager
        let enemigos = ['furro.jpg', 'furro.jpg', 'profile.png', 'furro.jpg', 'furro.jpg']; //En la version final sacará esto de combatManager

        //Añade las imagenes a la escena como enemigo/aliado y el numero que ocupan en su array
        for (let i = 0; i < aliados.length; i++) {
            this.load.image('aliado' + i, RAIZ_IMAGENES + aliados[i]);
        }
        for (let i = 0; i < enemigos.length; i++) {
            this.load.image('enemigo' + i, RAIZ_IMAGENES + enemigos[i]);
        }
        //Carga el fondo, dependerá de la zona del juego en la que nos encontremos
        this.load.image('background', RAIZ_IMAGENES + "combatBackground/combatBackgroundPlaceholder.png");
    }

    //crear aqui los objetos de la escena
    create() {
        //Arrays declarados provisionales para guardar los objetos de la escena
        let aliados = [];
        aliados.push(new Personaje("Pablo", 0, 30, 20, 120, 110));
        aliados.push(new Personaje("Diego", 1, 30, 20, 120, 110));
        aliados.push(new Personaje("Jose", 2, 30, 20, 120, 110));
        aliados.push(new Personaje("Batman", 3, 30, 20, 120, 110));
        let enemigos = []; //En la version final sacará esto de combatManager
        enemigos.push(new Enemigo("Enemigo1", 0, 30, 20, 120, 110));
        enemigos.push(new Enemigo("Enemigo2", 1, 30, 20, 120, 110));
        enemigos.push(new Enemigo("Enemigo3", 2, 30, 20, 120, 110));
        enemigos.push(new Enemigo("Enemigo4", 3, 30, 20, 120, 110));
        enemigos.push(new Enemigo("Enemigo5", 4, 30, 20, 120, 110));

        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;

        //Coloca el fondo
        this.add.image(gameWidth / 2, gameHeight / 2,'background')
        //Coloca los sprites de los enemigos en la escena
        for (let i = 0; i < aliados.length; i++) {
            aliados[i] = this.add.image(gameWidth / 5, (gameHeight - gameHeight / 6)/  (aliados.length + 1) * (i + 1) - 50, 'aliado' + aliados[i].id)
            aliados[i].setScale(0.05);
        }
        for (let i = 0; i < enemigos.length; i++) {
            enemigos[i] = this.add.image(gameWidth - (gameWidth / 5), gameHeight /  (enemigos.length + 1) * (i + 1) , 'enemigo' + enemigos[i].id)
            enemigos[i].setScale(0.05);
        }

        //Creación de los cuadros del HUD
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x0033cc, 1);
        var hudBox1 = this.graphics.fillRoundedRect(2, gameHeight - 180, 250, 180, { tl: 12, tr: 12, bl: 0, br: 0 });
        var hudBox2 = this.graphics.fillRoundedRect(275, gameHeight - 180, 600, 180, { tl: 12, tr: 12, bl: 12, br: 12 });

        this.barrasVida = [];
        for (let i = 0; i < aliados.length; i++) { 
            this.barrasVida.push(new BarraVida(this, hudBox1.x, hudBox1.y, 100))
        }
    }

};
