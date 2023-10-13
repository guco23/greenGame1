
var config = {
    type: Phaser.AUTO,
    width: 900, //Configurar aquí el tamaño de la ventana de juego
    height: 600,
    scene: {
        preload: preload,
        create: create,
    },
    parent: 'espacio-juego'
};

var game = new Phaser.Game(config);

//preload assets and data function
function preload() {
      this.load.image('javier', './images/javier.jpg');
}

//create function
function create() {

}