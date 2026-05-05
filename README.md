<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/1157223413/25.2.2%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1322036)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
[![](https://img.shields.io/badge/💬_Leave_Feedback-feecdd?style=flat-square)](#does-this-example-address-your-development-requirementsobjectives)
<!-- default badges end -->
# DevExtreme HTML Editor - Preserve Styles in Print Preview

This example implements a preview that displays HTML Editor content with DevExtreme styles in a popup.

![HTML Editor Print Preview](images/image-template.png)

## Implementation Details

1. Get HTML Editor content from the component Quill instance:

```js
const content = editorInstance.getQuillInstance().root.innerHTML;
```

2. Generate a standalone HTML document (with `<html>`, `<head>`, and `<body>` tags) and embed component content in the document. Reference active DevExtreme stylesheets (such as `dx.fluent.blue.light.css`) in the `<head>` section.

```js
const document = `
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="../node_modules/devextreme-dist/css/dx.fluent.blue.light.css">
	</head>
	<body>
        <div>${content}</div>
	</body>
</html>`
```

3. Embed an iframe into a DevExtreme Popup to display the generated document on a page.

## Files to Review

- **Angular**
	- [app.component.html](Angular/src/app/app.component.html)
	- [app.component.ts](Angular/src/app/app.component.ts)
	- [html-preview-helper.ts](Angular/src/app/helpers/html-preview-helper.ts)
- **React**
	- [App.tsx](React/src/App.tsx)
	- [PreviewIframe.tsx](React/src/htmleditor-preview/PreviewIframe.tsx)
	- [useHtmlEditorPreview.ts](React/src/htmleditor-preview/hooks/useHtmlEditorPreview.ts)
- **Vue**
	- [App.vue](Vue/src/App.vue)
	- [HomeContent.vue](Vue/src/components/home/HomeContent.vue)
	- [helpers.ts](Vue/src/components/home/helpers.ts)
- **jQuery**
	- [index.html](jQuery/src/index.html)
	- [index.js](jQuery/src/index.js)
	- [helpers.js](jQuery/src/helpers.js)
- **ASP.NET Core**
	- [Index.cshtml](ASP.NET%20Core/Views/Home/Index.cshtml)
	- [helpers.js](ASP.NET%20Core/wwwroot/js/helpers.js)

## Documentation

- [HTML Editor Overview](https://js.devexpress.com/Documentation/Guide/UI_Components/HtmlEditor/Overview/)
- [Popup Overview](https://js.devexpress.com/Documentation/Guide/UI_Components/Popup/Overview/)
- [Angular HTML Editor Documentation](https://js.devexpress.com/Angular/Documentation/Guide/UI_Components/HtmlEditor/Getting_Started_with_HtmlEditor/)
- [React HTML Editor Documentation](https://js.devexpress.com/React/Documentation/Guide/UI_Components/HtmlEditor/Getting_Started_with_HtmlEditor/)
- [Vue HTML Editor Documentation](https://js.devexpress.com/Vue/Documentation/Guide/UI_Components/HtmlEditor/Getting_Started_with_HtmlEditor/)
- [jQuery HTML Editor Documentation](https://js.devexpress.com/jQuery/Documentation/Guide/UI_Components/HtmlEditor/Getting_Started_with_HtmlEditor/)
- [ASP.NET Core HTML Editor Documentation](https://docs.devexpress.com/AspNetCore/401367/devextreme-based-controls/controls/html-editor)
<!-- feedback -->
## Does This Example Address Your Development Requirements/Objectives?

[<img src="https://www.devexpress.com/support/examples/i/yes-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-htmleditor-print-preview-with-styles&~~~was_helpful=yes) [<img src="https://www.devexpress.com/support/examples/i/no-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-htmleditor-print-preview-with-styles&~~~was_helpful=no)

(you will be redirected to DevExpress.com to submit your response)
<!-- feedback end -->
