import { LitElement, html, css } from 'lit';

export class InstaSlide extends LitElement {
  static get tag() {
    return 'insta-slide';
  }

  constructor() {
    super();
    this.active = false;
    this.postImage = "";
    this.src = "";
    this.alt = "";
  }

  static get properties() {
    return {
      ...super.properties,
      active: { type: Boolean, reflect: true },
      src: { type: String },
      alt: { type: String },
      description: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        overflow: hidden;
        padding-left: var(--ddd-spacing-4);
        padding-right: var(--ddd-spacing-4);
      }
      :host(:not([active])) {
        display: none;
      }
      .image-container {
        padding-top: var(--ddd-spacing-4);
        aspect-ratio: 1 / 1;
      }
      img {
        width: 80%;
        height: 80%;
        object-fit: cover;
      }
      .slide-description {
        max-width: 480px;
        max-height: 200px;
        overflow-y: auto;
        color: light-dark(var(--ddd-theme-default-nittanyNavy), var(--ddd-theme-default-slateLight));
      }
    `;
  }

  render() {
    return html`
      <div class="image-container">${this.src ?html`<img src="${this.src}" alt="${this.alt}" width="200">` : html``}</div>
    `;
  }
}

// todo: Make it so that there are placeholder blocks before the image loads to prevent jumping
globalThis.customElements.define(InstaSlide.tag, InstaSlide);