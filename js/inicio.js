'use strict';

var entradaNombre = null;

function iniciarAplicacion() {
    inicializarInterfaz();
    obtenerReferencias();
    conectarEventos();
}

function obtenerReferencias() {
    entradaNombre = document.getElementById('entrada-nombre');
}

function conectarEventos() {
    document.getElementById('formulario-inicio').addEventListener('submit', manejarEnvioInicio);
    entradaNombre.addEventListener('input', limpiarErrorNombre);
}

function manejarEnvioInicio(evento) {
    var nombre;
    var resultado;

    nombre = entradaNombre.value;
    resultado = validarNombreJugador(nombre);

    if (resultado.valido === false) {
        mostrarErrorNombre(resultado.mensaje);
        return;
    }

    limpiarErrorNombre();
}

document.addEventListener('DOMContentLoaded', iniciarAplicacion);