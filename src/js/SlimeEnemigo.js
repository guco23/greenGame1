import { RAIZ_IMAGENES } from "./constants.js";

export default class SlimeEnemigo extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x (si es 0, no se mueve por el eje x)
	 * @param {number} y - coordenada y (si es 0, no se mueve por el eje y)
     * @param {number} PosIx - coordenada inicial x
	 * @param {number} PosIy - coordenada inicial y
	 * @param {speed} speed - velocidad de movimiento
	 * @param {string} objeto - objeto a dar despues del combate (cambiar a la clase de inventario por favor)
     * @param {Pared} sceneWallLayer - capa de pared que le pasamos desde la escena para las colisiones con estas
     * @param {Player} player - player que le pasamos desde la escena para las colisiones con este
     * @param {GameData} gameData - instancia de la clase GameData que le pasamos desde la escena para enviar los datos correspondientes a la escena de combate al iniciarse
     * @param {Enemigo[]} enemigos - array con enemigos
	 */
	constructor(scene, speed, x, y, PosIx, PosIy, objeto, enemigos, sceneWallLayer, player, gameData) {
		super(scene, speed, x, y, PosIx, PosIy, objeto, enemigos, sceneWallLayer, player, gameData, 'Slime');
        
        this.speed = speed;
        this.myScene = scene;
        this.objeto = objeto;
        this.enemigos = enemigos;
        this.x = PosIx;
        this.y = PosIy;
        this.MovingX = 0;
        this.MovingY = 0;
        this.gameData = gameData;

        if (x >= 1) this.MovingX = 1;
        else if (x <= -1) this.MovingX = -1;
        else this.MovingX = 0;

        if (y >= 1) this.MovingY = 1;
        else if (y <= -1) this.MovingY = -1;
        else this.MovingY = 0;

        this.WallLayer = sceneWallLayer;
        this.Player = player;
        
		this.scene.add.existing(this);
		scene.physics.add.existing(this);
        scene.physics.world.enable(this);
        var self = this;
        scene.physics.add.collider(this, this.WallLayer, ()=>{
            console.log("Soy retrasadooo");
            self.MovingX = self.MovingX * -1;
            console.log(self.MovingX);
            self.MovingY = self.MovingY * -1;
            console.log(self.MovingY);
        });
        scene.physics.add.collider(this, this.Player, ()=>{
            console.log("muereeeee hdp");
            this.myScene.scene.start('combatScene',{obj:self.gameData});
        });
        //Ajustamos el collider del slime
        this.bodyOffset = 0;
		this.bodyWidth = 16;
		this.bodyHeight = 12;
		
		this.body.setOffset(this.bodyOffset, 2);
		this.body.width = this.bodyWidth;
        this.body.height = this.bodyHeight;

        this.scene.anims.create({
			key: 'idle',
			frames: scene.anims.generateFrameNumbers('Slime', {start:0, end:0}),
			frameRate: 5,
			repeat: 0
		});
        
        
	}

	preUpdate() {
        this.play('idle');  
        this.body.setVelocityX(this.speed * this.MovingX);
        this.body.setVelocityY(this.speed * this.MovingY); 
	}
}