import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTimestampComponent } from './component-timestamp.component';

describe('ComponentTimestampComponent', () => {
  let component: ComponentTimestampComponent;
  let fixture: ComponentFixture<ComponentTimestampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponentTimestampComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentTimestampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
