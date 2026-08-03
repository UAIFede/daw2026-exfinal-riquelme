'use strict';

var elementos = {};
var elementosCarta = [];
var RUTA_IMAGENES = 'assets/imagenes/';
var RUTA_ESCUDOS = RUTA_IMAGENES + 'equipos/';
var IMAGEN_DORSO = RUTA_IMAGENES + 'pelota_carta.svg';

function inicializarInterfaz() {
    elementos.pantallaInicio = document.getElementById('pantalla-inicio');
    elementos.pantallaJuego = document.getElementById('pantalla-juego');
    elementos.tablero = document.getElementById('tablero');
    elementos.errorNombre = document.getElementById('error-nombre');
}

function mostrarErrorNombre(mensaje) {
    elementos.errorNombre.textContent = mensaje;
}

function limpiarErrorNombre() {
    elementos.errorNombre.textContent = '';
}

function crearElementoCarta(carta, indice) {
    var boton;
    var interior;
    var dorso;
    var imagenDorso;
    var frente;
    var imagenEscudo;

    boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'carta';
    boton.setAttribute('data-indice', indice);
    boton.setAttribute('aria-label', 'Carta oculta');

    interior = document.createElement('span');
    interior.className = 'interior-carta';

    dorso = document.createElement('span');
    dorso.className = 'cara-carta cara-dorso';
    dorso.setAttribute('aria-hidden', 'true');

    imagenDorso = document.createElement('img');
    imagenDorso.src = IMAGEN_DORSO;
    imagenDorso.alt = '';
    dorso.appendChild(imagenDorso);

    frente = document.createElement('span');
    frente.className = 'cara-carta cara-frente';

    imagenEscudo = document.createElement('img');
    imagenEscudo.className = 'imagen-carta';
    imagenEscudo.src = RUTA_ESCUDOS + carta.archivo;
    imagenEscudo.alt = carta.nombre;
    frente.appendChild(imagenEscudo);

    interior.appendChild(dorso);
    interior.appendChild(frente);
    boton.appendChild(interior);

    return boton;
}

function renderizarTablero(cartas, nivel) {
    var indice;
    var elementoCarta;

    elementos.tablero.textContent = '';
    elementos.tablero.className = 'tablero tablero-' + nivel;
    elementosCarta = [];

    for (indice = 0; indice < cartas.length; indice = indice + 1) {
        elementoCarta = crearElementoCarta(cartas[indice], indice);
        elementos.tablero.appendChild(elementoCarta);
        elementosCarta.push(elementoCarta);
    }
}

function mostrarPantallaJuego() {
    elementos.pantallaInicio.classList.add('oculto');
    elementos.pantallaJuego.classList.remove('oculto');
}