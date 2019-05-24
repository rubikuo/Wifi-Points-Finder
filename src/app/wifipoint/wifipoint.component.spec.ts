import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WifipointComponent } from './wifipoint.component';

describe('WifipointComponent', () => {
  let component: WifipointComponent;
  let fixture: ComponentFixture<WifipointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WifipointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WifipointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
