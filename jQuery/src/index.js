import { markup as initialMarkup } from "./data.js";
import { createDocumentWithMarkup } from "./helpers.js";

$(() => {
  let popupInstance;

  const editorInstance = $('.html-editor').dxHtmlEditor({
    value: initialMarkup,
    toolbar: {
      items: [
        'undo', 'redo', 'separator',
        {
          name: 'header',
          acceptedValues: [false, 1, 2, 3, 4, 5],
          options: { inputAttr: { 'aria-label': 'Header' } },
        }, 'separator',
        'bold', 'italic', 'strike', 'underline', 'separator',
        'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'separator',
        'insertTable', 'insertHeaderRow', 'insertRowAbove', 'insertRowBelow',
        'separator', 'insertColumnLeft', 'insertColumnRight',
        'separator', 'deleteColumn', 'deleteRow', 'deleteTable',
        'separator', 'cellProperties', 'tableProperties',
        {
          widget: 'dxButton',
          options: {
            text: 'Show markup',
            stylingMode: 'text',
            onClick() {
              popupInstance.show();
            },
          },
        },
      ],
    },
  }).dxHtmlEditor('instance');

  popupInstance = $('#popup').dxPopup({
    showTitle: true,
    title: 'Markup',
    width: "80%",
    height: "80%",
    showCloseButton: true,
    hideOnOutsideClick: true,
    onShown: onPopupShown
  }).dxPopup('instance');

  function onPopupShown() {
    const container = $(".value-content");
    createDocumentWithMarkup(editorInstance, container);
  }
});
