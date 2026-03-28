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
            liked: { type: Boolean, reflect: true },
            bookmarked: { type: Boolean, reflect: true }
        }
    }

    static get styles() {
        return css`
        button {
            background-color: var(--ddd-theme-default-potential0);
            border: none;
            padding: var(--ddd-spacing-0);
            margin: var(--ddd-spacing-4);
            cursor: pointer;
        }
        svg path {
            background-color: var(--ddd-theme-default-potential0);
            stroke: var(--ddd-theme-default-white);
            fill: var(--ddd-theme-default-potential0);
        }
        :host([liked]) .like-button svg path {
            fill: var(--ddd-theme-default-original87Pink);
            stroke: var(--ddd-theme-default-original87Pink);
        }
        button:hover svg path {
            fill: var(--ddd-theme-default-limestoneGray);
        }
        `;
    }

    firstUpdated() {
        const likedState = localStorage.getItem('liked-state');
        if (likedState != null) {
            this.liked = JSON.parse(likedState);
        }
    }

    toggleLike() {
        this.liked = !this.liked;
        localStorage.setItem(`liked-state`, JSON.stringify(this.liked));
    }

    handleShareClick() {
    const currentUrl = window.location.href
    navigator.clipboard.writeText(currentUrl).then(() => {
        alert("Link copied to clipboard.");
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
    }

    render() {
        return html`
        <div class="wrapper">
            <button class="like-button" @click="${this.toggleLike}" aria-label="like post">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke-width="2" />
                </svg>
            </button>
            <button class="share-button" @click="${this.handleShareClick}" aria-label="share post">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke-width="2" />
                </svg>
            </button>
        </div>
        `;
    }
}

globalThis.customElements.define(InstaInteractionBar.tag, InstaInteractionBar);