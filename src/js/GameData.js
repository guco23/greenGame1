export default class GameData {   
    
	constructor() {        
        //this.scene.add.existing(this);
        //Array de objetos clave
        this.Objets = [];
		this.Objets[0]={
            'Nombre': "Nota1",
            'Pillado': false,            
            };
            this.Objets[1]={
                'Nombre': "Nota2",
                'Pillado': false,            
            };
            this.Objets[2]={
                'Nombre': "Nota3",
                'Pillado': false,            
            };
            this.Objets[3]={
                'Nombre': "ValeCajaFuerte",
                'Pillado': false,            
            };
            this.Objets[4]={
                'Nombre': "CajaDeHerramientas",
                'Pillado': false,            
            };
            this.Objets[5]={
                'Nombre': "Madera",
                'Pillado': false,            
            };
            this.Objets[6]={
                'Nombre': "PlanosPuente",
                'Pillado': false,            
            };            
            this.AñadeObjetoClave = function(aux){
                console.log("tocame uwu");
                this.Objets[aux].Pillado = true;
            }
            this.CheckObjetoClave = function(aux){
                console.log(this.Objets[aux].Pillado);
            }
	}
    
    AñadeObjetoClave(aux){
        this.Objets[aux].Pillado = true;
    }
    CheckObjetoclave(aux){
        return this.Objets[aux].Pillado; //ponle true si falla kbron
    }

}