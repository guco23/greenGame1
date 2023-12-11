export default class dialogo extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Scene} scene - escena en la que aparece
	 * @param {character} Char - coordenada x
     * @param {string[]} dialogos - array con diálogos
	 */
	constructor(scene, Char, texto, MiFuncion = null) {
		super(scene, Char, texto);        
        this.myScene = scene;
        scene.Texto = true;
		this.PosDialogo = 0;
        this.timer = 0;
        this.dialogos = texto;
        this.end = Char;
        if(MiFuncion != null) this.LaFuncion = MiFuncion;
        Char.Activate();
		this.scene.add.existing(this);
        this.image = scene.add.image(Char.x, Char.y+85, 'UI');
        this.image.scale = 1.8;
		// Seteamos las teclas para mover al personaje
		this.InteractKey = this.scene.input.keyboard.addKey('Space'); //interact        
        //this.myText = this.myScene.add.text(this.end.x-140, this.end.y+45, this.dialogos[this.PosDialogo], { font: '"Press Start 2P"' });        
        this.Write(this.dialogos[this.PosDialogo]);
        this.PosDialogo++;
	}    
    DestroyTexts(){
        if(this.myText1 != undefined)this.myText1.destroy();
        if(this.myText2 != undefined)this.myText2.destroy();
        if(this.myText3 != undefined)this.myText3.destroy();
        if(this.myText4 != undefined)this.myText4.destroy();
        if(this.myText5 != undefined)this.myText5.destroy();
        if(this.myText6 != undefined)this.myText6.destroy();
    }
    Next(){                
        this.DestroyTexts();
        this.Write(this.dialogos[this.PosDialogo]);
        this.PosDialogo++;
        //this.myText = this.myScene.add.text(this.end.x-140, this.end.y+45, this.dialogos[this.PosDialogo], { font: '"Press Start 2P"' });        
    }
    finish(){
        if(this.LaFuncion != undefined) this.LaFuncion();
        this.DestroyTexts();
        this.myScene.Texto = false;
        this.end.Activate();                            
        this.image.destroy();
        this.destroy();
    }
	preUpdate() {        
		if(this.timer > 30){
            if(this.InteractKey.isDown){
                
                if(this.PosDialogo >= this.dialogos.length){
                    this.finish();
                }else this.Next();
                this.timer = 0;
            }
        }else{
            this.timer++;
        }
	}
    Write(string){
        const maxTamaño = 50;
        const array = [...string];
        let x = 0;        
        let k = 0;
        let str = "";
        let aux = true;
        let y =0;
        while(x<array.length && aux){
            str += array[x];
            y++;
            x++;
            if(y > maxTamaño) aux = false;    
        }             
        this.myText1 = this.myScene.add.text(this.end.x-140, this.end.y+45 +(k*15), str, { font: '"Press Start 2P"' });
        k++;    

        str = "";
        aux = true;
        y=0;        
        while(x<array.length && aux){
            str += array[x];
            y++;
            x++;
            if(y > maxTamaño) aux = false;    
        }             
        this.myText2 = this.myScene.add.text(this.end.x-140, this.end.y+45 +(k*15), str, { font: '"Press Start 2P"' });
        k++;

        str = "";
        aux = true;
        y=0;        
        while(x<array.length && aux){
            str += array[x];
            y++;
            x++;
            if(y > maxTamaño) aux = false;    
        }             
        this.myText3 = this.myScene.add.text(this.end.x-140, this.end.y+45 +(k*15), str, { font: '"Press Start 2P"' });
        k++;

        str = "";
        aux = true;
        y=0;        
        while(x<array.length && aux){
            str += array[x];
            y++;
            x++;
            if(y > maxTamaño) aux = false;    
        }             
        this.myText4 = this.myScene.add.text(this.end.x-140, this.end.y+45 +(k*15), str, { font: '"Press Start 2P"' });
        k++;

        str = "";
        aux = true;
        y=0;        
        while(x<array.length && aux){
            str += array[x];
            y++;
            x++;
            if(y > maxTamaño) aux = false;    
        }             
        this.myText5 = this.myScene.add.text(this.end.x-140, this.end.y+45 +(k*15), str, { font: '"Press Start 2P"' });
        k++;

        str = "";
        aux = true;
        y=0;        
        while(x<array.length && aux){
            str += array[x];
            y++;
            x++;
            if(y > maxTamaño) aux = false;    
        }             
        this.myText5 = this.myScene.add.text(this.end.x-140, this.end.y+45 +(k*15), str, { font: '"Press Start 2P"' });
        k++;
    }
}