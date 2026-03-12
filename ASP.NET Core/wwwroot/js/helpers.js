function createFormattedContent(rawHtml) {
    return [
        '<div class="dx-htmleditor-content">',
        '<div class="ql-container ql-snow" style="border:none">',
        '<div class="ql-editor" contenteditable="false">',
        rawHtml,
        '</div>',
        '</div>',
        '</div>'
    ].join('');
}

function getThemeClasses() {
    const viewport = document.querySelector('.dx-viewport');

    return viewport
        ? viewport.className
        : 'dx-viewport dx-theme-generic dx-theme-generic-typography dx-color-scheme-light';
}

function createStyles() {
    const dxLinks = Array.prototype.slice.call(document.querySelectorAll('link[rel="stylesheet"]'))
        .filter(function (l) { return l.href.includes('dx') || l.href.includes('vendor'); });

    const styles = dxLinks.length
        ? dxLinks.map(function (l) { return '<link rel="stylesheet" href="' + l.href + '">'; }).join('')
        : '<link rel="stylesheet" href="https://cdn3.devexpress.com/jslib/latest/css/dx.light.css">';

    return styles;
}

function createFullDocument(formattedStyles, formattedContent, containerClasses) {
    return '<!DOCTYPE html>' +
        '<html>' +
        '<head>' + formattedStyles + '</head>' +
        '<body>' +
        '<div class="' + containerClasses + '">' + formattedContent + '</div>' +
        '</body>' +
        '</html>';
}

function createDocumentWithMarkup(editorInstance, container) {
    container.empty();

    const rawHtml = editorInstance.getQuillInstance().root.innerHTML;

    const formattedContent = createFormattedContent(rawHtml);
    const styles = createStyles();
    const containerClasses = getThemeClasses();

    const iframe = $('<iframe>', {
        css: {
            width: '100%',
            height: '100%',
            border: 0,
            visibility: 'hidden'
        }
    }).appendTo(container)[0];

    const fullDoc = createFullDocument(styles, formattedContent, containerClasses);

    const doc = iframe.contentDocument;

    doc.open();
    doc.write(fullDoc);
    doc.close();

    iframe.onload = function () {
        iframe.style.visibility = 'visible';
    };

    return iframe;
}
