'use strict';

var elementos = {};
var elementosCarta = [];
var RUTA_IMAGENES = 'assets/imagenes/';
var RUTA_ESCUDOS = RUTA_IMAGENES + 'equipos/';
var IMAGEN_DORSO = RUTA_IMAGENES + 'pelota_carta.svg';
var IMAGEN_TEMA_CLARO = RUTA_IMAGENES + 'sol.svg';
var IMAGEN_TEMA_OSCURO = RUTA_IMAGENES + 'luna.svg';

function inicializarInterfaz() {
    elementos.pantallaInicio = document.getElementById('pantalla-inicio');
    elementos.pantallaJuego = document.getElementById('pantalla-juego');
    elementos.tablero = document.getElementById('tablero');
    elementos.datoJugador = document.getElementById('dato-jugador');
    elementos.datoPuntaje = document.getElementById('dato-puntaje');
    elementos.datoPares = document.getElementById('dato-pares');
    elementos.datoIntentos = document.getElementById('dato-intentos');
    elementos.datoErrores = document.getElementById('dato-errores');
    elementos.errorNombre = document.getElementById('error-nombre');
    elementos.datoTiempo = document.getElementById('dato-tiempo');
    elementos.modalVictoria = document.getElementById('modal-victoria');
    elementos.resumenVictoria = document.getElementById('resumen-victoria');
    elementos.detallePuntaje = document.getElementById('detalle-puntaje');
    elementos.modalRanking = document.getElementById('modal-ranking');
    elementos.rankingTabla = document.getElementById('ranking-tabla');
    elementos.modalConfirmacion = document.getElementById('modal-confirmacion');
}

function mostrarErrorNombre(mensaje) {
    elementos.errorNombre.textContent = mensaje;
}

function limpiarErrorNombre() {
    elementos.errorNombre.textContent = '';
}

function crearElementoCarta(carta, indice) {
    var boton;
    var interior;
    var dorso;
    var imagenDorso;
    var frente;
    var imagenEscudo;

    boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'carta';
    boton.setAttribute('data-indice', indice);
    boton.setAttribute('aria-label', 'Carta oculta');

    interior = document.createElement('span');
    interior.className = 'interior-carta';

    dorso = document.createElement('span');
    dorso.className = 'cara-carta cara-dorso';
    dorso.setAttribute('aria-hidden', 'true');

    imagenDorso = document.createElement('img');
    imagenDorso.src = IMAGEN_DORSO;
    imagenDorso.alt = '';
    dorso.appendChild(imagenDorso);

    frente = document.createElement('span');
    frente.className = 'cara-carta cara-frente';

    imagenEscudo = document.createElement('img');
    imagenEscudo.className = 'imagen-carta';
    imagenEscudo.src = RUTA_ESCUDOS + carta.archivo;
    imagenEscudo.alt = carta.nombre;
    frente.appendChild(imagenEscudo);

    interior.appendChild(dorso);
    interior.appendChild(frente);
    boton.appendChild(interior);

    return boton;
}

function renderizarTablero(cartas, nivel) {
    var indice;
    var elementoCarta;

    elementos.tablero.textContent = '';
    elementos.tablero.className = 'tablero tablero-' + nivel;
    elementosCarta = [];

    for (indice = 0; indice < cartas.length; indice = indice + 1) {
        elementoCarta = crearElementoCarta(cartas[indice], indice);
        elementos.tablero.appendChild(elementoCarta);
        elementosCarta.push(elementoCarta);
    }
}

function mostrarPantallaJuego() {
    elementos.pantallaInicio.classList.add('oculto');
    elementos.pantallaJuego.classList.remove('oculto');
}

function voltearCarta(indice, nombre) {
    var carta;

    carta = elementosCarta[indice];
    carta.classList.add('esta-volteada');
    carta.setAttribute('aria-label', 'Carta: ' + nombre);
}

function desvoltearCarta(indice) {
    var carta;

    carta = elementosCarta[indice];
    carta.classList.remove('esta-volteada');
    carta.classList.remove('es-incorrecta');
    carta.setAttribute('aria-label', 'Carta oculta');
}

