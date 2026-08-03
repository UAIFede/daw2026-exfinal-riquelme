'use strict';

var PUNTOS_POR_PAR = 100;
var BONUS_RACHA = 20;
var PENALIZACION_ERROR_EXTRA = 5;
var BONUS_FINALIZACION = 300;
var PENALIZACION_POR_SEGUNDO = 1;

var PENALIZACION_ERROR = {
    facil: 10,
    medio: 20,
    dificil: 30
};

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
    puntaje: 0,
    rachaActual: 0,
    erroresSeguidos: 0,
    bonusRachaTotal: 0,
    penalizacionErroresTotal: 0,
    segundos: 0,
    temporizador: null,
    temporizadorIniciado: false
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
    estadoJuego.rachaActual = 0;
    estadoJuego.erroresSeguidos = 0;
    estadoJuego.bonusRachaTotal = 0;
    estadoJuego.penalizacionErroresTotal = 0;
    estadoJuego.segundos = 0;
    estadoJuego.temporizadorIniciado = false;
}

function iniciarPartida(nombre, nivel) {
    reiniciarEstado(nombre, nivel);
    renderizarTablero(estadoJuego.cartas, nivel);
    actualizarMarcador(estadoJuego);
    actualizarTiempo(0);
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

    iniciarTemporizador();
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
    var bonus;

    estadoJuego.cartas[estadoJuego.primeraCarta].emparejada = true;
    estadoJuego.cartas[estadoJuego.segundaCarta].emparejada = true;
    marcarCorrecta(estadoJuego.primeraCarta);
    marcarCorrecta(estadoJuego.segundaCarta);

    estadoJuego.paresEncontrados = estadoJuego.paresEncontrados + 1;
    estadoJuego.rachaActual = estadoJuego.rachaActual + 1;
    estadoJuego.erroresSeguidos = 0;

    if (estadoJuego.rachaActual >= 2) {
        bonus = (estadoJuego.rachaActual - 1) * BONUS_RACHA;
        estadoJuego.bonusRachaTotal = estadoJuego.bonusRachaTotal + bonus;
    }

    estadoJuego.puntaje = calcularPuntajeParcial();
    estadoJuego.primeraCarta = null;
    estadoJuego.segundaCarta = null;
    estadoJuego.tableroBloqueado = false;
    actualizarMarcador(estadoJuego);

    if (estadoJuego.paresEncontrados === estadoJuego.totalPares) {
        finalizarPartida();
    }
}

function procesarError() {
    var penalizacion;

    estadoJuego.errores = estadoJuego.errores + 1;
    estadoJuego.rachaActual = 0;
    estadoJuego.erroresSeguidos = estadoJuego.erroresSeguidos + 1;

    penalizacion = PENALIZACION_ERROR[estadoJuego.nivel] +
        ((estadoJuego.erroresSeguidos - 1) * PENALIZACION_ERROR_EXTRA);
    estadoJuego.penalizacionErroresTotal = estadoJuego.penalizacionErroresTotal + penalizacion;

    marcarIncorrecta(estadoJuego.primeraCarta);
    marcarIncorrecta(estadoJuego.segundaCarta);

    estadoJuego.puntaje = calcularPuntajeParcial();
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

function tictac() {
    estadoJuego.segundos = estadoJuego.segundos + 1;
    actualizarTiempo(estadoJuego.segundos);
}

function iniciarTemporizador() {
    if (estadoJuego.temporizadorIniciado === true) {
        return;
    }

    estadoJuego.temporizadorIniciado = true;
    estadoJuego.temporizador = window.setInterval(tictac, 1000);
}

function detenerTemporizador() {
    if (estadoJuego.temporizador !== null) {
        window.clearInterval(estadoJuego.temporizador);
        estadoJuego.temporizador = null;
    }
}

function calcularPuntajeParcial() {
    var puntaje;

    puntaje = (estadoJuego.paresEncontrados * PUNTOS_POR_PAR) +
        estadoJuego.bonusRachaTotal -
        estadoJuego.penalizacionErroresTotal;

    if (puntaje < 0) {
        return 0;
    }

    return puntaje;
}

function calcularPenalizacionTiempo() {
    return estadoJuego.segundos * PENALIZACION_POR_SEGUNDO;
}

function calcularPuntajeFinal() {
    var puntaje;

    puntaje = (estadoJuego.totalPares * PUNTOS_POR_PAR) +
        estadoJuego.bonusRachaTotal +
        BONUS_FINALIZACION -
        estadoJuego.penalizacionErroresTotal -
        calcularPenalizacionTiempo();

    if (puntaje < 0) {
        return 0;
    }

    return puntaje;
}

function armarDatosVictoria() {
    return {
        nombreJugador: estadoJuego.nombreJugador,
        nivel: estadoJuego.nivel,
        segundos: estadoJuego.segundos,
        intentos: estadoJuego.intentos,
        errores: estadoJuego.errores,
        totalPares: estadoJuego.totalPares,
        bonusRacha: estadoJuego.bonusRachaTotal,
        bonusFinalizacion: BONUS_FINALIZACION,
        penalizacionErrores: estadoJuego.penalizacionErroresTotal,
        penalizacionTiempo: calcularPenalizacionTiempo(),
        puntaje: estadoJuego.puntaje
    };
}

function finalizarPartida() {
    detenerTemporizador();
    estadoJuego.puntaje = calcularPuntajeFinal();
    actualizarMarcador(estadoJuego);
    mostrarModalVictoria(armarDatosVictoria());
}

function reiniciarPartida() {
    reiniciarEstado(estadoJuego.nombreJugador, estadoJuego.nivel);
    renderizarTablero(estadoJuego.cartas, estadoJuego.nivel);
    actualizarMarcador(estadoJuego);
    actualizarTiempo(0);
}