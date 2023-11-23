import { RAIZ_IMAGENES } from "./constants.js";
import { Enemigo } from "./Combate JS/Enemigos/Enemigo.js"
import { Personaje } from "./Combate JS/Personajes/Personaje.js"
import { BarraVida } from "./HUDElems/BarraVida.js";
import { TextoVida } from "./HUDElems/TextoVida.js";
import { TextoDescriptivo } from "./HUDElems/TextoDescriptivo.js";
import { SelectorAcciones } from "./HUDElems/SelectorAcciones.js";

export class CombateEscena extends Phaser.Scene {
    //CombatManager combatManager;

    //cargar aqui los datos de la escena.
    preload() {
        //La escena va a recibir combat manager y a partir de sus datos va a crear la escena
        //Primero, tomará un array con los enemigos y los aliados a partir de los cuales creará los objetos en pantalla

        //Placeholders
        //Es importante que los sprites finales tengan la misma resolución
        //Esto finalmente deberán ser datos traídos del combat manager
        let imgaliados = ['javier.jpg', 'javier.jpg', 'javier.jpg', 'javier.jpg']; //En la version final sacará esto de combatManager
        let imgenemigos = ['furro.jpg', 'furro.jpg', 'profile.png', 'furro.jpg', 'furro.jpg']; //En la version final sacará esto de combatManager

        //Añade las imagenes a la escena como enemigo/aliado y el numero que ocupan en su array
        for (let i = 0; i < imgaliados.length; i++) {
            this.load.image('aliado' + i, RAIZ_IMAGENES + imgaliados[i]);
        }
        for (let i = 0; i < imgenemigos.length; i++) {
            this.load.image('enemigo' + i, RAIZ_IMAGENES + imgenemigos[i]);
        }
        //Carga el fondo, dependerá de la zona del juego en la que nos encontremos
        this.load.image('background', RAIZ_IMAGENES + "combatBackground/combatBackgroundPlaceholder.png");

        //Controles en combate
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown', function (event) {
            //Control
            if (event.code === "ArrowUp") {
                this.selectorAcciones.anterior();
            } else if (event.code === "ArrowDown") {
                this.selectorAcciones.siguiente();
            }
            else if (event.code === "Space" || event.code === "ArrowLeft") {
                //SELECCIONAR
                console.log("seleccionado" + this.selectorAcciones.selection);
            }
        }, this);
    }

    //crear aqui los objetos de la escena
    create() {
        this.graphics = this.add.graphics();
        //Arrays declarados provisionales para guardar los objetos de la escena
        //En la version final aliados y enemigos serán de combatManager
        this.aliados = [];
        this.aliados.push(new Personaje('Diego', 1, 30, 20, 120, 110));
        this.aliados.push(new Personaje('Pablo', 0, 30, 20, 140, 100));
        this.aliados.push(new Personaje('Jose', 2, 30, 20, 125, 1));
        this.aliados.push(new Personaje('Batman', 3, 30, 20, 120, 110));
        this.enemigos = [];
        this.enemigos.push(new Enemigo(0, 30, 20, 120, 110));
        this.enemigos.push(new Enemigo(1, 30, 20, 120, 110));
        this.enemigos.push(new Enemigo(2, 30, 20, 120, 110));
        this.enemigos.push(new Enemigo(3, 30, 20, 120, 110));
        this.enemigos.push(new Enemigo(4, 30, 20, 120, 110));

        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;
        let uiBoxHeight = gameHeight / 3.2;
        let uiBoxWidth = gameWidth / 3;
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);
        this.graphics.strokeRect(0, gameHeight - uiBoxHeight, uiBoxWidth, uiBoxHeight);
        this.graphics.fillRect(2, 150, 90, 100);
        this.graphics.strokeRect(95, 150, 90, 100);
        this.graphics.fillRect(95, 150, 90, 100);
        this.graphics.strokeRect(188, 150, 130, 100);
        this.graphics.fillRect(188, 150, 130, 100);
        //Coloca el fondo
        this.add.image(gameWidth / 2, gameHeight / 2, 'background')
        //Coloca los sprites de los enemigos en la escena, en la versión final los personajes contienen sprites y su funcionalidad
        for (let i = 0; i < this.aliados.length; i++) {
            this.add.image(gameWidth / 5, (gameHeight - gameHeight / 6) / (this.aliados.length + 1) * (i + 1) - 50, 'aliado' + this.aliados[i].id).setScale(0.05);
        }

        this.imgsEnem = [];
        for (let i = 0; i < this.enemigos.length; i++) {
            this.imgsEnem[i] = this.add.image(gameWidth - (gameWidth / 5), (gameHeight - gameHeight / 6) / (this.enemigos.length + 1) * (i + 1) - 40, 'enemigo' + this.enemigos[i].id).setScale(0.05);
        }

        //Creación de los cuadros del HUD
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x0033cc, 1);
        var hudBox1 = this.graphics.fillRoundedRect(2, gameHeight - 180, 270, 180, { tl: 12, tr: 12, bl: 0, br: 0 });
        var hudBox2 = this.graphics.fillRoundedRect(275, gameHeight - 180, 600, 180, { tl: 12, tr: 12, bl: 12, br: 12 });

        this.vidasAliados = [];
        for (let i = 0; i < this.aliados.length; i++) {
            let positionY = 440 + (i * 37);
            this.add.text(20, positionY, this.aliados[i].name);
            this.vidasAliados.push(new TextoVida(this, 120, positionY, this.aliados[i].maxHp, this.aliados[i].currentHp))
        }

        this.vidasEnemigos = [];
        for (let i = 0; i < this.enemigos.length; i++) {
            this.vidasEnemigos.push(new BarraVida(this, this.imgsEnem[i].x - 40, this.imgsEnem[i].y - 43, 80, 18, this.enemigos[i].maxHp))
        }
        //Prueba de la barra de vida
        this.vidasEnemigos[2].actualizarHp(25);

        this.textoDescriptivo = new TextoDescriptivo(this, 420, 440);
        this.selectorAcciones = new SelectorAcciones(this, 300, 440, this.textoDescriptivo);
    }

    OnKeyInput(event) {

    }
};
