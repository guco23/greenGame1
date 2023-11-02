export class CombateEscena extends Phaser.Scene {
    //CombatManager combatManager;

    //cargar aqui los datos de la escena.
    preload() {
        //La escena va a recibir combat manager y a partir de sus datos va a crear la escena
        //Primero, tomará un array con los enemigos y los aliados a partir de los cuales creará los objetos en pantalla

        //Placeholders
        //Es importante que los sprites finales tengan la misma resolución
        let aliados = ['./images/javier.jpg', './images/javier.jpg', './images/javier.jpg', './images/javier.jpg']; //En la version final sacará esto de combatManager
        let enemigos = ['../images/furro.jpg', '../images/furro.jpg', '../images/profile.png', '../images/furro.jpg', '../images/furro.jpg']; //En la version final sacará esto de combatManager

        //Añade las imagenes a la escena como enemigo/aliado y el numero que ocupan en su array
        for (let i = 0; i < aliados.length; i++) {
            this.load.image('aliado' + i, aliados[i]);
        }
        for (let i = 0; i < enemigos.length; i++) {
            this.load.image('enemigo' + i, enemigos[i]);
        }
    }

    //crear aqui los objetos de la escena
    create() {
        //Arrays declarados provisionales para guardar los objetos de la escena
        var aliados = Array(4);
        var enemigos = Array(5);

        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;

        //Coloca los sprites de los enemigos en la escena
        for (let i = 0; i < aliados.length; i++) {
            aliados[i] = this.add.image(gameWidth / 5, (gameHeight - gameHeight / 6)/  (aliados.length + 1) * (i + 1) , 'aliado' + i)
            aliados[i].setScale(0.05);
        }
        for (let i = 0; i < enemigos.length; i++) {
            enemigos[i] = this.add.image(gameWidth - (gameWidth / 5), gameHeight /  (enemigos.length + 1) * (i + 1) , 'enemigo' + i)
            enemigos[i].setScale(0.05);
        }
    }
};
