import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackerContractComponent } from './backer-contract.component';

describe('BackerContractComponent', () => {
  let component: BackerContractComponent;
  let fixture: ComponentFixture<BackerContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackerContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackerContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
