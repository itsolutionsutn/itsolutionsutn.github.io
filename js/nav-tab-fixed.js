import { resaltaSiEstasEn } from "../lib/js/resaltaSiEstasEn.js";

export class NavTabFixed extends HTMLElement {
	connectedCallback() {
		this.classList.add("md-tab", "fixed");

		this.innerHTML = /* HTML */ `
			<a ${resaltaSiEstasEn(["/index.html", "", "/"])} href="index.html">
				<span class="material-symbols-outlined">home</span>
				Inicio
			</a>

			<a ${resaltaSiEstasEn(["/navtab.html"])} href="navtab.html">
				<span class="material-symbols-outlined">swipe_left</span>
				Pestañas scrollable
			</a>

			<a id="navtabfixed" ${resaltaSiEstasEn(["/two-line.html"])} href="two-line.html">
				<span class="material-symbols-outlined">tabs</span>
				Pestañas fijas
			</a>

			<a ${resaltaSiEstasEn(["/ayuda.html"])} href="ayuda.html">
				<span class="material-symbols-outlined">bottom_navigation</span>
				Barra de navegación
			</a>
		`;
	}
}

customElements.define("nav-tab-fixed", NavTabFixed);
