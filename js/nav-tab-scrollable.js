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

			<a id="navtabfixed" ${resaltaSiEstasEn(["/contacto.html"])} href="contacto.html">
				<span class="material-symbols-outlined">newspaper</span>
				Contacto
			</a>

			<a ${resaltaSiEstasEn(["/ayuda.html"])} href="ayuda.html">
				<span class="material-symbols-outlined">help</span>
				Ayuda
			</a>
			
		`;
	}
}

customElements.define("nav-tab-scrollable", NavTabScrollable);
