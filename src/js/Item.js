export class Item {
    nombre; //Nombre del item
    descripcion; //Descripción del item
    vidaEx; //Vida que añade equipar el item
    ataqEx; //Ataque que añade equipar el item

    constructor(idn) {
        this.nombre = idn.nombre;
        this.descripcion = idn.descripcion;
        this.vidaEx = idn.vidaEx;
        this.ataqEx = idn.ataqEx;
        //Los items pueden tener más atributos
    }
}

/**
 * Si el item contiene algún tipo de funcionalidad extra, heradar de esta clase e implementar.
 */

/**Ahora que item no tiene ninguna funcionalidad adicional, esta clase es irrelevante
 * ya que se pueden utilizas los datos desde la variable json 
 * de la que este objeto se contruiría
 */