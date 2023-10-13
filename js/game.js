
var config = {
    type: Phaser.AUTO,
    width: 900, //Configurar aquí el tamaño de la ventana de juego
    height: 600,
    pixelArt: true,
    scene: [{
        //init: init
        preload: preload,
        create: create,
        //update: update
    }],
    parent: 'espacio-juego'
};

var game = new Phaser.Game(config);

//cargar aqui los datos de la escena.
function preload() {
      this.load.image('javier', '../images/javier.jpg');
}

//crear aqui los objetos de la escena
function create() {
    this.add.image(400, 300, 'javier').setScale(0.7,0.7); //omg so sexy
}