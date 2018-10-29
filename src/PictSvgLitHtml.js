import { html, directive, render } from 'https://unpkg.com/lit-html';

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

  constructor() {
    super();
  }

  connectedCallback() {
    const pictSource = this.getAttribute(`pict-source`);
    render(this.markup(pictSource), this.attachShadow({ mode: `open` }));
  }
}

export default PictSvg;
