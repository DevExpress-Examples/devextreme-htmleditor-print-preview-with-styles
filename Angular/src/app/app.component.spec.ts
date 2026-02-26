import { ComponentFixture, TestBed, discardPeriodicTasks, fakeAsync, flush, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DxHtmlEditorModule, DxPopupModule } from 'devextreme-angular';
import { Service } from './app.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [DxHtmlEditorModule, DxPopupModule], 
      providers: [Service] 
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  }); 

  it('should render the dx-html-editor', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.dx-htmleditor')).toBeTruthy();
  });

 it('should open the popup and render an iframe when preview button is clicked', fakeAsync(() => {
  component.showMarkupPreview();

  fixture.detectChanges();

  flush();
  discardPeriodicTasks();

  fixture.detectChanges();

  expect(component.popupVisible).toBe(true);

  expect(document.querySelector('.dx-popup-content')).toBeTruthy();
  const iframe = document.querySelector('.dx-popup-content iframe');
  expect(iframe).toBeTruthy();
}));
});