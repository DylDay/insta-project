import { LitElement, html, css } from 'lit';

export class InstaSlide extends LitElement {
  static get tag() {
    return 'insta-slide';
  }

  constructor() {
    super();
    this.active = false;
    this.foxImg = "";
  }

  static get properties() {
    return {
      ...super.properties,
      topHeading: { type: String, attribute: 'top-heading', reflect: true},
      secondHeading: { type: String, attribute: 'second-heading', reflect: true},
      active: { type: Boolean, reflect: true },
      foxImg: { type: String},
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
      .top-heading {
        font-size: var(--ddd-font-size-sm);
        font-weight: var(--ddd-font-weight-bold);
      }
      .second-heading {
        font-size: var(--ddd-font-size-sm);
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
        color: var(--ddd-theme-default-nittanyNavy);
      }
      @media (prefers-color-scheme: dark) {
        .top-heading {
          color: var(--ddd-theme-default-skyLight);
        }
        .second-heading {
          color: var(--ddd-theme-default-limestoneGray);
        }
        .slide-description {
          color: var(--ddd-theme-default-slateLight);
        }
      }
    `;
  }

  // Change so that it fetches the JSON
  getPost() {
    fetch("https://randomfox.ca/floof/").then((resp) => {
      if (resp.ok) { return resp.json(); }
    }).then((data) => {
      this.foxImg = data.image;
    });
  }

  firstUpdated() {
    this.getPost();
  }

  render() {
    return html`
      <div class="top-heading">${this.topHeading}</div>
      <div class="second-heading">${this.secondHeading}</div>
      <div class="image-container">
        ${this.foxImg ?html`<img src="${this.foxImg}" alt="Fox image" width="200">` : html``}
      </div>
      <div class="slide-description">
        <slot></slot>
      </div>
      <slot name="indicator"></slot>
    `;
  }
}

// todo: change colors back to DDD
// replace fetch floof with fetch json
globalThis.customElements.define(InstaSlide.tag, InstaSlide);