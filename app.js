//----------Variables----------------------------------
//Array para armar el mazo de cartas
let mazo;

let usuario1;
let jugador1 = 0;
let croupier = new Usuario("croupier", 0);
let jugadorHTML;
let saldoHTML = document.getElementById("saldoJugador");
let montoApuesta;
let apuestaHTML;
let cartaHTML;
let cantidadCartas = 0;

//Variable utilizada para marcar cuanto apuesta el jugador
let dineroApostado;

//Variables Utilizadas para los botones
let btnFinalizarSesion = document.getElementById("cerrarSesion")
let btnPedirCarta = document.getElementById("pedirCarta")
let btnPlantarse = document.getElementById("finMano")
let btnApuesta = document.getElementById("apuesta")
let btnMazo = document.getElementById("mazo");
let btnLogin = document.getElementById("usuario");
let btnNuevo = document.getElementById("nuevo");
let btnOcultarMazo = document.getElementById("ocultarMazo");

//----------Funciones----------------------------------
//Funcion para repartir carta y asignarla al jugador correspondiente
function repartirCarta(jugador) {
    do{ //Cargo una carta al Jugador
        let numeroAzar;
        let cartaJuego;
        do{
            numeroAzar = Math.trunc(Math.random() * 51);
            cartaJuego = mazo[numeroAzar];
        }while(cartaJuego == 0);
        mazo[numeroAzar] = 0;
        if(cartaJuego.valorCarta == 1){
            jugador.cantidadCartasA += 1;
            sumarCartaA(jugador);
        }else{
            jugador.puntajeMaximo += cartaJuego.valorCarta;
            jugador.puntajeMinimo += cartaJuego.valorCarta;
        }
        cargarPuntaje(jugador);
        console.log("Puntaje " + jugador.nombre + ": " + jugador.puntaje);

        //Cargar las cartas en pantalla
        if(jugador.nombre == "croupier"){
            mostrarCartas(jugador.nombre, cartaJuego);
        }else{
            mostrarCartas("jugador", cartaJuego);
        }
        cantidadCartas += 1;
    }while(jugador.puntaje == 0);
}

//Funcion para Cerrar la Sesion
function finSesion() {
    localStorage.clear();
}

//Funcion para finalizar la partida y verificar el ganador
function plantarse() {
    let ganador;
    while(croupier.puntaje<17){
        repartirCarta(croupier);
    }
    ganador = verificarGanador(usuario1, croupier, montoApuesta);
    ganadorHTML(ganador);
    usuario1.nuevaPartida();
    croupier.nuevaPartida();
    localStorage.setItem("Jugador", JSON.stringify(usuario1));
    document.getElementsByTagName("input")[1].value = 0;
    montoApuesta = 0;
    mostrarHTML("nuevo");
    ocultarHTML("pedirCarta");
    ocultarHTML("finMano");

}

//Funcion Para empezar una nueva mano
function nuevo(){
    armarMazo();
    let elemento;
    for(i=0; i<cantidadCartas; i++){
        elemento = "cartas" + i;
        document.getElementById(elemento).remove();
    }
    cantidadCartas = 0;
    if(apuestaHTML != null){
        document.body.removeChild(apuestaHTML);
        apuestaHTML = null;
    }
    saldoHTML.textContent = "Saldo: " + usuario1.dinero;
    mostrarHTML("menuApuesta");
    mostrarHTML("mazo");
    ocultarHTML("croupier");
    ocultarHTML("jugador");
    ocultarHTML("nuevo");
    borrarGanador();
}

//Funcion para pedir carta (solo aplica al jugador, si este obtiene un puntaje >21 automaticamente se planta y pierde)
function pedirCarta() {
    repartirCarta(usuario1);
    if(usuario1.puntaje > 21){
        plantarse();
    }
}

//Funcion para contabilizar la apuesta ingresada por input
function apuesta(e) {
    e.preventDefault();

    montoApuesta = document.getElementsByTagName("input")[1].value;
    if((montoApuesta > usuario1.dinero) || (montoApuesta == parseInt(0))){
        alert("No posee saldo para realizar esa apuesta");
    }else{
        ocultarHTML("menuApuesta");
        ocultarHTML("mazo");
        mostrarHTML("pedirCarta");
        mostrarHTML("finMano");
        mostrarHTML("croupier");
        mostrarHTML("jugador");
        usuario1.apuestaJugador(montoApuesta)
        saldoHTML.textContent = "Saldo: " + usuario1.dinero;
        apuestaHTML = document.createElement("h4");
        apuestaHTML.innerHTML = "Dinero Apostado: " + montoApuesta;
        document.body.appendChild(apuestaHTML);

        //Se reparten las 2 cartas iniciales para cada uno
        repartirCarta(usuario1);
        setTimeout(function(){repartirCarta(croupier)}, 2000);
        setTimeout(function(){repartirCarta(usuario1)}, 4000);
        setTimeout(function(){repartirCarta(croupier)}, 6000);

    }
}

