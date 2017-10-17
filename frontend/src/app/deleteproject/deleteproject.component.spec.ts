import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteprojectComponent } from './deleteproject.component';

describe('DeleteprojectComponent', () => {
  let component: DeleteprojectComponent;
  let fixture: ComponentFixture<DeleteprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
