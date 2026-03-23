import { LitElement, html, css } from "lit";

export class InstaSlideArrow extends LitElement {
    static get tag() {
        return "insta-slide-arrow";
    }

    static get properties() {
        return {
            ...super.properties,
            direction: { type: String },
        };
    }

    static get styles() {
        return css`
            :host {
                display: inline-flex;
                align-items: center;
            }
            .wrapper {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: var(--ddd-spacing-2);
            }
            .arrow {
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: var(--ddd-radius-circle);
                border: 2px solid var(--ddd-theme-default-link);
                background-color: rgba(255, 255, 255, 0.);
                color: var(--ddd-theme-default-link);
                font-size: var(--ddd-font-size-2xl);
                cursor: pointer;
            }
            @media (prefers-color-scheme: dark) {
                .arrow {
                    border-color: var(--ddd-theme-default-skyBlue);
                    color: var(--ddd-theme-default-skyBlue);
                }
            }
        `;
    }

    handleClick(e) {
        // bubble a simple navigation event so parent can react
        this.dispatchEvent(new CustomEvent('navigate', {
            detail: { direction: this.direction },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const direction = this.direction === "previous" ? "<" : ">";
        const label = this.direction === "previous" ? "Previous Slide" : "Next Slide";
        return html`
        <div class="wrapper">
            <button class="arrow" @click="${this.handleClick}" direction="${this.direction}" aria-label="${label}">${direction}</button>
        </div>
        `;
    }
}

// todo: change colors back to DDD
globalThis.customElements.define(InstaSlideArrow.tag, InstaSlideArrow);