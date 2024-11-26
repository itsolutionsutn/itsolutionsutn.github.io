import { resaltaSiEstasEn } from "../lib/js/resaltaSiEstasEn.js";

export class NavTabFixed extends HTMLElement {
	connectedCallback() {
		this.classList.add("md-tab", "fixed");

		this.innerHTML = /* HTML */ `
			<a ${resaltaSiEstasEn(["/index.html", "", "/"])} href="index.html">
				<span class="material-symbols-outlined">home</span>
				Inicio
			</a>
			
			<a id="navtabfixed" ${resaltaSiEstasEn(["/agrega.html"])} href="agrega.html">
				<span class="material-symbols-outlined">add</span>
				Agregar
			</a>

			<a ${resaltaSiEstasEn(["/ayuda.html"])} href="ayuda.html">
				<span class="material-symbols-outlined">help</span>
				Ayuda
			</a>
		`;
	}
}

customElements.define("nav-tab-fixed", NavTabFixed);
