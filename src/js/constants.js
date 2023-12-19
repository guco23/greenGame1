export const RAIZ_IMAGENES = "/assets/images/"; //La dirección de las imágenes como ruta absoluta
export const RAIZ_SOUNDS = "/assets/audio/"; //La dirección de las imágenes como ruta absoluta

export const RAIZ_IMGS_COMBAT = "spritespjs/"; //La direción dentro de RAIZ_IMAGENES de las imágenees de combate
export const RAIZ_IMGS_OVERWORLD = "OverworldCharacters/"; //La direción dentro de RAIZ_IMAGENES de las imágenees de personajes en el overworld
export const RAIZ_IMGS_OBJETOS = "Objetos/"; //La direción dentro de RAIZ_IMAGENES de las imágenees de objetos en el overworld
export const RAIZ_SOUNDS_MUSICA = "Music/"; //La direción dentro de RAIZ_IMAGENES de las imágenees de objetos en el overworld

export const CONTROLES = {
    UP: "ArrowUp",
    DOWN: "ArrowDown",
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight",
    ACCEPT: "KeyZ", //siguiente
    CANCEL: "KeyX", //anterior
    MENU: "KeyC"
}

//El overworld utiliza un sistema de eventos de control distinto, por lo que los strings son distintos
export const CONTROLES_OVERWORLD = {
    ACCEPT: "Z", //siguiente
    CANCEL: "X", //anterior
}