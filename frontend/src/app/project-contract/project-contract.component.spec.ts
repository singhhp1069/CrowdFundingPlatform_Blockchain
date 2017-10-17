import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectContractComponent } from './project-contract.component';

describe('ProjectContractComponent', () => {
  let component: ProjectContractComponent;
  let fixture: ComponentFixture<ProjectContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
