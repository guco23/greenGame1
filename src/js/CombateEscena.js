import { RAIZ_IMAGENES, CONTROLES, RAIZ_IMGS_COMBAT } from "./constants.js";
import { BarraVida } from "./HUDElems/BarraVida.js";
import {RAIZ_SOUNDS,RAIZ_SOUNDS_MUSICA} from "./constants.js";
import { TextoVida } from "./HUDElems/TextoVida.js";
import { TextoDescriptivo } from "./HUDElems/TextoDescriptivo.js";
import { DatosAccion, SelectorAcciones } from "./HUDElems/SelectorAcciones.js";
import { SelectorPersonajes } from "./HUDElems/SelectorPersonajes.js";
import { CombatManager } from "./Combate JS/CombatManager.js";
import { CharacterArray } from "./HUDElems/ScenePersonaje.js";

export class CombateEscena extends Phaser.Scene {
    //CombatManager combatManager;
    //cargar aqui los datos de la escena.
    constructor() {
        super('combatScene')
    }

    init(data) {
        this.gameData = data.gameData;
        this.enemigos = data.enemigos;
        this.objeto = data.objeto;
        this.aliados = data.gameData.party;
        this.partySize = data.gameData.partySize;
        //Variables necesarias para volver a la escena y posición en la que se estaba antes del combate
        this.cx = data.cx;
        this.cy = data.cy;
        this.cdir = data.dir;
        this.returnScene = data.scene;
        this.slimeId = data.id;
    }

    preload() {
        //Es importante que los sprites finales tengan la misma resolución

        //Añade las imagenes de los aliados y enemigos
        this.enemigos.forEach(enemigo => {
            this.load.image(enemigo.name + "C", RAIZ_IMAGENES + RAIZ_IMGS_COMBAT + enemigo.imgLink);
        });
        this.aliados.forEach(aliado => {
            this.load.image(aliado.name + "C", RAIZ_IMAGENES + RAIZ_IMGS_COMBAT + aliado.imgLink);
        });
        //Carga el fondo, dependerá de la zona del juego en la que nos encontremos
        this.load.image('background', RAIZ_IMAGENES + "combatBackground/combatBackgroundPlaceholder.png");
        this.load.image("selectorAccion", RAIZ_IMAGENES + 'seleccionAccion.png');
        this.load.image("selectorPersonaje", RAIZ_IMAGENES + 'seleccionPersonaje.png');
        this.load.audio('musicCombateSimple', RAIZ_SOUNDS+RAIZ_SOUNDS_MUSICA+'Combate contra enemigos.mp3')    }

    //crear aqui los objetos de la escena
    create() {
        this.sound.stopAll();
        this.MainTheme = this.sound.add('musicCombateSimple')
        this.MainTheme.play();
        this.graphics = this.add.graphics();

        this.combatManager = new CombatManager(this.enemigos, this.aliados, this.partySize, this);
        //Los aliados ya vienen contruídos desde gameData
        for (let i = 0; i < this.aliados.length; i++) {
            this.aliados[i].startCombat(this.combatManager);
        }
        //Construye los objetos enemigos y los inicializa en el combatManager
        for (let i = 0; i < this.enemigos.length; i++) {
            let myClass = this.enemigos[i].class;
            this.enemigos[i] = new myClass(this.enemigos[i], this.combatManager);
        }
        for (let i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].startCombat(this.combatManager);
        }

        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;

        //Coloca el fondo
        this.add.image(gameWidth / 2, gameHeight / 2, 'background');

        //esto es temporal para asignar una imagen que mostrar
        for (let i = 0; i < this.aliados.length; i++) {
            this.aliados[i].imgLink = this.aliados[i].name;
        }
        //Coloca los sprites de los enemigos en la escena, en la versión final los personajes contienen sprites y su funcionalidad
        this.sceneAliad = new CharacterArray(this, gameWidth / 9, 15, 400, false, this.aliados);
        this.sceneEnem = new CharacterArray(this, gameWidth - (gameWidth / 5), 30, 400, false, this.enemigos);

