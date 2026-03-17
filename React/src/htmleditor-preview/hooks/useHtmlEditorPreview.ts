import { useState, useEffect, type RefObject } from 'react';
import { type HtmlEditorRef } from 'devextreme-react/html-editor';

const FORBIDDEN_CLASSES = ['dx-show-invalid-badge', 'dx-htmleditor-outlined'];

function getParentStyles(): string {
  return Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
    .map((node) => node.outerHTML)
    .join('\n');
}

function filterEditorClasses(classList?: DOMTokenList): string {
  if (!classList) return '';
  return Array.from(classList)
    .filter((cls) => !FORBIDDEN_CLASSES.includes(cls))
    .join(' ');
}

function minify(html: string): string {
  return html
    .replace(/\n|\t/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
}

export default function useHtmlPreview(
  rawHtml: string,
  editorRef: RefObject<HtmlEditorRef>,
): string | undefined {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const editorElement = editorRef.current?.instance().element();
    const styles = getParentStyles();
    const bodyClass = document.body.className;
    const containerClasses = document.querySelector('.dx-viewport')?.className || 'dx-viewport';
    const editorClasses = filterEditorClasses(editorElement?.classList);

    const fullHtml = minify(`
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
                  ${rawHtml}
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const objectUrl = URL.createObjectURL(blob);

    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [rawHtml, editorRef]);

  return previewUrl;
}
