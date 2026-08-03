'use strict';

var elementos = {};

function inicializarInterfaz() {
    elementos.errorNombre = document.getElementById('error-nombre');
}

function mostrarErrorNombre(mensaje) {
    elementos.errorNombre.textContent = mensaje;
}

function limpiarErrorNombre() {
    elementos.errorNombre.textContent = '';
}