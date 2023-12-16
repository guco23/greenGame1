export default class dialogoHelp {    
        constructor() {        
        this.dialogos = [];
        this.dialogos[0] = ["Em... Disculpa señor, pero este es un área         restringida a los clientes...",
        "¿Qué está pasando?", "Había una especie de monstruo en el almacén...", "Ah, sí, esos bichos...", "Desde que empezó el apocalipsis esos bichos han    ido apareciendo y tomando el control del           establecimiento", 
        "Mis compañeros se han largado, pero yo sé muy bien que no recibimos nuestros 5 minutos de descanso    hasta dentro de 30 minutos", "Se lo diré al encargado cuando vuelva", 
        "Maldición, si quiero salvar el mundo tendré que    abrirme paso entre todos esos monstruos, pero no sési podré hacerlo solo...", "Oye... ¿Me podrías ayudar a evitar el apocalipsis ysalvar a la humanidad?",
        "De hecho, somos judías, no humanos", "...","...", "¿Vas a venir o no?", "Vale, supongo que no tengo nada mejor que hacer", "Frikol se ha unido al grupo"]
        this.dialogos[1] = ["Recoges la puerta", "La puerta ha sido añadida a tu inventario"];
        this.dialogos[2] = ["Notas que hay una puerta en el lateral del         Mercadona TM", "Decides atravesarla"];
        this.dialogos[3] = ["Oh, por fin. Un empleado", "Discúlpame, ¿le importaría decirme dónde está la   sección de toallas?", "Oye, ¿No será usted Judio César, emperador del     Imperio Romano?",
        "Em... ¿Nos conocemos de algo?", "Estamos intentando detener el apocalipsis, y tu    ayuda podría venirnos muy bien", "Ah, eso suena importante", "Está bien, os ayudaré", "Judio César se ha unido al grupo"];
        this.dialogos[4] = ["EN EL VÍDEO DE HOY HE COMPRADO UN                  MERCADONA, Y LO HE LLENADO DE                       DINAMITA...", "¡Oh Dios mío! ¡Es Mister Bean!", "¡Estoy subscrito al canal! ¡Dame dinero!",
        "Em... lo siento, pero ahora estoy grabando un      vídeo...", "Discúlpale, no suele conportarse así", "Es igual. De todas formas estos monstruos que      aparecieron desde que empezó el apocalipsis no me  dejan grabar en paz",
        "Hey, nosotros estamos luchando contra ellos,       intentando detener el apocalipsis", "Cuanto antes acabemos, antes podrás ponerte con    el vídeo. ¿Nos hechas un cable?", "Vale. Suena razonable", "Mr.Bean se ha unido al grupo"]
        this.dialogos[5] = ["Puedes ver, incrustada en la pared, una caja fuertede tamaño exagerado", "Es donde seguramente se guarde todo el dinero que  gana el supermercado", 
        "Intentas abrirla, pero la puerta no cede", "Observas un poco, y compruebas que se podría abrir con un código de nueve dígitos", "Tal vez haya alguna pista en el establecimiento conla que adivinar este número..."]
        this.dialogos[6] = ["Insertas, por probar, un número aleatorio de nueve cifras", "...", "No funciona", "Decides no perder el tiempo y buscar pistar en el  supermercado"]
        this.dialogos[7] = ["Hay una alfombra con forma de flecha apuntando a lapared", "Qué raro"]

        this.images = [];
        this.images[0] = ["Frikol", "Judini","Judini","Frikol","Frikol","Frikol","Frikol","Judini","Judini","Frikol","Judini","Frikol","Judini","Frikol","-"]
        this.images[1] = ["-","-"]
        this.images[2] = ["-","-"]
        this.images[3] = ["JudioCaesar","JudioCaesar", "Judini", "JudioCaesar", "Judini","JudioCaesar","JudioCaesar","-"]
        this.images[4] = ["MrBean","Frikol", "Frikol", "MrBean", "Judini","MrBean", "Judini", "Judini","MrBean","-"]
        this.images[5] = ["-","-", "-", "-", "-"]
        this.images[6] = ["-","-", "-", "-"]
        this.images[7] = ["-", "-"]

        this.ReturnDialogo = function (i) {
            return this.dialogos[i];
        }
        this.ReturnImages = function(i){
            return this.images[i];
        }
    }
}