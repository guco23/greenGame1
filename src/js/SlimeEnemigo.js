import { RAIZ_IMAGENES } from "./constants.js";

export default class SlimeEnemigo extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 * @param {string} objeto - objeto a dar despues del combate (cambiar a la clase de inventario por favor)
     * @param {Enemigo[]} enemigos - array con enemigos
	 */
	constructor(scene, x, y, objeto, enemigos) {
		super(scene, x, y, objeto, enemigos);
        
        this.speed = 140;
        this.myScene = scene;
        this.objeto = objeto;
        this.enemigos = enemigos;
        this.MovingX = x;
        this.MovingY = y;
        this.MovePos = true;
        this.ChangeDir = function(){
			this.MovePos = !this.MovePos;
		};
		this.scene.add.existing(this);
		scene.physics.add.existing(this);
        this.image = scene.load.image('Slime', RAIZ_IMAGENES + "Slime.png");
        this.image.scale = 1;
        
        //Ajustamos el collider del slime
        this.bodyOffset = this.body.width/4;
		this.bodyWidth = this.body.width/2;
		this.bodyHeight = this.body.bodyHeight/2;
		
		this.body.setOffset(this.bodyOffset, 0);
		this.body.width = this.bodyWidth;
	}

	preUpdate() {   
        if (this.MovePos && this.MovingX > 0){
            this.body.setVelocityX(this.speed);
            this.MovingX = 1;
        }  
        if (!this.MovePos && this.MovingX > 0){
            this.body.setVelocityX(this.speed);
            this.MovingX = -1;
        }    
        if (this.MovePos && this.MovingY > 0){
            this.body.setVelocityY(this.speed);
            this.MovingY = 1;
        }  
        if (!this.MovePos && this.MovingY > 0){
            this.body.setVelocityY(this.speed);
            this.MovingY = -1;
        }   
	}
}