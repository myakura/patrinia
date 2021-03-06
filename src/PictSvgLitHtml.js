import {
  html,
  directive,
  render as placeContent,
} from 'https://unpkg.com/lit-html';

class PictSvg extends HTMLElement {
  markup(source) {
    // https://github.com/Polymer/lit-html/issues/423#issuecomment-429932988
    const xlinkHref = href =>
      directive(part => {
        part.committer.element.setAttributeNS(
          'http://www.w3.org/1999/xlink',
          'href',
          href,
        );
      });

    return html`
    <style>
      :host {
        display: inline-flex;
      }
    </style>
    <svg width="48px" height="48px">
      <use xlink:href="${xlinkHref(source)}"></use>
    </svg>
    `;
  }

  render(value) {
    placeContent(this.markup(value), this.shadowRoot);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    const pictSource = this.getAttribute(`pict-source`);
    if (!this.shadowRoot) {
      this.attachShadow({ mode: `open` });
    }
    this.render(pictSource);
  }
}

export default PictSvg;