function marcarCorrecta(indice) {
    var carta;

    carta = elementosCarta[indice];
    carta.classList.add('es-correcta');
    carta.disabled = true;
}

function marcarIncorrecta(indice) {
    elementosCarta[indice].classList.add('es-incorrecta');
}

function actualizarMarcador(estado) {
    elementos.datoJugador.textContent = estado.nombreJugador;
    elementos.datoPuntaje.textContent = estado.puntaje;
    elementos.datoPares.textContent = estado.paresEncontrados + ' / ' + estado.totalPares;
    elementos.datoIntentos.textContent = estado.intentos;
    elementos.datoErrores.textContent = estado.errores;
}

function actualizarTiempo(segundos) {
    elementos.datoTiempo.textContent = formatearTiempo(segundos);
}

function formatearTiempo(segundos) {
    var minutos;
    var resto;

    minutos = Math.floor(segundos / 60);
    resto = segundos % 60;

    return rellenarDosDigitos(minutos) + ':' + rellenarDosDigitos(resto);
}

function rellenarDosDigitos(numero) {
    if (numero < 10) {
        return '0' + numero;
    }

    return '' + numero;
}

function nombrarNivel(nivel) {
    if (nivel === 'facil') {
        return 'Fácil';
    }
    if (nivel === 'medio') {
        return 'Medio';
    }

    return 'Difícil';
}

function crearFilaDetalle(etiqueta, valor, esTotal) {
    var fila;
    var nodoEtiqueta;
    var nodoValor;

    fila = document.createElement('div');
    fila.className = 'fila-puntaje';
    if (esTotal === true) {
        fila.className = 'fila-puntaje fila-puntaje-total';
    }

    nodoEtiqueta = document.createElement('span');
    nodoEtiqueta.textContent = etiqueta;

    nodoValor = document.createElement('span');
    nodoValor.textContent = valor;

    fila.appendChild(nodoEtiqueta);
    fila.appendChild(nodoValor);

    return fila;
}

function mostrarModalVictoria(datos) {
    elementos.resumenVictoria.textContent = '¡Muy bien, ' + datos.nombreJugador +
        '! Completaste el nivel ' + nombrarNivel(datos.nivel) + '.';

    elementos.detallePuntaje.textContent = '';
    elementos.detallePuntaje.appendChild(crearFilaDetalle('Tiempo total', formatearTiempo(datos.segundos), false));
    elementos.detallePuntaje.appendChild(crearFilaDetalle('Intentos', datos.intentos, false));
    elementos.detallePuntaje.appendChild(crearFilaDetalle('Errores', datos.errores, false));
    elementos.detallePuntaje.appendChild(crearFilaDetalle('Pares (' + datos.totalPares + ' x 100)', '+' + (datos.totalPares * 100), false));
    elementos.detallePuntaje.appendChild(crearFilaDetalle('Bonus por racha', '+' + datos.bonusRacha, false));
    elementos.detallePuntaje.appendChild(crearFilaDetalle('Bonus por finalizar', '+' + datos.bonusFinalizacion, false));
    elementos.detallePuntaje.appendChild(crearFilaDetalle('Penalización por errores', '-' + datos.penalizacionErrores, false));
    elementos.detallePuntaje.appendChild(crearFilaDetalle('Penalización por tiempo', '-' + datos.penalizacionTiempo, false));
    elementos.detallePuntaje.appendChild(crearFilaDetalle('Puntaje final', datos.puntaje, true));

    elementos.modalVictoria.classList.remove('oculto');
}

function ocultarModalVictoria() {
    elementos.modalVictoria.classList.add('oculto');
}

function mostrarPantallaInicio() {
    elementos.pantallaJuego.classList.add('oculto');
    elementos.pantallaInicio.classList.remove('oculto');
}

function formatearFecha(marcaTiempo) {
    var fecha;

    fecha = new Date(marcaTiempo);

    return rellenarDosDigitos(fecha.getDate()) + '/' +
        rellenarDosDigitos(fecha.getMonth() + 1) + '/' +
        fecha.getFullYear() + ' ' +
        rellenarDosDigitos(fecha.getHours()) + ':' +
        rellenarDosDigitos(fecha.getMinutes());
}

