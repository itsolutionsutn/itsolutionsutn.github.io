import { querySelector } from "../lib/js/querySelector.js";
import { resaltaSiEstasEn } from "../lib/js/resaltaSiEstasEn.js";

export class NavTabScrollable extends HTMLElement {
	connectedCallback() {
		this.classList.add("md-tab", "scrollable");

		this.innerHTML = /* HTML */ `
			<a ${resaltaSiEstasEn(["/index.html", "", "/"])} href="index.html">
				<span class="material-symbols-outlined">home</span>
				Inicio
			</a>

			<a ${resaltaSiEstasEn(["/proximamente.html"])} href="proximamente.html">
				<span class="material-symbols-outlined">bolt</span>
				Próximamente
			</a>

			<a ${resaltaSiEstasEn(["/contacto.html"])} href="contacto.html">
				<span class="material-symbols-outlined">newspaper</span>
				Contacto
			</a>

			<a ${resaltaSiEstasEn(["/GPS.html"])} href="GPS.html">
				<span class="material-symbols-outlined">psychology_alt</span>
				¿Perdido?
			</a>

			<a ${resaltaSiEstasEn(["/envianos _un_chiste.html"])} href="envianos _un_chiste.html">
				<span class="material-symbols-outlined">celebration</span>
				¡Envíanos tu chiste!
			</a>

			<a ${resaltaSiEstasEn(["/ayuda.html"])} href="ayuda.html">
				<span class="material-symbols-outlined">help</span>
				Ayuda
			</a>
		`;
	}
}

customElements.define("nav-tab-scrollable", NavTabScrollable);