//Funcion para mostrar las cartas de cada jugador
function mostrarCartas(jugador, carta){
    let imagenCarta = carta.imagenCarta;
    $('#'+jugador).append(`<img style="display: none" id="cartas${cantidadCartas}" src="./multimedia/mazo/dorso.jpg">`);
    animacion1(imagenCarta);
}

//Funcion para loguearse cuando es un usuario nuevo
function login(e) {
    e.preventDefault();

    nombre = document.getElementsByTagName("input")[0].value;
    usuario1 = new Usuario(nombre, 1000);
    localStorage.setItem("Jugador", JSON.stringify(usuario1));
    ocultarHTML("login");
    mostrarHTML("datosJugador")
    mostrarDatos(usuario1);
    mostrarHTML("menuApuesta")
}

//Funcion para mostrar un codigo HTML oculto
function mostrarHTML(id){
    let html = document.getElementById(id);
    html.style.display = "block";
}

//Funcion para ocultar un codigo HTML
function ocultarHTML(id){
    let html = document.getElementById(id);
    html.style.display = "none";
}

//Funcion para mostrar el mazo completo
function mostrarMazo() {
    divMazoHTML = document.createElement("div");
    document.body.appendChild(divMazoHTML);
    mazoHTML = document.createElement("h4");
    mazoHTML.innerHTML = "Mazo";
    document.body.appendChild(mazoHTML);
    for(const cartas of mazo){
            cartaHTML = document.createElement("IMG");
            cartaHTML.setAttribute("id","cartas");
            cartaHTML.setAttribute("src",cartas.imagenCarta);
            document.body.appendChild(cartaHTML);
    }
    mostrarHTML("ocultarMazo");
    ocultarHTML("mazo");
}

//Funcion para borrar el Mazo mostrado
function ocultarMazo(){
    let borrarTitulo = document.getElementsByTagName("h4")[2];
    document.body.removeChild(borrarTitulo);
    for(i=0; i<52; i++){
        let imagenes = document.getElementById("cartas");
    document.body.removeChild(imagenes);
    }
    mostrarHTML("mazo");
    ocultarHTML("ocultarMazo");
}

//Funcion para mostrar los datos del usuario
function mostrarDatos(usuario1) {
    jugadorHTML = document.getElementById("nombreJugador");
    jugadorHTML.textContent = usuario1.nombre;
    saldoHTML.textContent = "Saldo: " + usuario1.dinero;
}

//Funcion Para mostrar quien es el ganador
function ganadorHTML(jugador){
    $('#ganador').append(`
        <h2>Ganador de la Partida</h2>
        <h3>${jugador}</h3>
    `);
    $('#ganador').fadeToggle(2000)
                 .css("color", "red")
                 .fadeToggle(2000);
}

function borrarGanador(){
    $('#ganador').empty();
}

//Animacion para mostrar la carta mostrada por el dorso y cambiarla a la imagen de la carta
function animacion1(imagenCarta){
    let carta = '#cartas'+cantidadCartas
    $(carta).fadeIn(1000, function(){
        $(carta).attr("src", imagenCarta);
    });         
}


//----------Eventos----------------------------------
$("#cerrarSesion").on("click", finSesion);
btnPedirCarta.addEventListener("click", pedirCarta);
btnPlantarse.addEventListener("click", plantarse);
btnApuesta.addEventListener("click", apuesta);
btnMazo.addEventListener("click", mostrarMazo);
btnOcultarMazo.addEventListener("click", ocultarMazo);
btnLogin.addEventListener("click", login);
btnNuevo.addEventListener("click", nuevo);

//----------Logica----------------------------------
armarMazo();

if(localStorage.key("Jugador") != null){
    ocultarHTML("login");
    usuario2 = JSON.parse(localStorage.getItem("Jugador"));
    usuario1 = new Usuario(usuario2.nombre, usuario2.dinero);
    mostrarDatos(usuario1);
    mostrarHTML("datosJugador")
    mostrarHTML("menuApuesta")
}