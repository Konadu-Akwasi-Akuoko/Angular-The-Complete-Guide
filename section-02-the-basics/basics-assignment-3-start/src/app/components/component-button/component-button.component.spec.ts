import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentButtonComponent } from './component-button.component';

describe('ComponentButtonComponent', () => {
  let component: ComponentButtonComponent;
  let fixture: ComponentFixture<ComponentButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponentButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
