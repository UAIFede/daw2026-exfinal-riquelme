'use strict';

var LARGO_MINIMO_NOMBRE = 3;

function validarNombreJugador(nombre) {
    var limpio;

    limpio = nombre.trim();
    if (limpio.length === 0) {
        return { valido: false, mensaje: 'Ingresá tu nombre para empezar.' };
    }
    if (limpio.length < LARGO_MINIMO_NOMBRE) {
        return { valido: false, mensaje: 'El nombre debe tener al menos 3 caracteres.' };
    }

    return { valido: true, mensaje: '' };
}