//----------Entidad----------------------------------
class Usuario{
    constructor(nombre, dinero){
        this.nombre = nombre;
        this.puntaje = 0;
        this.puntajeMaximo = 0;
        this.puntajeMinimo = 0;
        this.cantidadCartasA = 0;
        this.dinero = dinero;
    }

    apuestaJugador(dineroApostado) {
        this.dinero -= dineroApostado;
    }

    apuestaGanada(montoApuesta){
        this.dinero += (montoApuesta*2);
    }

    nuevaPartida(){
        this.puntaje = 0;
        this.puntajeMaximo = 0;
        this.puntajeMinimo = 0;
        this.cantidadCartasA = 0;
    }

    toString(){
        console.log(`Nombre: ${this.nombre}\nPuntaje: ${this.puntaje}\nDinero: ${this.dinero}`);
    }
};


//----------Funciones----------------------------------
//Funcion para sumar A
//La carta A puede valer 1 u 11.
//Si sale 2A una vale 1 y la otra vale 11
//Si sale 3A perdes la mano
function sumarCartaA(jugador){
    if(jugador.cantidadCartasA==1){
        jugador.puntajeMaximo += 11;
        jugador.puntajeMinimo += 1;
    }else if(jugador.cantidadCartasA==2){
        jugador.puntajeMaximo += 1;
        jugador.puntajeMinimo += 11;
    }else{
        jugador.puntajeMaximo = 22;				
    }
};

//Funcion para validar puntaje Maximo y Minimo, y asignar el que corresponda
function cargarPuntaje(jugador){
    if(jugador.puntajeMaximo<=21){
        jugador.puntaje = jugador.puntajeMaximo;
    }else if(jugador.puntajeMinimo<=21){
        jugador.puntaje = jugador.puntajeMinimo;
    }else{
        jugador.puntaje = jugador.puntajeMinimo;
    }
}

//Verificar ganador
function verificarGanador(puntaje1, puntaje2, montoApuesta){
    if( parseInt(puntaje1.puntaje) > 21){
        return "El croupier gana";
    }else if(parseInt(puntaje1.puntaje) > parseInt(puntaje2.puntaje) || parseInt(puntaje2.puntaje) > 21){
        puntaje1.apuestaGanada(montoApuesta);
        return "El jugador gana";
    }else{
        return "El croupier gana";
    }
}