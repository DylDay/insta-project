import { LitElement, html, css } from 'lit';

export class PlayListSlide extends LitElement {
  static get tag() {
    return 'play-list-slide';
  }

  constructor() {
    super();
    this.active = false;
  }

  static get properties() {
    return {
      ...super.properties,
      topHeading: { type: String, attribute: 'top-heading', reflect: true},
      secondHeading: { type: String, attribute: 'second-heading', reflect: true},
      active: { type: Boolean, reflect: true },
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
        font-size: var(--ddd-font-size-xs);
        font-weight: var(--ddd-font-weight-bold);
        text-transform: uppercase;
        color: var(--ddd-theme-default-link);
        
      }
      .second-heading {
        font-size: var(--ddd-font-size-3xl);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-default-beaverBlue);
      }
      hr {
        background-color: var(--ddd-theme-default-skyBlue);
        height: 2px;
        width: 60px;
        margin-left: var(--ddd-spacing-0);
        border: none;
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

  render() {
    return html`
      <div class="top-heading">${this.topHeading}</div>
      <div class="second-heading">${this.secondHeading}</div>
      <hr>
      <div class="slide-description">
        <slot></slot>
      </div>
      <slot name="indicator"></slot>
    `;
}
}

globalThis.customElements.define(PlayListSlide.tag, PlayListSlide);