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

    for (indice = 0; indice <= totalPares; indice = indice + 1) {
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
    totalPares: 0
};

function reiniciarEstado(nombre, nivel) {
    estadoJuego.nombreJugador = nombre;
    estadoJuego.nivel = nivel;
    estadoJuego.totalPares = PARES_POR_NIVEL[nivel];
    estadoJuego.cartas = crearCartas(nivel);
}

function iniciarPartida(nombre, nivel) {
    reiniciarEstado(nombre, nivel);
    renderizarTablero(estadoJuego.cartas, nivel);
    mostrarPantallaJuego();
}