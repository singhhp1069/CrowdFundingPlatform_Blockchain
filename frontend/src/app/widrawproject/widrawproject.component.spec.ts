import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidrawprojectComponent } from './widrawproject.component';

describe('WidrawprojectComponent', () => {
  let component: WidrawprojectComponent;
  let fixture: ComponentFixture<WidrawprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidrawprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidrawprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
