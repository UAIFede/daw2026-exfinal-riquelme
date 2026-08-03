'use strict';

var CLAVE_RANKING = 'memojuego-ranking';

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
    localStorage.setItem(CLAVE_RANKING, lista);
}

function borrarRanking() {
    localStorage.removeItem(CLAVE_RANKING);
}