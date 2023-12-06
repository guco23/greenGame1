export default class dialogo extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Scene} scene - escena en la que aparece
	 * @param {character} Char - coordenada x
     * @param {string[]} dialogos - array con diálogos
	 */
	constructor(scene, Char, texto) {
		super(scene, Char, texto);
        this.myScene = scene;
		this.PosDialogo = 0;
        this.timer = 0;
        this.dialogos = texto;
        this.end = Char;
        Char.Activate();
		this.scene.add.existing(this);
        this.image = scene.add.image(Char.x, Char.y+85, 'UI');
        this.image.scale = 1.8;
		// Seteamos las teclas para mover al personaje
		this.InteractKey = this.scene.input.keyboard.addKey('Space'); //interact
        this.myText = this.myScene.add.text(this.end.x-140, this.end.y+45, this.dialogos[this.PosDialogo], { font: '"Press Start 2P"' });
	}
    Next(){        
        this.PosDialogo++;
        this.myText.destroy();
        this.myText = this.myScene.add.text(this.end.x-140, this.end.y+45, this.dialogos[this.PosDialogo], { font: '"Press Start 2P"' });        
    }
    finish(){
        this.myScene.Texto = false;
        this.end.Activate();                            
        this.image.destroy();
        this.destroy();
    }
	preUpdate() {        
		if(this.timer > 30){
            if(this.InteractKey.isDown){
                this.Next();
                if(this.PosDialogo >= this.dialogos.length){
                    this.finish();
                }
                this.timer = 0;
            }
        }else{
            this.timer++;
        }
	}
}