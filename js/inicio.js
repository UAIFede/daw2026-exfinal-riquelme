'use strict';

var entradaNombre = null;
var nivelSeleccionado = 'facil';
var selectorNivel = null;

function iniciarAplicacion() {
    inicializarInterfaz();
    obtenerReferencias();
    conectarEventos();
}

function obtenerReferencias() {
    entradaNombre = document.getElementById('entrada-nombre');
    selectorNivel = document.getElementById('selector-nivel');
}

function conectarEventos() {
    document.getElementById('formulario-inicio').addEventListener('submit', manejarEnvioInicio);
    selectorNivel.addEventListener('click', manejarClickNivel);
    entradaNombre.addEventListener('input', limpiarErrorNombre);
}

function manejarEnvioInicio(evento) {
    var nombre;
    var resultado;

    evento.preventDefault();
    nombre = entradaNombre.value;
    resultado = validarNombreJugador(nombre);

    if (resultado.valido === false) {
        mostrarErrorNombre(resultado.mensaje);
        return;
    }

    limpiarErrorNombre();
    iniciarPartida(nombre.trim(), nivelSeleccionado);
}

function manejarClickNivel(evento) {
    var opcion;
    var opciones;
    var indice;

    opcion = evento.target.closest('.opcion-nivel');
    if (opcion === null) {
        return;
    }

    nivelSeleccionado = opcion.getAttribute('data-nivel');
    opciones = selectorNivel.querySelectorAll('.opcion-nivel');

    for (indice = 0; indice < opciones.length; indice = indice + 1) {
        opciones[indice].classList.remove('opcion-nivel-activa');
        opciones[indice].setAttribute('aria-checked', 'false');
    }

    opcion.classList.add('opcion-nivel-activa');
    opcion.setAttribute('aria-checked', 'true');
}

document.addEventListener('DOMContentLoaded', iniciarAplicacion);