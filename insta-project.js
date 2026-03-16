/**
 * Copyright 2026 Dylan Dayrit
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./lib/play-list-slide.js";
import "./lib/play-list-slide-arrow.js";
import "./lib/play-list-slide-indicator.js";

/**
 * `insta-project`
 * 
 * @demo index.html
 * @element insta-project
 */
export class InstaProject extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-project";
  }

  constructor() {
    super();
    this.title = "";
    this.currentIndex = 0;
    this.totalSlides = 0;
    this.slides = [];
    this.t = {
      title: "Title",
    };
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      currentIndex: { type: Number },
      totalSlides: { type: Number },
      slides: { type: Array},
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-default-beaverBlue);
        background-color: var(--ddd-theme-default-slateMaxLight);
        font-family: var(--ddd-font-navigation);
        border-radius: var(--ddd-radius-sm);
        position: relative;
        width: 960px;
        height: 480px;
      }
      .wrapper {
        position: relative;
        display: flex;
        align-items: center;
        height: 100%;
        margin: var(--ddd-spacing-2);
        padding-left: var(--ddd-spacing-4);
        padding-right: var(--ddd-spacing-4);
      }
      .wrapper > slot {
        flex: 1 1 auto;
        display: block;
      }
      h3 span {
        font-size: var(--ddd-font-size-s);
      }
      play-list-slide-indicator {
        position: absolute;
        bottom: var(--ddd-spacing-8);
        left: var(--ddd-spacing-8);
      }
      play-list-slide-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      play-list-slide-arrow[direction="previous"] {
        left: -32px;
      }
      play-list-slide-arrow[direction="next"] {
        right: -32px;
      }
      @media (prefers-color-scheme: dark) {
        :host {
          background-color: var(--ddd-theme-default-beaverBlue);
          color: var(---ddd-theme-default-slateMaxLight);
        }
      }
    `];
  }

  nextSlide() {
    if (this.currentIndex < this.totalSlides - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.updateSlides();
  }

  previousSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.totalSlides - 1;
    }
    this.updateSlides();
  }

  firstUpdated() {
    const slides = Array.from(this.querySelectorAll('play-list-slide'));
    this.totalSlides = slides.length;
    this.slides = slides;
    this.updateSlides();
  }

  updateSlides() {
    this.slides.forEach((slide, i) => {
      slide.active = (i === this.currentIndex);
    });
    const indexChange = new CustomEvent("play-list-index-changed", {
      composed: true,
      bubbles: true,
      detail: {
        index: this.currentIndex
      },
    });
    this.dispatchEvent(indexChange);
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <play-list-slide-arrow direction="previous" @click="${this.previousSlide}"></play-list-slide-arrow>
        <slot></slot>
        <play-list-slide-arrow direction="next" @click="${this.nextSlide}"></play-list-slide-arrow>
        <play-list-slide-indicator .totalSlides="${this.totalSlides}" .currentIndex="${this.currentIndex}"
          @indicator-change="${(e) => {
            this.currentIndex = e.detail.index;
            this.updateSlides();
          }}">
        </play-list-slide-indicator>
      </div>`;
  }
}

globalThis.customElements.define(InstaProject.tag, InstaProject);