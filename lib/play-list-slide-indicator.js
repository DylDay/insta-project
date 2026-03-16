import { LitElement, html, css } from "lit";

export class PlayListSlideIndicator extends LitElement {
    static get tag() {
        return "play-list-slide-indicator";
    }

    static get properties() {
        return {
            ...super.properties,
            totalSlides: { type: Number },
            currentIndex: { type: Number }
        };
    }

    static get styles() {
        return css`
            :host {
                display: block;
            }
            .dots {
                display: flex;
                align-content: flex-start;
                gap: var(--ddd-spacing-5);
                padding: var(--ddd-spacing-2);
            }
            .dot {
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: var(--ddd-theme-default-limestoneGray);
                opacity: 0.5;
                cursor: pointer;
            }
            .dot.active {
                background-color: var(--ddd-theme-default-skyBlue);
                opacity: 1;
            }
            `;
    }

    render() {
        const dots = [];
        const count = this.totalSlides;
        for (let i = 0; i < this.totalSlides; i++) {
            dots.push(html`
                <span @click="${() => this.handleDotClick(i)}" class="dot ${i === this.currentIndex ? 'active' : ''}"></span>`);
        }
        return html`
            <div class="dots">${dots}</div>
        `;
    }

    handleDotClick(index) {
        this.dispatchEvent(new CustomEvent('indicator-change', {
            detail: { index },
            bubbles: true,
            composed: true
        }));
    }
}

globalThis.customElements.define(PlayListSlideIndicator.tag, PlayListSlideIndicator);