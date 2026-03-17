import { type RefObject } from 'react';
import type { HtmlEditorRef } from 'devextreme-react/cjs/html-editor';
import useHtmlPreview from './hooks/useHtmlEditorPreview';

import './previewIframe.css';

interface PreviewIframeProps {
  rawHtml: string;
  editorRef: RefObject<HtmlEditorRef>;
}

const iframeStyles: React.CSSProperties = {
  width: '100%',
  height: '100%',
  border: 'none',
};

export default function PreviewIframe({
  rawHtml,
  editorRef,
}: PreviewIframeProps) {
  const iframeSrc = useHtmlPreview(rawHtml, editorRef);

  return (
    <div className="value-content">
      <iframe title="Markup Preview" src={iframeSrc} style={iframeStyles} />
    </div>
  );
}
