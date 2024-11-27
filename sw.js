/* Este archivo debe estar colocado en la carpeta raíz del sitio.
 *
 * Cualquier cambio en el contenido de este archivo hace que el service
 * worker se reinstale. */

/**
 * Cambia el número de la versión cuando cambia el contenido de los
 * archivos.
 *
 * El número a la izquierda del punto (.), en este caso <q>1</q>, se
 * conoce como número mayor y se cambia cuando se realizan
 * modificaciones grandes o importantes.
 *
 * El número a la derecha del punto (.), en este caso <q>00</q>, se
 * conoce como número menor y se cambia cuando se realizan
 * modificaciones menores.
 */
const VERSION = "2.10";

/**
 * Nombre de la carpeta de caché.
 */
const CACHE = "pwamd";

/**
 * Archivos requeridos para que la aplicación funcione fuera de
 * línea.
 */
const ARCHIVOS = [
	"favicon.ico",
	"index.html",
	"modifica.html",
	"agrega.html",
	"site.webmanifest",
	"css/dark-hc.css",
	"css/dark-mc.css",
	"css/dark.css",
	"css/estilos.css",
	"css/light-hc.css",
	"css/light-mc.css",
	"css/light.css",
	"css/transicion_completa.css",
	"css/transicion_pestanas.css",
	"img/icono2048.png",
	"img/img_cards.jpeg",
	"img/maskable_icon.png",
	"img/maskable_icon_x128.png",
	"img/maskable_icon_x192.png",
	"img/maskable_icon_x384.png",
	"img/maskable_icon_x48.png",
	"img/maskable_icon_x512.png",
	"img/maskable_icon_x72.png",
	"img/maskable_icon_x96.png",
	"img/screenshot_horizontal.png",
	"img/screenshot_vertical.png",
	"js/configura.js",
	"js/nav-bar.js",
	"js/nav-drw.js",
	"js/nav-tab-fixed.js",
	"js/nav-tab-scrollable.js",
	"js/registraServiceWorker.js",
	"lib/css/material-symbols-outlined.css",
	"lib/css/md-cards.css",
	"lib/css/md-fab-primary.css",
	"lib/css/md-filled-button.css",
	"lib/css/md-filled-text-field.css",
	"lib/css/md-list.css",
	"lib/css/md-menu.css",
	"lib/css/md-navigation-bar.css",
	"lib/css/md-outline-button.css",
	"lib/css/md-ripple.css",
	"lib/css/md-segmented-button.css",
	"lib/css/md-slider-field.css",
	"lib/css/md-standard-icon-button.css",
	"lib/css/md-switch.css",
	"lib/css/md-tab.css",
	"lib/css/md-top-app-bar.css",
	"lib/css/roboto.css",
	"lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].codepoints",
	"lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].ttf",
	"lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2",
	"lib/fonts/roboto-v32-latin-regular.woff2",
	"lib/js/abreElementoHtml.js",
	"lib/js/cierraElementoHtmo.js",
	"lib/js/exportaAHtml.js",
	"lib/js/getAttribute.js",
	"lib/js/htmlentities.js",
	"lib/js/muestraError.js",
	"lib/js/muestraTextoDeAyuda.js",
	"lib/js/ProblemDetails.js",
	"lib/js/querySelector.js",
	"lib/js/resaltaSiEstasEn.js",
	"lib/js/const/ES_APPLE.js",
	"lib/js/custom/md-menu-button.js",
	"lib/js/custom/md-options-menu.js",
	"lib/js/custom/md-overflow-button.js",
	"lib/js/custom/md-overflow-menu.js",
	"lib/js/custom/md-select-menu.js",
	"lib/js/custom/md-slider-field.js",
	"lib/js/custom/md-top-app-bar.js",
	"lib/js/custom/MdNavigationDrawer.js",
	"material-tokens/css/baseline.css",
	"material-tokens/css/colors.css",
	"material-tokens/css/elevation.css",
	"material-tokens/css/motion.css",
	"material-tokens/css/palette.css",
	"material-tokens/css/shape.css",
	"material-tokens/css/state.css",
	"material-tokens/css/typography.css",
    "material-tokens/css/theme/dark.css",
    "material-tokens/css/theme/light.css",
	"ungap/custom-elements.js",
	"/",
];

const URL_SERVIDOR = "https://notipush.rf.gd";

// Verifica si el código corre dentro de un service worker
if (self instanceof ServiceWorkerGlobalScope) {
	// Evento al empezar a instalar el service worker
	self.addEventListener("install", (/** @type {ExtendableEvent} */ evt) => {
		console.log("El service worker se está instalando.");
		evt.waitUntil(llenaElCache());
	});

	// Evento al solicitar información a la red
	self.addEventListener("fetch", (/** @type {FetchEvent} */ evt) => {
		if (evt.request.method === "GET") {
			evt.respondWith(buscaLaRespuestaEnElCache(evt));
		}
	});

	// Evento cuando el service worker se vuelve activo
	self.addEventListener("activate", () => console.log("El service worker está activo."));

	// Evento para recibir notificaciones push
	self.addEventListener("push", (/** @type {PushEvent} */ event) => {
		const notificacion = event.data;
		if (notificacion !== null && self.Notification.permission === "granted") {
			event.waitUntil(muestraNotificacion(notificacion));
		}
	});

	// Evento para manejar clics en notificaciones
	self.addEventListener("notificationclick", (/** @type {NotificationEvent} */ event) => {
		event.notification.close();
		event.waitUntil(muestraVentana());
	});
}

// Función para llenar el caché
async function llenaElCache() {
	console.log("Intentando cargar caché:", CACHE);
	const keys = await caches.keys();
	for (const key of keys) {
		await caches.delete(key);
	}
	const cache = await caches.open(CACHE);
	await cache.addAll(ARCHIVOS);
	console.log("Cache cargado:", CACHE);
	console.log("Versión:", VERSION);
}

// Función para buscar respuestas en el caché
async function buscaLaRespuestaEnElCache(evt) {
	const cache = await caches.open(CACHE);
	const request = evt.request;
	const response = await cache.match(request, { ignoreSearch: true });
	return response || fetch(request);
}

// Función para mostrar una notificación
/**
 * @param {PushMessageData} notificacion
 */
async function muestraNotificacion(notificacion) {
	if (self instanceof ServiceWorkerGlobalScope) {
		const mensaje = notificacion.text();
		await self.registration.showNotification(mensaje);
	}
}

// Función para abrir o enfocar una ventana
async function muestraVentana() {
	if (self instanceof ServiceWorkerGlobalScope) {
		const clientes = await self.clients.matchAll({ type: "window" });
		for (const cliente of clientes) {
			if (cliente.url.startsWith(URL_SERVIDOR)) {
				return cliente.focus();
			}
		}
		return self.clients.openWindow("/");
	}
}
