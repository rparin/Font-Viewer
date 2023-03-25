import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontCardComponent } from './font-card.component';

describe('FontCardComponent', () => {
  let component: FontCardComponent;
  let fixture: ComponentFixture<FontCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FontCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FontCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
