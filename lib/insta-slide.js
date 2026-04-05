import { LitElement, html, css } from 'lit';

export class InstaSlide extends LitElement {
  static get tag() {
    return 'insta-slide';
  }

  constructor() {
    super();
    this.active = false;
    this.postImage = "";
    this.thumbnailSource = "";
    this.fullSizeSource = "";
    this.alt = "";
  }

  static get properties() {
    return {
      ...super.properties,
      active: { type: Boolean, reflect: true },
      thumbnailSource: { type: String },
      fullSizeSource: { type: String },
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
        cursor: pointer;
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
      <div class="image-container">${this.thumbnailSource ? html`<img src="${this.thumbnailSource}" alt="${this.alt}" width="200">` : html``}</div>
    `;
  }
}

globalThis.customElements.define(InstaSlide.tag, InstaSlide);