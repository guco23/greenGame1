export default class dialogoHelp {    
        constructor() {        
        this.dialogos = [];
        //Encuentro con Frikol
        this.dialogos[0] = ["Em... Disculpa señor, pero este es un área         restringida a los clientes...",
        "¿Qué está pasando?", "Había una especie de monstruo en el almacén...", "Ah, sí, esos bichos...", "Desde que empezó el apocalipsis esos bichos han    ido apareciendo y tomando el control del           establecimiento", 
        "Mis compañeros se han largado, pero yo sé muy bien que no recibimos nuestros 5 minutos de descanso    hasta dentro de 30 minutos", "Se lo diré al encargado cuando vuelva", 
        "Maldición, si quiero salvar el mundo tendré que    abrirme paso entre todos esos monstruos, pero no sési podré hacerlo solo...", "Oye... ¿Me podrías ayudar a evitar el apocalipsis ysalvar a la humanidad?",
        "De hecho, somos judías, no humanos", "...","...", "¿Vas a venir o no?", "Vale, supongo que no tengo nada mejor que hacer", "Frikol se ha unido al grupo"]
        //Pillando el item de la puerta
        this.dialogos[1] = ["Recoges la puerta", "La puerta ha sido añadida a tu inventario"];
        //Puerta secreta en el lateral del Mercadona
        this.dialogos[2] = ["Notas que hay una puerta en el lateral del         Mercadona TM", "Decides atravesarla"];
        //Encuentro con Judio César        
        this.dialogos[3] = ["Oh, por fin. Un empleado", "Discúlpame, ¿le importaría decirme dónde está la   sección de toallas?", "Oye, ¿No será usted Judio César, emperador del     Imperio Romano?",
        "Em... ¿Nos conocemos de algo?", "Estamos intentando detener el apocalipsis, y tu    ayuda podría venirnos muy bien", "Ah, eso suena importante", "Está bien, os ayudaré", "Judio César se ha unido al grupo"];
        //Encuentro con MrBean
        this.dialogos[4] = ["EN EL VÍDEO DE HOY HE COMPRADO UN                  MERCADONA, Y LO HE LLENADO DE                       DINAMITA...", "¡Oh Dios mío! ¡Es Mister Bean!", "¡Estoy subscrito al canal! ¡Dame dinero!",
        "Em... lo siento, pero ahora estoy grabando un      vídeo...", "Discúlpale, no suele conportarse así", "Es igual. De todas formas estos monstruos que      aparecieron desde que empezó el apocalipsis no me  dejan grabar en paz",
        "Hey, nosotros estamos luchando contra ellos,       intentando detener el apocalipsis", "Cuanto antes acabemos, antes podrás ponerte con    el vídeo. ¿Nos hechas un cable?", "Vale. Suena razonable", "Mr.Bean se ha unido al grupo"]
        //Primera interacción con la caja fuerte
        this.dialogos[5] = ["Puedes ver, incrustada en la pared, una caja fuertede tamaño exagerado", "Es donde seguramente se guarde todo el dinero que  gana el supermercado", 
        "Intentas abrirla, pero la puerta no cede", "Observas un poco, y compruebas que se podría abrir con un código de nueve dígitos", "Tal vez haya alguna pista en el establecimiento conla que adivinar este número..."]
        //Segunda interacción con la caja fuerte
        this.dialogos[6] = ["Insertas, por probar, un número aleatorio de nueve cifras", "...", "No funciona", "Decides no perder el tiempo y buscar pistar en el  supermercado"]
        //Segunda interaccion con el item de la puerta
        this.dialogos[7] = ["Hay una alfombra con forma de flecha apuntando a lapared", "Qué raro"]
        //Cuando intentas irte del Mercadona antes de tiempo
        this.dialogos[8] = ["¡Espera un momento!", "¿Qué pasa?", "No podemos irnos todavía", "Aún no hemos pagado", "...", "Frikol...", "¡Tienes toda la razón!", "No podemos irnos sin pagar. ¿Qué ejemplo           estaríamos dando si no?",
        "Pero no tengo dinero", "Tendremos que encontrar algo con lo que pagar      entonces..."]
        //Cuando resuelves la caja fuerte
        this.dialogos[9] = ["Introduces el código completo: 111-111-111", "La puerta se abre, mostrando el interior de la cajafuerte, completamente vacía, con la excepción de unpapel en el suelo...",
        "En el pone: 'Cupon de 100% de descuento'", "Decides que con eso será suficiente para pagar", "Cierras de nuevo la puerta, para que no haya       corriente"]
        //Mensaje de las notas de la caja fuerte
        this.dialogos[10] = ["Te encuentras una nota en el suelo, a la que le    faltan otros dos pedazos", "En ella pone: '111'", "Puede que sea parte de una contraseña..."]  
        //Mensaje cuando te encuentras con Elon Musk
        this.dialogos[11] = ["Bueno, ese sí que ha sido un aterrizaje de         emergencia...", "Perdona, ¿usted quién es?", "Soy Bealon Musk, y me he visto obligado a hacer un aterrizaje de emerjencia con mi cohete aquí",
        "Si no ves ningún cohete, eso es porque unos        monstruos se lo han llevado. No por ninguna otra   razón", "Oye, si nos ayudas a detener el fin del mundo,     nosotros te ayudaremos a recuperar tu cohete",
        "Tenía pensado comprar Twitter, pero creo que ese esun mejor plan", "Bealon Musk se ha unido al grupo"]
        //Mensaje cuando te encuentras con el Frijol con Botas
        this.dialogos[12] = ["SOOOOY...", "...el Frijol con Botas", "Y nunca un arma me ha hecho un solo rasguño", "Eso suena bastante útil. Nos vendría muy bien tu   ayuda para detener el fin del mundo",
        "¡Temedme si osais!", "El Frijol con Botas se ha unido al grupo"]
        //Mensaje cuando te encuentras con Emmet
        this.dialogos[13] = ["Alto ahí, no puedes avanzar por aquí. El puente se ha desmoronado, y es demasiado peligroso seguir    avanzando", "Pero el único camino por el que podemos avanzar    está por ahí...",
        "Señor, usted es arquitecto. ¿Podría arreglar el    puente?", "Hum...", "Puede, pero necesitaría algunos materiales", "Madera, herramientas, unos planos...", 
        "Vale, pues buscaremos esos materiales. Madera,     herramientas y planos. En algún lado encontraremos algo que nos pueda servir...", "Emmet Beanckowski se ha unido al grupo"]
        //Mensaje cuando te encuentras con Mariano Rajoy
        this.dialogos[14] = ["Es el alcalde que elige al vecino...", "¡Oiga! Usted es Mariano Rajoy, ¿no? Tiene que      resolver esta crisis inmediatamente", "Señor, esta situación es como el agua que cae del  cielo sin que nadie sepa por qué...",
        "No, sí que sabemos por qué está pasando esto,      y podemos impedirlo", "Si viene con nosotros podrá ayudarnos a detener el apocalipsis. Necesitamos toda la ayuda que podamos conseguir",
        "It's very difficult todo esto...", "Mariano Rajoy se ha unido al grupo"]
        //Mensaje cuando te encuentras con Greta Judberg
        this.dialogos[15] = ["El nivel del mar ha aumentado, llegando hasta aquí,Madrid. La playa de Madrid ahora realmente es una  playa", "Maldito calentamiento global", "No, no es culpa del calentamiento global",
        "Esto es por el apocalipsis. Y solo va a ir a peor  de ahora en adelante", "Nuestra única posibilidad de supervivencia es      detenerlo, y necesitamos toda la ayuda que podamos conseguir", 
        "Oh, pues contad conmigo en ese caso", "Greta Judberg se ha unido al grupo"]
        //Mensaje cuando te encuentras con Selena Beamez
        this.dialogos[16] = ["Hola, yo soy Selena Beamez", "Y estás viendo Disney Channel", "*dibuja un ratón con el dedo", "...", "Selena Beamez se ha unido al grupo"]
        //Mensaje cuando te encuentras con Albert Beanstein
        this.dialogos[17] = ["¿Necesitas ayuda para pasar por la puerta de metro de Nuevos Ministerios? No te preocupes, ahora te   hecho un cable", "Para abrir la puerta necesitas comprar un ticket,y para conseguir un ticket tienes que ir a una de lasmáquinas de aquí arriba y comprarlo",
        "Para pagarlo tendrás que recolectar dinero, eso sí.El dinero lo podrás encontrar por ahí, tirado por  el suelo, justo como en la vida real", "Bueno, gracias por la explicación, pero no es el   momento de tutoriales",
        "Tenemos que detener el apocalipsis, y cada vez nos queda menos tiempo...", "El tiempo es relativo", "Albert Beanstein se ha unido al grupo"]
        //Mensaje cuando te encuentras con Donald Bean
        this.dialogos[18] = ["Cuack", "...", "Cuack, cuack", "Esta judía está gritando la onomatopeya 'cuack' en voz alta, como si fuera un pato", "Decidís ignorarla, pero aun así esta os sigue",
        "Donald Bean se ha unido al grupo"]
        //Mensaje cuando te encuentras a Indiana Beans
        this.dialogos[19] = ["Alto ahí", "El camino que hay a continuación es demasiado      peligroso para avanzar sin la ayuda de un          aventurero", "Mecachis", "¿Ahora dónde vamos a encontrar un aventurero?", ">:(",
        "Por cierto, ¿sabes por dónde está la salida? Este  sitio es como un laberinto", "Sí. Bajando por este pasillo en línea recta está lasalida", "Pero hay que conseguir suficientes monedas para    comprar un ticket y salir",
        "Qué cosas", "Indiana Beans se ha unido al grupo"]
        //Mensaje cuando te encuentras con Jhonny Bean
        this.dialogos[20] = ["Hola, soy Johnny Bean", "Por si no lo has pillado, mi nombre es una         inteligente referencia al popular actor 'Johnny    Depp', con un 'Bean' al final porque soy una judía", "Vaya, eso es gracioso",
        "Claro que sí", "De esta interacción se podría sacar un RPG muy     divertido", "No lo dudo", "En fin, ahora te ayudaré en tu aventura", "Johnny Bean se ha unido al grupo"]
        //Mensaje cuando te encuentras con SambaDeJudía
        this.dialogos[21] = ["¡Vamos! ¡Fiesta! ¡Chacachá!", "Guau, tú si que lo petas en las fiestas, ¿me       equivoco?", "Nop. Soy el alma de la fiesta :D", "Samba do Judía se ha unido al grupo"]
        //Mensaje cuando te encuentras con Saul Judman
        this.dialogos[22] = ["Hola, soy Saul Judman", "¿Sabías que tienes derechos?", "La constitución dice que sí", "Saul Judman se ha unido al grupo"]
        //Mensajes para las puertas de almcén 2
        this.dialogos[23] = ["Esta puerta está cerrada"]
        this.dialogos[24] = ["Esta puerta, por otro lado, está cerrada"]
        this.dialogos[25] = ["Esta puerta está SUPERcerrada"]
        this.dialogos[26] = ["Sorpresa, sorpresa, está cerrada"]
        this.dialogos[27] = ["Y esta puerta está... Cerrada"]
        this.dialogos[28] = ["Esta puerta realmente es una ventana, disfrazada depuerta", "Y está cerrada"]
        this.dialogos[29] = ["Esta puerta no está cerrada, pero oyes un grito    infrahumano y escalofriante al otro lado, así que  decides no abrirla"]
        this.dialogos[30] = ["Está cerrada"]
        //Mensaje cuando pillas los planos del suelo
        this.dialogos[31] = ["Te encuentras los planos de un puente de madera    tirados en el suelo", "Conveniente"]
        //Mensaje cuando pillas la caja de herramientas
        this.dialogos[32] = ["Te encuentras una caja de herramientas", "Decides recogerla, ya que podría ser útil en un    futuro"]
        //Mensaje cuando pilla la madera
        this.dialogos[33] = ["En medio del bosque te encuentras un tronco de     madera ya cortado, y colocado verticalmente", "Es suficiente madera para hacer un puente"]
        //Diálogos cuando se construye el puente
        this.dialogos[34] = ["Bueno, creo que esos son todos los materiales que  necesitábamos", "Ahora toca construir el puente", "..."]
        this.dialogos[35] = ["Y ya está. Puente construido", "Vaya, eso ha sido rápido", "Bueno, por algo me llaman 'Maestro Constructor'", "Bien hecho, ahora tenemos que seguir avanzando"]
        //Diálogos de Nuevos ministerios con la terminal 1
        this.dialogos[36] = ["Es una máquina de billetes de metro. Fabrica       billetes de metro", "En su pantalla se puede leer: 'Introduzca una      moneda'", "Si tan solo tuvieras una moneda..."]
        this.dialogos[37] = ["Introduces la moneda por la ranura de billetes", "La máquina empieza a agitarse, mientras suenan     sonidos que provocarían pesadillas a cualquier críode siete u ocho años",
        "Finalmente los ruidos acaban, y de la máquina sale un pequeño ticket de metro", "La puerta que antes te bloqueaba el paso desaparecepor arte de magia"]
        this.dialogos[38] = ["En la pantalla de la máquina de billetes puedes verel equivalente a la pantalla azul de la muerte en  un cacharro de billetes del metro", "No vas a conseguir más billetes de aquí"]
        //Diálogos de Nuevos ministerios con la terminal 2
        this.dialogos[39] = ["Es como la máquina de billetes de metro de arriba, pero esta todavía funciona, y es de color rojo", "En su pantalla se puede leer: 'Introduzca 65       monedas'", "Sí que aumenta rápidamente la inflación durante el apocalipsis..."]
        this.dialogos[40] = ["Le haces un bizum a la máquina con las 65 monedas  que te pedía, consiguiendo así el ticket", "Le salen patas a la puerta que te bloqueaba el pasoy sale corriendo"]
        this.dialogos[41] = ["La máquina sigue funcionando perfectamente, lo cuales bastante inútil, siendo sinceros", "Es decir, no vas a pedir un segundo billete,       ¿verdad?", 
        "Tendrías que recolectar otras 65 monedas más, y    nadie va a gastar su tiempo en ello...", "¿Verdad?"]
        this.dialogos[42] = ["Mientras vuelves a pagar otras 65 monedas más,     notas como si una puerta en algún punto de         Nuevos Ministerios se hubiese abierto..."]
        this.dialogos[43] = ["La máquina no funciona"]
        //Diálogo nada más empezar la escena 1
        this.dialogos[44] = ["...", "¿Eh?", "¿Qué ha pasado?", "...", "Ah, ya recuerdo", "Judas… ella inició el apocalipsis", "Intenté detenerla, pero era demasiado fuerte…", "Me lanzó por los aires y me estrellé aquí, en este sótano",
        "Tengo, que volver a intentar detenerla", "Pero… no estoy seguro de que sea lo                suficientemente fuerte yo solo…"]
        //Cinemática inicial de antes de combate
        this.dialogos[45] = ["¿Qué es eso?", "Es una especie de monstruo", "Maldita sea... Está bloqueando la única salida", "Si me acerco a lo mejor me ataca, pero está        enfrente de la única salida", 
        "Tendré que arriesgarme"]



        this.images = [];
        this.images[0] = ["Frikol", "Judini","Judini","Frikol","Frikol","Frikol","Frikol","Judini","Judini","Frikol","Judini","Frikol","Judini","Frikol","-"]
        this.images[1] = ["-","-"]
        this.images[2] = ["-","-"]
        this.images[3] = ["JudioCaesar","JudioCaesar", "Judini", "JudioCaesar", "Judini","JudioCaesar","JudioCaesar","-"]
        this.images[4] = ["MrBean","Frikol", "Frikol", "MrBean", "Judini","MrBean", "Judini", "Judini","MrBean","-"]
        this.images[5] = ["-","-", "-", "-", "-"]
        this.images[6] = ["-","-", "-", "-"]
        this.images[7] = ["-", "-"]
        this.images[8] = ["Frikol", "Judini", "Frikol", "Frikol", "Judini", "Judini", "Judini", "Judini", "Judini", "Judini", "Judini"]
        this.images[9] = ["-","-","-","-","-","-","-"]
        this.images[10] = ["-","-","-","-","-","-","-"]
        this.images[11] = ["BealonMusk","Judini","BealonMusk","BealonMusk","Judini","BealonMusk","-"]
        this.images[12] = ["Gato","Gato","Gato","Judini", "Gato", "-"]
        this.images[13] = ["Emmet","Judini","Judini","Emmet","Emmet","Emmet","Judini","-"]
        this.images[14] = ["Rajoy","Judini","Rajoy","Judini","Judini","Rajoy", "-"]
        this.images[15] = ["Greta", "Greta", "Judini", "Judini", "Judini", "Greta", "-"]
        this.images[16] = ["Selena", "Selena", "Selena", "Judini", "-"]
        this.images[17] = ["Albert","Albert","Albert","Judini","Judini","Albert","-"]
        this.images[18] = ["Donald", "Judini", "Donald", "-", "-", "-"]
        this.images[19] = ["Indiana","Indiana","Judini","Judini","Indiana","Judini","Indiana","Indiana","Judini","-"]
        this.images[20] = ["Jhonny","Jhonny","Judini","Jhonny","Jhonny","Judini","Jhonny", "-"]
        this.images[21] = ["SambaDoJudia","Judini","SambaDoJudia","-"]
        this.images[22] = ["SaulJudman","SaulJudman","SaulJudman","-"]
        this.images[23] = ["-"]
        this.images[24] = ["-"]
        this.images[25] = ["-"]
        this.images[26] = ["-"]
        this.images[27] = ["-"]
        this.images[28] = ["-", "-"]
        this.images[29] = ["-"]
        this.images[30] = ["-"]
        this.images[31] = ["-", "-"] 
        this.images[32] = ["-", "-"] 
        this.images[33] = ["-", "-"] 
        this.images[34] = ["Emmet","Emmet", "-"]
        this.images[35] = ["Emmet", "Judini", "Emmet", "Judini"]
        this.images[36] = ["-","-","-","-","-","-","-"]
        this.images[37] = ["-","-","-","-","-","-","-"]
        this.images[38] = ["-","-","-","-","-","-","-"]
        this.images[39] = ["-","-","-","-","-","-","-"]
        this.images[40] = ["-","-","-","-","-","-","-"]
        this.images[41] = ["-","-","-","-","-","-","-"]
        this.images[42] = ["-","-","-","-","-","-","-"]
        this.images[43] = ["-","-","-","-","-","-","-"]
        this.images[44] = ["-","Judini","Judini","Judini","Judini","Judini","Judini","Judini","Judini","Judini","Judini","Judini","Judini"]
        this.images[45] = ["Judini","Judini","Judini","Judini","Judini","Judini","Judini","Judini","Judini","Judini","Judini","Judini"]        

        this.ReturnDialogo = function (i) {
            return this.dialogos[i];
        }
        this.ReturnImages = function(i){
            return this.images[i];
        }
    }
}