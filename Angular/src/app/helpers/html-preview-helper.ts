
export class HtmlPreviewHelper {
  private static readonly FORBIDDEN_CLASSES = ['dx-show-invalid-badge', 'dx-htmleditor-outlined'];
 
  static getParentStyles(): string {
    return Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map(node => `<link rel="stylesheet" href="${(node as HTMLLinkElement).href}">`)
      .join('');
  }

  static filterEditorClasses(classList: DOMTokenList): string {
    return Array.from(classList)
      .filter(cls => !this.FORBIDDEN_CLASSES.includes(cls))
      .join(' ');
  }

  static minify(html: string): string {
    return html
      .replace(/\n|\t/g, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
  }

  static buildFullDocument(config: {
    content: string,
    styles: string,
    bodyClass: string,
    containerClasses: string,
    editorClasses: string
  }): string {
    const { content, styles, bodyClass, containerClasses, editorClasses } = config;

    return this.minify(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          ${styles}
        </head>
        <body class="${bodyClass}">
          <div class="${containerClasses}">
            <div class="${editorClasses} dx-htmleditor-content">
              <div class="ql-container ql-snow" style="border:none">
                <div class="ql-editor" contenteditable="false">
                  ${content}
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>`);
  }
}