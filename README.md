# memoJuego — Juego de memoria (Memotest)

Proyecto Final de la materia **Desarrollo y Arquitecturas Web** — Universidad Abierta Interamericana, 2026.

## Descripción

memoJuego es un juego de memoria (memotest) desarrollado con **HTML5, CSS3 y JavaScript ES5**, sin frameworks ni librerías externas para la lógica del juego. El jugador debe encontrar todos los pares de cartas iguales en el menor tiempo y con la menor cantidad de errores posible. El puntaje, el tiempo, los intentos y los errores se actualizan en pantalla en tiempo real.

## Temática

**Escudos de clubes de fútbol argentino.** Cada carta muestra el escudo de un club (Boca Juniors, River Plate, Racing Club, Independiente, San Lorenzo, Vélez Sarsfield, Estudiantes de La Plata, Gimnasia y Esgrima La Plata, Newell's Old Boys, Rosario Central, Huracán, Banfield, Belgrano, Talleres, Tigre, Lanús, Argentinos Juniors y Defensa y Justicia), como imagen SVG guardada en `assets/imagenes/equipos/`. El dorso de todas las cartas es la misma pelota (`assets/imagenes/pelota_carta.svg`). La temática se puede cambiar fácilmente editando un único arreglo (ver la sección "Cómo cambiar la temática").

## Reglas del juego

1. El jugador ingresa su nombre (mínimo 3 caracteres) y elige un nivel de dificultad.
2. Todas las cartas empiezan dadas vuelta (boca abajo).
3. En cada turno se pueden dar vuelta hasta **dos** cartas.
4. Si las dos cartas forman un par, quedan descubiertas.
5. Si no coinciden, se vuelven a ocultar luego de un instante.
6. No se puede volver a seleccionar una carta ya emparejada ni la misma carta dos veces en el mismo turno.
7. El cronómetro arranca al descubrir la primera carta y se detiene al ganar.
8. La partida termina cuando se encuentran todos los pares.

### Niveles de dificultad

| Nivel   | Tablero | Pares | Penalización por error |
|---------|---------|-------|------------------------|
| Fácil   | 4 x 4   | 8     | -10 puntos             |
| Medio   | 4 x 5   | 10    | -20 puntos             |
| Difícil | 6 x 6   | 18    | -30 puntos             |

## Sistema de puntaje

El puntaje se muestra durante la partida y se calcula de forma definitiva al ganar.

**Componentes:**

- **Par encontrado:** +100 puntos por cada par.
- **Bonus por racha:** por cada acierto consecutivo a partir del segundo, se suman `(racha - 1) × 20` puntos. Premia encadenar aciertos sin errar.
- **Bonus por finalizar:** +300 puntos al completar el tablero.
- **Penalización por error (progresiva):** cada error resta la penalización base del nivel (10 / 20 / 30) más `(errores_seguidos - 1) × 5` puntos extra. Errar muchas veces seguidas duele más.
- **Penalización por tiempo:** -1 punto por cada segundo transcurrido, aplicada al finalizar.

**Fórmula del puntaje final:**

```
puntaje_final = (pares × 100)
              + bonus_racha_total
              + 300                      (bonus por finalizar)
              - penalización_errores_total
              - (segundos × 1)           (penalización por tiempo)
```

El puntaje nunca queda por debajo de 0. El detalle completo del cálculo se muestra en el modal de victoria al terminar la partida.

## Funcionalidades

**Obligatorias:**

- Tablero generado dinámicamente con JavaScript y mezcla aleatoria (algoritmo Fisher-Yates).
- Tres niveles de dificultad.
- Validación del nombre del jugador con JavaScript (mínimo 3 caracteres).
- Contadores en tiempo real: tiempo, puntaje, pares, intentos y errores.
- Cronómetro que arranca en la primera carta, se detiene al ganar y se reinicia al reiniciar.
- Modal de victoria con nombre, nivel, intentos, errores, tiempo total y desglose del puntaje.
- Reinicio de la partida sin recargar la página.
- Página de contacto con formulario validado por JavaScript que abre el cliente de correo (`mailto`).
- Diseño responsive (escritorio, tablet y celular).
- Enlaces al repositorio de GitHub y a GitHub Pages.

**Adicionales (deseables):**

- **Ranking con LocalStorage:** guarda las partidas y permite ordenarlas por puntaje, fecha, duración o nivel.
- **Borrado del historial** mediante un modal de confirmación propio (sin usar `confirm`).
- **Modo claro / oscuro** con la preferencia guardada en LocalStorage.
- **Sonidos** (archivos `.mp3` en `assets/sonidos/`, libres de derechos) para voltear carta, acierto, error y victoria, con opción para activarlos o desactivarlos.
- **Puntaje avanzado:** bonus por racha, penalización progresiva por errores, bonus por finalizar y penalización por tiempo.
- **Accesibilidad:** roles y etiquetas ARIA, foco visible, estados que no dependen solo del color, texto alternativo (`alt`) con el nombre de cada club en las imágenes de las cartas, y respeto por `prefers-reduced-motion`.

## Estructura del proyecto

```
memojuego/
├── index.html              Página principal del juego
├── README.md
├── .gitignore
├── css/
│   ├── reset.css           Normalización de estilos
│   └── estilos.css         Estilos del proyecto (Flexbox, variables, modo oscuro)
├── js/
│   ├── almacenamiento.js   LocalStorage: ranking y preferencias
│   ├── validaciones.js     Validaciones de formularios
│   ├── interfaz.js         Manipulación del DOM, modales y sonidos
│   ├── juego.js            Lógica del juego (cartas, pares, puntaje, tiempo)
│   ├── inicio.js           Inicialización y manejo de eventos
│   └── contacto.js         Lógica de la página de contacto
├── pages/
│   └── contacto.html       Página de contacto
└── assets/
    ├── imagenes/
    │   ├── equipos/         Escudos de los 18 clubes (uno por carta)
    │   ├── pelota_carta.svg Dorso de todas las cartas
    │   ├── sol.svg / luna.svg          Ícono del botón de tema
    │   ├── sound-on.svg / sound-off.svg  Ícono del botón de sonido
    │   ├── ganador.svg      Ícono del modal de victoria
    │   └── basura.svg       Ícono del modal de borrar historial
    └── sonidos/
        ├── voltear.mp3      Sonido al dar vuelta una carta
        ├── acierto.mp3      Sonido al encontrar un par
        ├── error.mp3        Sonido al fallar
        └── victoria.mp3     Sonido al ganar la partida
```

## Convenciones de código

- **JavaScript ES5** exclusivamente: `var`, funciones nominadas, concatenación de strings, `'use strict'` en cada archivo. Sin `let`, `const`, arrow functions ni template literals.
- Eventos manejados con `addEventListener` (no hay atributos `onclick` en el HTML).
- Comparaciones estrictas (`===` / `!==`), comillas simples y punto y coma de forma consistente.
- **CSS con Flexbox** (sin Grid ni float para maquetar). Colores siempre en hexadecimal. Selectores ordenados (elementos, clases, compuestos, media queries al final) y propiedades ordenadas dentro de cada regla.
- Nombres de identificadores en JavaScript en `camelCase`; clases, ids y archivos en minúscula. Todo el proyecto está escrito en español.

## Cómo cambiar la temática

La temática está definida en el arreglo `SIMBOLOS` al inicio de `js/juego.js`. Cada elemento tiene un `archivo` (el nombre del archivo de imagen dentro de `assets/imagenes/equipos/`) y un `nombre` (usado como atributo `alt` de la imagen, para accesibilidad). Para cambiar de escudos a otra temática, basta con reemplazar los elementos del arreglo y agregar las imágenes correspondientes. Debe haber al menos 18 elementos (el nivel difícil usa 18 pares). Se recomienda formato SVG con fondo transparente y proporción cuadrada, para que se vean nítidas en cualquier tamaño de tablero.

Los demás íconos de la interfaz (tema claro/oscuro, sonido activo/inactivo, el trofeo del modal de victoria y la papelera del modal de borrado) son archivos sueltos en la raíz de `assets/imagenes/` (`sol.svg`, `luna.svg`, `sound-on.svg`, `sound-off.svg`, `ganador.svg`, `basura.svg`). Los íconos monocromáticos (tema, sonido y papelera) se invierten automáticamente a blanco en modo oscuro con `filter: invert(1)` aplicado en las reglas `body.tema-oscuro` de `css/estilos.css`, para no perder contraste sobre el fondo oscuro de los botones. El trofeo mantiene sus propios colores en ambos temas.

## Cómo desplegar en GitHub Pages

1. Crear un repositorio en GitHub y subir todos los archivos del proyecto.
2. En el repositorio ir a **Settings → Pages**.
3. En **Source** elegir la rama `main` y la carpeta `/root`.
4. Guardar. En unos minutos el juego queda publicado en `https://USUARIO.github.io/NOMBRE-REPO/`.
5. Reemplazar los enlaces del repositorio y de Pages en `index.html` y `pages/contacto.html` (buscar `usuario` y `memojuego` en los atributos `href`) por las URLs reales.

## Enlaces

- **Repositorio:** https://github.com/UAIFede/daw2026-exfinal-riquelme
- **GitHub Pages:** https://uaifede.github.io/daw2026-exfinal-riquelme/

> Reemplazar estos enlaces por los reales una vez publicado el proyecto.

## Integrantes

- Claudio Federico Riquelme