import { useState, useCallback, useRef } from 'react';
import HtmlEditor, {
  Toolbar,
  Item,
  type HtmlEditorRef,
} from 'devextreme-react/html-editor';
import { Popup } from 'devextreme-react/popup';
import { Button } from 'devextreme-react/button';

import PreviewIframe from './htmleditor-preview/PreviewIframe.tsx';
import initialMarkup from './data';

import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import './index.css';

const headerValues: Array<number | boolean> = [false, 1, 2, 3, 4, 5];

export default function App() {
  const editorRef = useRef<HtmlEditorRef>(null);
  const [editorValue, setEditorValue] = useState<string>(initialMarkup);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  const handlePopupOpen = useCallback(() => {
    setIsPopupVisible(true);
  }, []);

  const handlePopupClose = useCallback(() => setIsPopupVisible(false), []);

  return (
    <div className="demo-container">
      <HtmlEditor
        ref={editorRef}
        value={editorValue}
        onValueChange={setEditorValue}
      >
        <Toolbar>
          <Item name="undo" />
          <Item name="redo" />
          <Item name="separator" />
          <Item
            name="header"
            acceptedValues={headerValues}
          />
          <Item name="separator" />
          <Item name="bold" />
          <Item name="italic" />
          <Item name="strike" />
          <Item name="underline" />
          <Item name="separator" />
          <Item name="alignLeft" />
          <Item name="alignCenter" />
          <Item name="alignRight" />
          <Item name="alignJustify" />
          <Item name="separator" />
          <Item name="insertTable" />
          <Item name="insertHeaderRow" />
          <Item name="insertRowAbove" />
          <Item name="insertRowBelow" />
          <Item name="separator" />
          <Item name="insertColumnLeft" />
          <Item name="insertColumnRight" />
          <Item name="separator" />
          <Item name="deleteColumn" />
          <Item name="deleteRow" />
          <Item name="deleteTable" />
          <Item name="separator" />
          <Item name="cellProperties" />
          <Item name="tableProperties" />
          <Item>
            <Button
              text="Show markup"
              stylingMode="text"
              onClick={handlePopupOpen}
            />
          </Item>
        </Toolbar>
      </HtmlEditor>

      <Popup
        visible={isPopupVisible}
        onHiding={handlePopupClose}
        title="Markup"
        showTitle
        showCloseButton
        hideOnOutsideClick
        width="80%"
        height="80%"
      >
          <PreviewIframe
            rawHtml={
              editorRef.current?.instance().getQuillInstance().root.innerHTML
              || ''
            }
            editorRef={editorRef}
          />
      </Popup>
    </div>
  );
}