function comparadorPuntaje(a, b) {
    return b.puntaje - a.puntaje;
}

function comparadorFecha(a, b) {
    return b.marcaTiempo - a.marcaTiempo;
}

function comparadorDuracion(a, b) {
    return a.duracionSegundos - b.duracionSegundos;
}

function comparadorNivel(a, b) {
    var pesoA;
    var pesoB;
    var diferencia;

    if (a.nivel === 'dificil') {
        pesoA = 3;
    } else if (a.nivel === 'medio') {
        pesoA = 2;
    } else {
        pesoA = 1;
    }

    if (b.nivel === 'dificil') {
        pesoB = 3;
    } else if (b.nivel === 'medio') {
        pesoB = 2;
    } else {
        pesoB = 1;
    }

    diferencia = pesoB - pesoA;
    if (diferencia !== 0) {
        return diferencia;
    }

    return b.puntaje - a.puntaje;
}

function ordenarRanking(lista, criterio) {
    var copia;

    copia = lista.slice();
    if (criterio === 'fecha') {
        copia.sort(comparadorFecha);
    } else if (criterio === 'duracion') {
        copia.sort(comparadorDuracion);
    } else if (criterio === 'nivel') {
        copia.sort(comparadorNivel);
    } else {
        copia.sort(comparadorPuntaje);
    }

    return copia;
}

function crearFilaRanking(resultado, posicion) {
    var fila;
    var nodoPosicion;
    var nodoDatos;
    var nodoNombre;
    var nodoMeta;
    var nodoPuntaje;

    fila = document.createElement('div');
    fila.className = 'ranking-fila';

    nodoPosicion = document.createElement('span');
    nodoPosicion.className = 'posicion-fila';
    nodoPosicion.textContent = posicion;

    nodoDatos = document.createElement('div');
    nodoDatos.className = 'datos-fila';

    nodoNombre = document.createElement('span');
    nodoNombre.className = 'nombre-fila';
    nodoNombre.textContent = resultado.nombre;

    nodoMeta = document.createElement('span');
    nodoMeta.className = 'meta-fila';
    nodoMeta.textContent = nombrarNivel(resultado.nivel) + ' · ' +
        formatearTiempo(resultado.duracionSegundos) + ' · ' +
        formatearFecha(resultado.marcaTiempo);

    nodoPuntaje = document.createElement('span');
    nodoPuntaje.className = 'puntaje-fila';
    nodoPuntaje.textContent = resultado.puntaje;

    nodoDatos.appendChild(nodoNombre);
    nodoDatos.appendChild(nodoMeta);
    fila.appendChild(nodoPosicion);
    fila.appendChild(nodoDatos);
    fila.appendChild(nodoPuntaje);

    return fila;
}

function renderizarRanking(lista, criterio) {
    var ordenada;
    var indice;
    var vacio;

    elementos.rankingTabla.textContent = '';

    if (lista.length === 0) {
        vacio = document.createElement('p');
        vacio.className = 'ranking-vacio';
        vacio.textContent = 'Todavía no hay partidas guardadas. ¡Jugá una para aparecer acá!';
        elementos.rankingTabla.appendChild(vacio);
        return;
    }

    ordenada = ordenarRanking(lista, criterio);
    for (indice = 0; indice < ordenada.length; indice = indice + 1) {
        elementos.rankingTabla.appendChild(crearFilaRanking(ordenada[indice], indice + 1));
    }
}

function mostrarModalRanking() {
    elementos.modalRanking.classList.remove('oculto');
}

function ocultarModalRanking() {
    elementos.modalRanking.classList.add('oculto');
}

function mostrarModalConfirmacion() {
    elementos.modalConfirmacion.classList.remove('oculto');
}

function ocultarModalConfirmacion() {
    elementos.modalConfirmacion.classList.add('oculto');
}

function aplicarTema(tema) {
    if (tema === 'oscuro') {
        document.body.classList.add('tema-oscuro');
    } else {
        document.body.classList.remove('tema-oscuro');
    }
}