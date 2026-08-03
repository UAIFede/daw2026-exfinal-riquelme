'use strict';

var LARGO_MINIMO_NOMBRE = 3;
var LARGO_MINIMO_MENSAJE = 5;
var EXPRESION_MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var EXPRESION_ALFANUMERICA = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]+$/;

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

function validarNombreContacto(nombre) {
    var limpio;

    limpio = nombre.trim();
    if (limpio.length === 0) {
        return { valido: false, mensaje: 'Ingresá tu nombre.' };
    }
    if (EXPRESION_ALFANUMERICA.test(limpio) === false) {
        return { valido: false, mensaje: 'El nombre solo puede tener letras y números.' };
    }

    return { valido: true, mensaje: '' };
}

function validarMail(mail) {
    var limpio;

    limpio = mail.trim();
    if (limpio.length === 0) {
        return { valido: false, mensaje: 'Ingresá tu correo.' };
    }
    if (EXPRESION_MAIL.test(limpio) === false) {
        return { valido: false, mensaje: 'El correo no tiene un formato válido.' };
    }

    return { valido: true, mensaje: '' };
}

function validarMensaje(mensaje) {
    var limpio;

    limpio = mensaje.trim();
    if (limpio.length <= LARGO_MINIMO_MENSAJE) {
        return { valido: false, mensaje: 'El mensaje debe tener más de 5 caracteres.' };
    }

    return { valido: true, mensaje: '' };
}