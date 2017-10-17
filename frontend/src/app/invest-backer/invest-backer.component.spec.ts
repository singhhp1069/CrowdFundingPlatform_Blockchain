import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestBackerComponent } from './invest-backer.component';

describe('InvestBackerComponent', () => {
  let component: InvestBackerComponent;
  let fixture: ComponentFixture<InvestBackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestBackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestBackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
