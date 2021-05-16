import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddscreenComponent } from './addscreen.component';

describe('AddscreenComponent', () => {
  let component: AddscreenComponent;
  let fixture: ComponentFixture<AddscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddscreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
