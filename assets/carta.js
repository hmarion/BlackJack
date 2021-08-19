//----------Entidad----------------------------------
class Carta{
    constructor(numeroCarta, paloCarta, valorCarta, imagenCarta){
        this.numeroCarta = numeroCarta;
        this.paloCarta = paloCarta;
        this.valorCarta = valorCarta;
        this.imagenCarta = imagenCarta;
    }
    /*
    toString(){
        console.log(`Carta: ${this.numeroCarta} ${this.paloCarta}\nValor Carta: ${this.valorCarta}`);
    }*/
}

//----------Funciones----------------------------------
//Cargar el Mazo desde un JSON local
function armarMazo(){
    mazo = [];
    const URLGET = "./assets/api.json";

    $.getJSON(URLGET, function(resp, est){
        let numero;
        let palo;
        let valor;
        let imagen;
        if(est === "success"){
            for (const dato of resp){
                numero = dato.numeroCarta;
                palo = dato.paloCarta;
                valor = dato.valorCarta;
                imagen = dato.imagenCarta;
                let carta1 = new Carta(numero, palo, valor, imagen);
                mazo.push(carta1);
            }
        }  
    });
}