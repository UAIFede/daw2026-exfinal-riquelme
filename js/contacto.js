'use strict';

var MAIL_DESTINO = 'contacto@memojuego.com';
var IMAGEN_TEMA_CLARO = '../assets/imagenes/sol.svg';
var IMAGEN_TEMA_OSCURO = '../assets/imagenes/luna.svg';
var entradaNombre = null;
var entradaMail = null;
var entradaMensaje = null;
var errorNombre = null;
var errorMail = null;
var errorMensaje = null;
var mensajeExito = null;
var botonTemaContacto = null;
var temaActualContacto = 'claro';

function iniciarContacto() {
    obtenerReferenciasContacto();
    aplicarTemaContacto();
    conectarEventosContacto();
}

function obtenerReferenciasContacto() {
    entradaNombre = document.getElementById('contacto-nombre');
    entradaMail = document.getElementById('contacto-mail');
    entradaMensaje = document.getElementById('contacto-mensaje');
    errorNombre = document.getElementById('error-contacto-nombre');
    errorMail = document.getElementById('error-contacto-mail');
    errorMensaje = document.getElementById('error-contacto-mensaje');
    mensajeExito = document.getElementById('exito-contacto');
    botonTemaContacto = document.getElementById('boton-tema');
}

function aplicarTemaContacto() {
    var glifo;

    if (leerPreferenciaTema() === 'oscuro') {
        temaActualContacto = 'oscuro';
        document.body.classList.add('tema-oscuro');
    }

    glifo = botonTemaContacto.querySelector('.icono-boton');
    if (temaActualContacto === 'oscuro') {
        glifo.src = IMAGEN_TEMA_CLARO;
    } else {
        glifo.src = IMAGEN_TEMA_OSCURO;
    }
}

function conectarEventosContacto() {
    document.getElementById('formulario-contacto').addEventListener('submit', manejarEnvioContacto);
    entradaNombre.addEventListener('input', limpiarErroresContacto);
    entradaMail.addEventListener('input', limpiarErroresContacto);
    entradaMensaje.addEventListener('input', limpiarErroresContacto);
    botonTemaContacto.addEventListener('click', manejarClickTemaContacto);
}

function limpiarErroresContacto() {
    errorNombre.textContent = '';
    errorMail.textContent = '';
    errorMensaje.textContent = '';
    mensajeExito.textContent = '';
}

function manejarEnvioContacto(evento) {
    var resultadoNombre;
    var resultadoMail;
    var resultadoMensaje;
    var todoValido;

    evento.preventDefault();
    limpiarErroresContacto();
    todoValido = true;

    resultadoNombre = validarNombreContacto(entradaNombre.value);
    if (resultadoNombre.valido === false) {
        errorNombre.textContent = resultadoNombre.mensaje;
        todoValido = false;
    }

    resultadoMail = validarMail(entradaMail.value);
    if (resultadoMail.valido === false) {
        errorMail.textContent = resultadoMail.mensaje;
        todoValido = false;
    }

    resultadoMensaje = validarMensaje(entradaMensaje.value);
    if (resultadoMensaje.valido === false) {
        errorMensaje.textContent = resultadoMensaje.mensaje;
        todoValido = false;
    }

    if (todoValido === false) {
        return;
    }

    abrirClienteCorreo(entradaNombre.value.trim(), entradaMail.value.trim(), entradaMensaje.value.trim());
    mensajeExito.textContent = 'Se abrió tu cliente de correo con el mensaje listo para enviar.';
    document.getElementById('formulario-contacto').reset();
}

function abrirClienteCorreo(nombre, mail, mensaje) {
    var asunto;
    var cuerpo;
    var enlace;

    asunto = encodeURIComponent('Consulta desde memoJuego');
    cuerpo = encodeURIComponent('Nombre: ' + nombre + '\nMail: ' + mail + '\n\n' + mensaje);
    enlace = 'mailto:' + MAIL_DESTINO + '?subject=' + asunto + '&body=' + cuerpo;

    window.location.href = enlace;
}

function manejarClickTemaContacto() {
    var glifo;

    if (temaActualContacto === 'oscuro') {
        temaActualContacto = 'claro';
        document.body.classList.remove('tema-oscuro');
    } else {
        temaActualContacto = 'oscuro';
        document.body.classList.add('tema-oscuro');
    }

    guardarPreferenciaTema(temaActualContacto);
    glifo = botonTemaContacto.querySelector('.icono-boton');
    if (temaActualContacto === 'oscuro') {
        glifo.src = IMAGEN_TEMA_CLARO;
    } else {
        glifo.src = IMAGEN_TEMA_OSCURO;
    }
}

document.addEventListener('DOMContentLoaded', iniciarContacto);