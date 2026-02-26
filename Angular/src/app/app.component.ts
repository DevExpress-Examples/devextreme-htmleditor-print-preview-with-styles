import { Component, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DxHtmlEditorComponent } from 'devextreme-angular';
import { HtmlPreviewHelper } from './helpers/html-preview-helper';
import { Service } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Service]
})
export class AppComponent implements OnDestroy {
  @ViewChild(DxHtmlEditorComponent, { static: false }) editor!: DxHtmlEditorComponent;

  popupVisible = false;
  previewContent: SafeResourceUrl | null = null;
  markup: string;
  
  private currentPreviewUrl: string | null = null;
  previewButtonOptions: any;

  constructor(
    private dataService: Service,
    private sanitizer: DomSanitizer
  ) {
    this.markup = this.dataService.getMarkup();
    this.previewButtonOptions = {
      text: 'Show markup',
      stylingMode: 'text',
      elementAttr: { class: 'show-markup-button' },
      onClick: this.showMarkupPreview
    };
  }


  showMarkupPreview = () => {
    const rawHtml = this.editor.instance.getQuillInstance().root.innerHTML;
    
    const fullHtml = HtmlPreviewHelper.buildFullDocument({
      content: rawHtml,
      styles: HtmlPreviewHelper.getParentStyles(),
      bodyClass: document.body.className,
      containerClasses: document.querySelector('.dx-viewport')?.className || 'dx-viewport',
      editorClasses: HtmlPreviewHelper.filterEditorClasses(this.editor.instance.element().classList)
    });

    this.refreshPreviewBlob(fullHtml);
    this.popupVisible = true;
  };

  private refreshPreviewBlob(html: string): void {
    if (this.currentPreviewUrl) URL.revokeObjectURL(this.currentPreviewUrl);
    
    const blob = new Blob([html], { type: 'text/html' });
    this.currentPreviewUrl = URL.createObjectURL(blob);
    this.previewContent = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentPreviewUrl);
  }

  ngOnDestroy(): void {
    if (this.currentPreviewUrl) URL.revokeObjectURL(this.currentPreviewUrl);
  }
}