'use strict';

var CLAVE_RANKING = 'memojuego-ranking';
var CLAVE_TEMA = 'memojuego-tema';
var CLAVE_SONIDO = 'memojuego-sonido';

function leerRanking() {
    var crudo;
    var lista;

    crudo = localStorage.getItem(CLAVE_RANKING);
    if (crudo === null) {
        return [];
    }

    try {
        lista = JSON.parse(crudo);
    } catch (error) {
        lista = [];
    }

    if (Array.isArray(lista) === false) {
        return [];
    }

    return lista;
}

function guardarResultado(resultado) {
    var lista;

    lista = leerRanking();
    lista.push(resultado);
    localStorage.setItem(CLAVE_RANKING, JSON.stringify(lista));
}

function borrarRanking() {
    localStorage.removeItem(CLAVE_RANKING);
}

function leerPreferenciaTema() {
    return localStorage.getItem(CLAVE_TEMA);
}

function guardarPreferenciaTema(tema) {
    localStorage.setItem(CLAVE_TEMA, tema);
}

function leerPreferenciaSonido() {
    return localStorage.getItem(CLAVE_SONIDO);
}

function guardarPreferenciaSonido(valor) {
    localStorage.setItem(CLAVE_SONIDO, valor);
}