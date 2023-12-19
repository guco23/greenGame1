export default class Character extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y, dir) {
		super(scene, x, y, dir, 'character');
		this.scene = scene;
		this.x = x;
		this.y = y;
		this.dir = dir;
		this.speed = 105; // Nuestra velocidad de movimiento será 140
		this.CanMove = true;
		this.MovingX = 0;
		this.MovingY = 0;

		var self = this;
		this.Activate = function () {
			this.CanMove = !this.CanMove;
		};

		self.scene.add.existing(this);	      

		// Seteamos las teclas para mover al personaje
		this.upKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		this.leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		this.downKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		this.rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);		
		this.menuKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);		

		scene.physics.add.existing(this);

		this.scene.anims.create({
			key: 'idleLeft',
			frames: scene.anims.generateFrameNumbers('character', { start: 8, end: 8 }),
			frameRate: 10,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'idleRight',
			frames: scene.anims.generateFrameNumbers('character', { start: 12, end: 12 }),
			frameRate: 10,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'idleUp',
			frames: scene.anims.generateFrameNumbers('character', { start: 4, end: 4 }),
			frameRate: 10,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'idleDown',
			frames: scene.anims.generateFrameNumbers('character', { start: 0, end: 0 }),
			frameRate: 10,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'moveLeft',
			frames: scene.anims.generateFrameNumbers('character', { start: 8, end: 11 }),
			frameRate: 10,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'moveRight',
			frames: scene.anims.generateFrameNumbers('character', { start: 12, end: 15 }),
			frameRate: 10,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'moveUp',
			frames: scene.anims.generateFrameNumbers('character', { start: 4, end: 7 }),
			frameRate: 10,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'moveDown',
			frames: scene.anims.generateFrameNumbers('character', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});
		if (this.dir == 0) this.play('idleLeft');
		else if (this.dir == 1) this.play('idleUp');
		else if (this.dir == 2) this.play('idleRight');
		else if (this.dir == 3) this.play('idleDown');
		else this.play('idleDown');
		this.anims.stop();


		// Ajustamos el "collider" de nuestra judia
		this.bodyOffset = this.body.width / 4;
		this.bodyWidth = 16;
		this.bodyHeight = 25;

		this.body.setOffset(this.bodyOffset, 0);
		this.body.width = this.bodyWidth;
		this.body.height = this.bodyHeight;

	}

	create() {

	}

	/**
	 * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
		// Es muy imporante llamar al preUpdate del padre (Sprite), sino no se ejecutará la animación
		super.preUpdate(t, dt);

		
		if (this.leftKey.isDown && this.CanMove) {
			this.body.setVelocityX(-this.speed);
			this.MovingX = -1;
			if (this.MovingY == 0 && this.anims.currentAnim.key !== 'moveLeft') this.play('moveLeft');
		}

		if (this.rightKey.isDown && this.CanMove) {
			this.body.setVelocityX(this.speed);
			this.MovingX = 1;
			if (this.MovingY == 0 && this.anims.currentAnim.key !== 'moveRight') this.play('moveRight');
		}
		if (this.upKey.isDown && this.CanMove) {
			this.body.setVelocityY(-this.speed);
			this.MovingY = -1;
			if (this.anims.currentAnim.key !== 'moveUp') this.play('moveUp');
		}
		if (this.downKey.isDown && this.CanMove) {
			this.body.setVelocityY(this.speed);
			this.MovingY = 1;
			if (this.anims.currentAnim.key !== 'moveDown') this.play('moveDown');
		}

		if ((Phaser.Input.Keyboard.JustUp(this.leftKey) || Phaser.Input.Keyboard.JustUp(this.rightKey) || !this.CanMove)) {
			this.body.setVelocityX(0);
			if (this.MovingY == 0) {
				if (this.MovingX == 1) this.play('idleRight');
				else if (this.MovingX == -1) this.play('idleLeft');
			}
			this.MovingX = 0;
		}
		if ((Phaser.Input.Keyboard.JustUp(this.upKey) || Phaser.Input.Keyboard.JustUp(this.downKey) || !this.CanMove)) {
			this.body.setVelocityY(0);
			if (this.MovingX == 0) {
				if (this.MovingY == 1) this.play('idleDown');
				else if (this.MovingY == -1) this.play('idleUp');
			}
			this.MovingY = 0;
		}
		if (this.menuKey.isDown) {
			this.scene.scene.launch('MenuEscena', { obj: this.scene.myGameData, scene: this.scene });
			this.scene.scene.setActive(false);
		}
	}
}