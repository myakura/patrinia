class IconSVG extends HTMLElement {
  static get observedAttributes() {
    return [`icon-source`, `icon-width`, `icon-height`];
  }

  constructor() {
    super();

    this.source = ``;
    this.width = 0;
    this.height = 0;
  }

  _setAttrLeany(name, value) {
    if (this.getAttribute(name) !== value) {
      this.setAttribute(name, value);
    }
  }

  get width() {
    return this.getAttribute(`icon-width`);
  }
  set width(value) {
    this._setAttrLeany(`icon-width`, value);
  }
  get height() {
    return this.getAttribute(`icon-height`);
  }
  set height(value) {
    this._setAttrLeany(`icon-height`, value);
  }
  get source() {
    return this.getAttribute(`icon-source`);
  }
  set source(value) {
    this._setAttrLeany(`icon-source`, value);
  }

  connectedCallback() {
    this.source = this.getAttribute(`icon-source`);
    this.width = parseInt(this.getAttribute(`icon-width`)) || 0;
    this.height = parseInt(this.getAttribute(`icon-height`)) || 0;
    if (!this.shadowRoot) {
      this.attachShadow({ mode: `open` });
    }

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
