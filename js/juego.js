'use strict';

var PARES_POR_NIVEL = {
    facil: 8,
    medio: 10,
    dificil: 18
};

var SIMBOLOS = [
    { archivo: 'boca_jrs.svg', nombre: 'Boca Juniors' },
    { archivo: 'river_plate.svg', nombre: 'River Plate' },
    { archivo: 'independiente.svg', nombre: 'Independiente' },
    { archivo: 'racing.svg', nombre: 'Racing Club' },
    { archivo: 'san_lorenzo.svg', nombre: 'San Lorenzo' },
    { archivo: 'huracan.svg', nombre: 'Huracán' },
    { archivo: 'velez.svg', nombre: 'Vélez Sarsfield' },
    { archivo: 'estudiantes.svg', nombre: 'Estudiantes de La Plata' },
    { archivo: 'gimnasia.svg', nombre: 'Gimnasia y Esgrima La Plata' },
    { archivo: 'rosario_central.svg', nombre: 'Rosario Central' },
    { archivo: 'newells.svg', nombre: 'Newell\'s Old Boys' },
    { archivo: 'talleres.svg', nombre: 'Talleres' },
    { archivo: 'belgrano.svg', nombre: 'Belgrano' },
    { archivo: 'lanus.svg', nombre: 'Lanús' },
    { archivo: 'banfield.svg', nombre: 'Banfield' },
    { archivo: 'tigre.svg', nombre: 'Tigre' },
    { archivo: 'defensa.svg', nombre: 'Defensa y Justicia' },
    { archivo: 'argentinos_jrs.svg', nombre: 'Argentinos Juniors' }
];

function mezclarArreglo(arreglo) {
    var indice;
    var aleatorio;
    var temporal;

    for (indice = arreglo.length - 1; indice > 0; indice = indice - 1) {
        aleatorio = Math.floor(Math.random() * (indice + 1));
        temporal = arreglo[indice];
        arreglo[indice] = arreglo[aleatorio];
        arreglo[aleatorio] = temporal;
    }

    return arreglo;
}

function crearCartas(nivel) {
    var totalPares;
    var cartas;
    var indice;
    var simbolo;

    totalPares = PARES_POR_NIVEL[nivel];
    cartas = [];

    for (indice = 0; indice < totalPares; indice = indice + 1) {
        simbolo = SIMBOLOS[indice];
        cartas.push({ archivo: simbolo.archivo, nombre: simbolo.nombre, parId: indice, emparejada: false });
        cartas.push({ archivo: simbolo.archivo, nombre: simbolo.nombre, parId: indice, emparejada: false });
    }

    return mezclarArreglo(cartas);
}

var estadoJuego = {
    nombreJugador: '',
    nivel: 'facil',
    cartas: [],
    totalPares: 0,
    primeraCarta: null,
    segundaCarta: null,
    tableroBloqueado: false,
    intentos: 0,
    errores: 0,
    paresEncontrados: 0,
    puntaje: 0
};

function reiniciarEstado(nombre, nivel) {
    estadoJuego.nombreJugador = nombre;
    estadoJuego.nivel = nivel;
    estadoJuego.totalPares = PARES_POR_NIVEL[nivel];
    estadoJuego.cartas = crearCartas(nivel);
    estadoJuego.primeraCarta = null;
    estadoJuego.segundaCarta = null;
    estadoJuego.tableroBloqueado = false;
    estadoJuego.intentos = 0;
    estadoJuego.errores = 0;
    estadoJuego.paresEncontrados = 0;
    estadoJuego.puntaje = 0;
}

function iniciarPartida(nombre, nivel) {
    reiniciarEstado(nombre, nivel);
    renderizarTablero(estadoJuego.cartas, nivel);
    actualizarMarcador(estadoJuego);
    mostrarPantallaJuego();
}

function seleccionarCarta(indice) {
    var carta;

    if (estadoJuego.tableroBloqueado === true) {
        return;
    }

    carta = estadoJuego.cartas[indice];
    if (carta.emparejada === true) {
        return;
    }
    if (indice === estadoJuego.primeraCarta) {
        return;
    }

    voltearCarta(indice, carta.nombre);

    if (estadoJuego.primeraCarta === null) {
        estadoJuego.primeraCarta = indice;
        return;
    }

    estadoJuego.segundaCarta = indice;
    estadoJuego.intentos = estadoJuego.intentos + 1;
    estadoJuego.tableroBloqueado = true;
    verificarPar();
}

function verificarPar() {
    var primera;
    var segunda;

    primera = estadoJuego.cartas[estadoJuego.primeraCarta];
    segunda = estadoJuego.cartas[estadoJuego.segundaCarta];

    if (primera.parId === segunda.parId) {
        procesarAcierto();
    } else {
        procesarError();
    }
}

function procesarAcierto() {
    estadoJuego.cartas[estadoJuego.primeraCarta].emparejada = true;
    estadoJuego.cartas[estadoJuego.segundaCarta].emparejada = true;
    marcarCorrecta(estadoJuego.primeraCarta);
    marcarCorrecta(estadoJuego.segundaCarta);

    estadoJuego.paresEncontrados = estadoJuego.paresEncontrados + 1;
    estadoJuego.primeraCarta = null;
    estadoJuego.segundaCarta = null;
    estadoJuego.tableroBloqueado = false;
    actualizarMarcador(estadoJuego);
}

function procesarError() {
    estadoJuego.errores = estadoJuego.errores + 1;
    marcarIncorrecta(estadoJuego.primeraCarta);
    marcarIncorrecta(estadoJuego.segundaCarta);
    actualizarMarcador(estadoJuego);

    window.setTimeout(ocultarCartasNoCoincidentes, 900);
}

function ocultarCartasNoCoincidentes() {
    desvoltearCarta(estadoJuego.primeraCarta);
    desvoltearCarta(estadoJuego.segundaCarta);
    estadoJuego.primeraCarta = null;
    estadoJuego.segundaCarta = null;
    estadoJuego.tableroBloqueado = false;
}