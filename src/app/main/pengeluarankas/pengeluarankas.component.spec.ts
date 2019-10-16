import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PengeluarankasComponent } from './pengeluarankas.component';

describe('PengeluarankasComponent', () => {
  let component: PengeluarankasComponent;
  let fixture: ComponentFixture<PengeluarankasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PengeluarankasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PengeluarankasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