        //Creación de los cuadros del HUD
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x0033cc, 1);
        let hudBox1 = this.graphics.fillRoundedRect(2, gameHeight - 180, 270, 180, { tl: 12, tr: 12, bl: 0, br: 0 });
        let hudBox2 = this.graphics.fillRoundedRect(275, gameHeight - 180, 600, 180, { tl: 12, tr: 12, bl: 12, br: 12 });

        this.vidasAliados = [];
        for (let i = 0; i < this.aliados.length; i++) {
            let positionY = 440 + (i * 37);
            this.nombresAliados = this.add.text(20, positionY, this.aliados[i].name);
            this.vidasAliados.push(new TextoVida(this, 120, positionY, this.aliados[i]));
        }

        this.vidasEnemigos = [];
        for (let i = 0; i < this.enemigos.length; i++) {
            this.vidasEnemigos.push(new BarraVida(this, this.sceneEnem.array[i].img.x + this.sceneEnem.array[i].img.width / 2 + 2, this.sceneEnem.array[i].img.y - 10, 80, 18, this.enemigos[i]))
        }
        //Los datos para crear la lista del selector acciones
        let datosAcciones = [new DatosAccion("Atacar", "Ataque básico a un objetivo"),
        new DatosAccion("Habilidad", ""), //Esta cambiará en cada turno (mostrando la descripción de la habilidad del personaje)
        new DatosAccion("Defender", "Reduce el daño recibido hasta el siguiente turno")];

        this.textoDescriptivo = new TextoDescriptivo(this, 420, 440);
        this.selectorAcciones = new SelectorAcciones(this, this.textoDescriptivo, 310, 440, 40, datosAcciones);
        this.selectorEnemigos = new SelectorPersonajes(this, this.enemigos, this.sceneEnem.array);
        this.selectorAliados = new SelectorPersonajes(this, this.aliados, this.sceneAliad.array);

        this.selectorAliados.ocultar();
        this.selectorEnemigos.ocultar();
        this.selectorAcciones.mostrar();
        this.selectorAcciones.activar();

        this.menuActual = this.selectorAcciones;

        //Controles en combate
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown', function (event) {
            //Control
            if (this.menuActual != this.textoDescriptivo) {
                if (event.code === CONTROLES.UP) {
                    this.menuActual.anterior();
                }
                else if (event.code === CONTROLES.DOWN) {
                    this.menuActual.siguiente();
                }
                else if (event.code === CONTROLES.CANCEL) {
                    this.menuActual.ocultar();
                    this.menuActual = this.selectorAcciones;
                    this.menuActual.mostrar();
                    this.menuActual.activar();
                }
                else if (event.code === CONTROLES.ACCEPT) {
                    if (this.menuActual === this.selectorAcciones) {
                        if (this.menuActual.selection === 0) {
                            this.selectorAcciones.ocultar();
                            this.menuActual = this.selectorEnemigos;
                            this.menuActual.seleccionNormal();
                            this.menuActual.mostrar();
                        }
                        else if (this.menuActual.selection === 1) {
                            //Llamas al combat manager para pedir la info de la habilidad especial y activas el menu correspondiente
                            if(this.combatManager.spPoints > 0) {
                                this.selectorAcciones.ocultar();
                                this.SpecialHabilityTarget(this.combatManager.specialRequestInfo());
                            }
                            else {
                                //Poner comentario de que no tienes SP
                            }
                        }
                        else {
                            this.selectorAcciones.ocultar();
                            this.menuActual = this.selectorAliados;
                            this.selectorAliados.seleccionPredefinida(this.combatManager.current);
                        }
                    }
                    else {
                        if (this.selectorAcciones.selection === 0) {
                            //Llamar al combat manager con ataque
                            this.combatManager.doAction(0, this.menuActual.getSelection());
                        }
                        if (this.selectorAcciones.selection === 1) {
                            this.combatManager.doAction(1, this.menuActual.getSelection());
                        }
                        if (this.selectorAcciones.selection === 2) {
                            this.combatManager.doAction(2, -1); //No importa el target, la defensa es solo para el current personaje
                        }
                    }
                    //SELECCIONAR
                    //Llamada al combatmanager para hacer sus cositas menuActual.selection contiene el indice del elemento en el menu
                    //para SelectorAcciones 0 = Atacar, 1 = Habilidad, 2 = Defender
                    //para SelectorEnemigos es el indice propio del array de enemigos
                }
            }
            else {
                if (event.code === CONTROLES.ACCEPT) {
                    this.textoDescriptivo.aplicarTexto(""); //Vacía el texto
                    this.combatManager.nextTurn();
                }
            }
        }, this);
        this.ActualizarEscena();
        this.combatManager.nextTurn();
    }

    /**
     * A ser llamado cuando el jugador gana el combate. Deberá devolver al jugador al mismo lugar donde estaba antes del combate.
     */
    Victory() {
        this.gameData.AddDefeated(this.slimeId);
        this.scene.start(this.returnScene, { obj: this.gameData, cx: this.cx, cy: this.cy, dir: this.cdir })
    }
    /**
     * A ser llamado cuando el jugador pierda el combate. Deberá devolver al jugador al último checkpoint.
     */
    Defeat() {

    }

    ActualizarEscena(info) {
        if (this.combatManager.endCombat) {
            if (this.combatManager.endCombatVictory)
                this.Victory();
            else if (this.combatManager.endCombatDerrota)
                this.Defeat();
        }
        else {
            if (this.menuActual != this.textoDescriptivo) {
                this.menuActual.ocultar();
                this.menuActual = this.textoDescriptivo;
            }
            this.menuActual.aplicarTexto(info);
            this.menuActual.visible(1);
            //Actualiza ambas las barras/textos de vida de los enemigos y aliados respectivamente
            this.vidasEnemigos.forEach(element => {
                element.actualizarHp();
            });
            this.vidasAliados.forEach(element => {
                element.actualizarHp();
            });
            this.selectorAliados.refresh();
            this.selectorEnemigos.refresh();
            //Comprueba si el enemigo ha muerto, en cuyo caso oculta la imagen
            this.sceneAliad.refresh();
            this.sceneEnem.refresh();
            let current = this.combatManager.current;
            if (current < this.combatManager.livingParty)
                this.selectorAcciones.updateAction(1, "Habilidad", this.aliados[current].descripcionHabilidad);
        }
    }

    SpecialHabilityTarget(tipo) {
        switch (tipo) {
            case 0:
                this.menuActual = this.selectorEnemigos;
                this.menuActual.seleccionNormal();
                this.menuActual.mostrar();
                break;
            case 1:
                this.menuActual = this.selectorAliados;
                this.menuActual.seleccionNormal();
                this.menuActual.mostrar();
                break;
            case 2:
                this.menuActual = this.selectorEnemigos;
                this.menuActual.seleccionCompleta();
                this.menuActual.mostrar();
                break;
            case 3:
                this.menuActual = this.selectorAliados;
                this.menuActual.seleccionCompleta();
                this.menuActual.mostrar();
                break;
            case 4:
                this.menuActual = this.selectorAliados;
                this.menuActual.seleccionPredefinida(this.combatManager.current);
                break;
        }
    }
};
