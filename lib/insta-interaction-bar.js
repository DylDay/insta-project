import { LitElement, html, css } from "lit";

export class InstaInteractionBar extends LitElement {
    
    static get tag() {
        return 'insta-interaction-bar';
    }

    constructor() {
        super();
        this.liked = false;
        this.bookmarked = false;
    }

    static get properties() {
        return {
            ...super.properties,
            liked: { type: Boolean },
            bookmarked: { type: Boolean }
        }
    }

    static get styles() {
        return css`
        .like-button,
        .bookmark-button {
            background-color: var(--ddd-theme-default-potential 0);
        }
        .like-button:active {
            background-color: var(--ddd-theme-default-original87Pink);
        }
        .bookmark-button:active {
            background-color: var(--ddd-theme-default-globalNeon);
        }
        `;
    }

    toggleLike() {
        return this.liked = !this.liked;
    }

    toggleBookmark() {
        return this.bookmarked = !this.bookmarked;
    }

    render() {
        return html`
        <div class="wrapper">
            <button class="like-button" @click="${this.toggleLike}" aria-label="like post">

            </button>
        </div>
        `;
    }
}


globalThis.customElements.define(InstaInteractionBar.tag, InstaInteractionBar);