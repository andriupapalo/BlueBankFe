import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasaldoComponent } from './consultasaldo.component';

describe('ConsultasaldoComponent', () => {
  let component: ConsultasaldoComponent;
  let fixture: ComponentFixture<ConsultasaldoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultasaldoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultasaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
