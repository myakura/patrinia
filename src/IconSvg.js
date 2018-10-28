class IconSVG extends HTMLElement {
  static get observedAttributes() {}

  constructor() {
    super();

    this.source = ``;
    this.width = 0;
    this.height = 0;
  }

  get width() {
    return this.getAttribute(`icon-width`);
  }
  set width(value) {
    if (this.getAttribute(`icon-width`) !== value) {
      this.setAttribute(`icon-width`, value);
    }
  }
  get height() {
    return this.getAttribute(`icon-height`);
  }
  set height(value) {
    if (this.getAttribute(`icon-height`) !== value) {
      this.setAttribute(`icon-height`, value);
    }
  }
  get source() {
    return this.getAttribute(`icon-source`);
  }
  set source(value) {
    if (this.getAttribute(`icon-source`) !== value) {
      this.setAttribute(`icon-source`, value);
    }
  }

  connectedCallback() {
    this.source = this.getAttribute(`icon-source`);
    this.width = parseInt(this.getAttribute(`icon-width`)) || 0;
    this.height = parseInt(this.getAttribute(`icon-height`)) || 0;

    this.attachShadow({ mode: `open` });
    this._shadow = this.shadowRoot;
    this._shadow.innerHTML = `
      <style>
        :host {
          display: inline-flex;
        }
        svg {
          width: ${this.width}px;
          height: ${this.height}px;
        }
      </style>
      <svg>
        <use xlink:href="${this.source}"/>
      </svg>
    `;
  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {}
}

export default IconSVG;
