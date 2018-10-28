class IconSVG extends HTMLElement {
  static get observedAttributes() {}

  constructor() {
    super();

    this._source = this.getAttribute(`icon-source`);
    this._width = parseInt(this.getAttribute(`icon-width`)) || 0;
    this._height = parseInt(this.getAttribute(`icon-height`)) || 0;

    this.attachShadow({ mode: `open` });
    this._shadow = this.shadowRoot;
    this._shadow.innerHTML = `
      <style>
        :host {
          display: inline-flex;
        }
        svg {
          width: ${this._width}px;
          height: ${this._height}px;
        }
      </style>
      <svg>
        <use xlink:href="${this._source}"/>
      </svg>
    `;
  }

  connectedCallback() {}

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {}
}

export default IconSVG;
