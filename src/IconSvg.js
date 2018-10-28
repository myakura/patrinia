class IconSVG extends HTMLElement {
  static get observedAttributes() {
    return [`icon-source`, `icon-width`, `icon-height`];
  }

  constructor() {
    super();
  }

  get width() {
    return this.getAttribute(`icon-width`);
  }
  set width(value) {
    this.setAttribute(`icon-width`, value);
  }
  get height() {
    return this.getAttribute(`icon-height`);
  }
  set height(value) {
    this.setAttribute(`icon-height`, value);
  }
  get source() {
    return this.getAttribute(`icon-source`);
  }
  set source(value) {
    this.setAttribute(`icon-source`, value);
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
    this.source = this.getAttribute(`icon-source`) || this.source;
    this.width = this.getAttribute(`icon-width`) || this.width;
    this.height = this.getAttribute(`icon-height`) || this.height;
    if (!this.shadowRoot) {
      this.attachShadow({ mode: `open` });
      this._render();
    }
  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name.replace('icon-', '')] = newValue;
      if (this.shadowRoot) {
        this._render();
      }
    }
  }
}

export default IconSVG;
