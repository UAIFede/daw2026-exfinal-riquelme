'use strict';

var entradaNombre = null;
var nivelSeleccionado = 'facil';
var selectorNivel = null;
var selectOrdenRanking = null;
var temaActual = 'claro';
var botonTema = null;

function iniciarAplicacion() {
    inicializarInterfaz();
    obtenerReferencias();
    aplicarPreferenciasGuardadas();
    conectarEventos();
}

function obtenerReferencias() {
    entradaNombre = document.getElementById('entrada-nombre');
    selectorNivel = document.getElementById('selector-nivel');
    selectOrdenRanking = document.getElementById('orden-ranking');
    botonTema = document.getElementById('boton-tema');
}

function conectarEventos() {
    document.getElementById('formulario-inicio').addEventListener('submit', manejarEnvioInicio);
    document.getElementById('tablero').addEventListener('click', manejarClickTablero);
    document.getElementById('boton-jugar-otra').addEventListener('click', manejarClickJugarOtra);
    document.getElementById('boton-reiniciar').addEventListener('click', manejarClickReiniciar);
    document.getElementById('boton-nueva').addEventListener('click', manejarClickNueva);
    document.getElementById('boton-ranking-inicio').addEventListener('click', manejarClickAbrirRanking);
    document.getElementById('boton-ranking-juego').addEventListener('click', manejarClickAbrirRanking);
    document.getElementById('boton-ver-ranking-victoria').addEventListener('click', manejarClickAbrirRanking);
    document.getElementById('boton-cerrar-ranking').addEventListener('click', manejarClickCerrarRanking);
    document.getElementById('boton-borrar-ranking').addEventListener('click', manejarClickBorrar);
    document.getElementById('boton-confirmar-borrado').addEventListener('click', manejarClickConfirmarBorrado);
    document.getElementById('boton-cancelar-borrado').addEventListener('click', manejarClickCancelarBorrado);
    selectorNivel.addEventListener('click', manejarClickNivel);
    entradaNombre.addEventListener('input', limpiarErrorNombre);
    selectOrdenRanking.addEventListener('change', manejarCambioOrden);
    botonTema.addEventListener('click', manejarClickTema);
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

function manejarClickTablero(evento) {
    var carta;
    var indice;

    carta = evento.target.closest('.carta');
    if (carta === null) {
        return;
    }

    indice = parseInt(carta.getAttribute('data-indice'), 10);
    seleccionarCarta(indice);
}

function manejarClickJugarOtra() {
    ocultarModalVictoria();
    reiniciarPartida();
}

function manejarClickReiniciar() {
    reiniciarPartida();
}

function manejarClickNueva() {
    detenerTemporizador();
    mostrarPantallaInicio();
}

function manejarClickAbrirRanking() {
    renderizarRanking(leerRanking(), selectOrdenRanking.value);
    mostrarModalRanking();
}

function manejarClickCerrarRanking() {
    ocultarModalRanking();
}

function manejarCambioOrden() {
    renderizarRanking(leerRanking(), selectOrdenRanking.value);
}

function manejarClickBorrar() {
    mostrarModalConfirmacion();
}

function manejarClickConfirmarBorrado() {
    borrarRanking();
    ocultarModalConfirmacion();
    renderizarRanking(leerRanking(), selectOrdenRanking.value);
}

function manejarClickCancelarBorrado() {
    ocultarModalConfirmacion();
}

function aplicarPreferenciasGuardadas() {
    var temaGuardado;

    temaGuardado = leerPreferenciaTema();
    if (temaGuardado === 'oscuro') {
        temaActual = 'oscuro';
    }
    aplicarTema(temaActual);
    actualizarIconoTema();
}


function manejarClickTema() {
    if (temaActual === 'oscuro') {
        temaActual = 'claro';
    } else {
        temaActual = 'oscuro';
    }

    aplicarTema(temaActual);
    guardarPreferenciaTema(temaActual);
    actualizarIconoTema();
}

function actualizarIconoTema() {
    var glifo;

    glifo = botonTema.querySelector('.icono-boton');
    if (temaActual === 'oscuro') {
        glifo.src = IMAGEN_TEMA_CLARO;
    } else {
        glifo.src = IMAGEN_TEMA_OSCURO;
    }
}

document.addEventListener('DOMContentLoaded', iniciarAplicacion);