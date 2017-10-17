import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploycontractComponent } from './deploycontract.component';

describe('DeploycontractComponent', () => {
  let component: DeploycontractComponent;
  let fixture: ComponentFixture<DeploycontractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeploycontractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploycontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
