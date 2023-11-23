export default class character extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 'character');
		this.speed = 140; // Nuestra velocidad de movimiento será 140		

		this.scene.add.existing(this); //Añadimos el caballero a la escena	        

		// Seteamos las teclas para mover al personaje
		this.wKey = this.scene.input.keyboard.addKey('W'); //saltar
		this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
		this.sKey = this.scene.input.keyboard.addKey('S'); //parar animación
		this.dKey = this.scene.input.keyboard.addKey('D'); //derecha		
        
		scene.physics.add.existing(this);
		// Decimos que el caballero colisiona con los límites del mundo
		this.body.setCollideWorldBounds();        
		// Ajustamos el "collider" de nuestro caballero
		this.bodyOffset = this.body.width/4;
		this.bodyWidth = this.body.width/2;
		
		this.body.setOffset(this.bodyOffset, 0);
		this.body.width = this.bodyWidth;

	}

	/**
	 * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {        
		// Es muy imporante llamar al preUpdate del padre (Sprite), sino no se ejecutará la animación
		super.preUpdate(t, dt);

		// Mientras pulsemos la tecla 'A' movelos el personaje en la X
		if(this.aKey.isDown){
			//this.setFlip(true, false)
			//this.x -= this.speed*dt / 1000;
			this.body.setVelocityX(-this.speed);
		}

		// Mientras pulsemos la tecla 'D' movelos el personaje en la X
		if(this.dKey.isDown){
			//this.setFlip(false, false)			
			//this.x += this.speed*dt / 1000;
			this.body.setVelocityX(this.speed);
		}
        if(this.wKey.isDown){
			//this.setFlip(false, false)			
			//this.y += this.speed*dt / 1000;
			this.body.setVelocityY(-this.speed);
		}
        if(this.sKey.isDown){
			//this.setFlip(false, false)			
			//this.y += this.speed*dt / 1000;
			this.body.setVelocityY(this.speed);
		}		

        if(Phaser.Input.Keyboard.JustUp(this.aKey) || Phaser.Input.Keyboard.JustUp(this.dKey)){			
			this.body.setVelocityX(0);
		}
        if(Phaser.Input.Keyboard.JustUp(this.wKey) || Phaser.Input.Keyboard.JustUp(this.sKey)){			
			this.body.setVelocityY(0);
		}
	}
}