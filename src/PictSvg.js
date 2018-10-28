class PictSvg extends HTMLElement {
  static get observedAttributes() {
    return [`pict-source`, `pict-width`, `pict-height`];
  }

  constructor() {
    super();
  }

  get width() {
    return this.getAttribute(`pict-width`);
  }
  set width(value) {
    this.setAttribute(`pict-width`, value);
  }
  get height() {
    return this.getAttribute(`pict-height`);
  }
  set height(value) {
    this.setAttribute(`pict-height`, value);
  }
  get source() {
    return this.getAttribute(`pict-source`);
  }
  set source(value) {
    this.setAttribute(`pict-source`, value);
  }

  _render() {
    this.shadowRoot.innerHTML = `
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

  connectedCallback() {
    this.source = this.getAttribute(`pict-source`) || this.source;
    this.width = this.getAttribute(`pict-width`) || this.width;
    this.height = this.getAttribute(`pict-height`) || this.height;
    if (!this.shadowRoot) {
      this.attachShadow({ mode: `open` });
    }
    this._render();
  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name.replace('pict-', '')] = newValue;
      this._render();
    }
  }
}

export default PictSvg;
