import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerkiraanComponent } from './perkiraan.component';

describe('PerkiraanComponent', () => {
  let component: PerkiraanComponent;
  let fixture: ComponentFixture<PerkiraanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerkiraanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerkiraanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
