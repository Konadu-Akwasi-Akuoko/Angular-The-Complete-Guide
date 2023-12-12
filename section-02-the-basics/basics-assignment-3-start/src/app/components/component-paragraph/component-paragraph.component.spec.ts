import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentParagraphComponent } from './component-paragraph.component';

describe('ComponentParagraphComponent', () => {
  let component: ComponentParagraphComponent;
  let fixture: ComponentFixture<ComponentParagraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponentParagraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
