export class CombateEscena extends Phaser.Scene {
    //CombatManager combatManager;

    //cargar aqui los datos de la escena.
    preload() {
        //La escena va a recibir combat manager y a partir de sus datos va a crear la escena
        //Primero, tomará un array con los enemigos y los aliados a partir de los cuales creará los objetos en pantalla

        //Placeholders
        let aliados = ['./images/javier.jpg', './images/javier.jpg', './images/javier.jpg', './images/javier.jpg']; //En la version final sacará esto de combatManager
        let enemigos = ['../images/furro.jpg', '../images/furro.jpg', '../images/furro.jpg', '../images/furro.jpg']; //En la version final sacará esto de combatManager

        //Añade las imagenes a la escena como enemigo/aliado y el numero que ocupan en su array
        for(let i = 0; i < aliados.length; i++) {
            this.load.image('aliado' + i, aliados[i]);
        }
        for(let i = 0; i < enemigos.length; i++) {
            this.load.image('enemigo' + i, enemigos[i]);
        }
    }

    //crear aqui los objetos de la escena
    create() {
        let aliados = ['aliado0', 'aliado1', 'aliado2', 'aliado3']; //En la version final sacará esto de combatManager
        let enemigos = ['enemigo0', 'enemigo1', 'enemigo2', 'enemigo3']; //En la version final sacará esto de combatManager

        for(let i = 0; i < aliados.length; i++) {
            this.load.image('aliado' + i, aliados[i]);
        }
        for(let i = 0; i < enemigos.length; i++) {
            this.load.image('enemigo' + i, enemigos[i]);
        }
    }

    update() {

    }
};
