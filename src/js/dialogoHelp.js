export default class dialogoHelp {    
        constructor() {        
        this.dialogos = [];
        this.dialogos[0] = ["Em... Disculpa señor, pero este es un área         restringida a los clientes...",
        "Judini: ¿Qué está pasando?", "Judini: Había una especie de monstruo en el almacén...", "Ah, sí, esos bichos...", "Desde que empezó el apocalipsis esos bichos han    ido apareciendo y tomando el control del           establecimiento", 
        "Mis compañeros se han largado, pero yo sé muy bien que no recibimos nuestros 5 minutos de descanso    hasta dentro de 30 minutos", "Se lo diré al encargado cuando vuelva", 
        "Judini: Maldición, si quiero salvar el mundo tendré que abrirme paso entre todos esos monstruos, pero no se si podré hacerlo solo...", "Judini: Oye... ¿Me podrías ayudar a evitar el apocalipsis y salvar a la humanidad?",
        "De hecho, somos judías, no humanos", "Judini: ...", "Judini: ¿Vas a venir o no?", "Vale, supongo que no tengo nada mejor que hacer", "Frikol se ha unido al grupo"]
        this.dialogos[1] = ["Recoges la puerta", "La puerta ha sido añadida a tu inventario"];
        this.dialogos[2] = ["Notas que hay una puerta en el lateral del         Mercadona TM", "Decides atravesarla"]



        this.images = [];
        this.images[0] = ["Frikol", "-","-","Frikol","Frikol","Frikol","Frikol","-","-","Frikol","-","-","Frikol","-"]
        this.images[1] = ["-","-"]
        this.images[2] = ["-","-"]

        this.ReturnDialogo = function (i) {
            return this.dialogos[i];
        }
        this.ReturnImages = function(i){
            return this.images[i];
        }
    }
}