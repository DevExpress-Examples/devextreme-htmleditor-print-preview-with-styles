export function formatContent(rawHtml: string): string {
  return `
    <div class="dx-htmleditor-content" style="white-space: normal;">
      <div class="ql-container ql-snow" style="border:none">
        <div class="ql-editor" contenteditable="false">
          ${rawHtml}
        </div>
      </div>
    </div>
  `;
}

export function getViewportClasses() {
  const viewport = document.querySelector('.dx-viewport')
  return viewport?.className ??
    'dx-viewport dx-theme-generic dx-theme-generic-typography dx-color-scheme-light'
}

export function collectDevExtremeStyles() {
  const links = [...document.querySelectorAll('link[rel="stylesheet"]')]
    .filter(l => l.getAttribute('href')?.includes('devextreme'))

  const styles = [...document.querySelectorAll('style[data-vite-dev-id]')]
    .filter(s => s.getAttribute('data-vite-dev-id')?.includes('devextreme'))

  const linkTags = links
    .map(l => `<link rel="stylesheet" href="${l.getAttribute('href')}">`)
    .join('')

  const styleTags = styles
    .map(s => `<style>${s.innerHTML}</style>`)
    .join('')

  if (!linkTags && !styleTags) {
    return `<link rel="stylesheet" href="https://cdn3.devexpress.com/jslib/latest/css/dx.light.css">`
  }

  return linkTags + styleTags
}

export function getFullDocument(editorValue: string) {
  const styles = collectDevExtremeStyles()
  const containerClasses = getViewportClasses()
  const content = formatContent(editorValue);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        ${styles}
      </head>
      <body>
        <div class="${containerClasses}">
          ${content}
        </div>
      </body>
    </html>
  `
}