import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrigoriferoComponent } from './frigorifero.component';

describe('FrigoriferoComponent', () => {
  let component: FrigoriferoComponent;
  let fixture: ComponentFixture<FrigoriferoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrigoriferoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrigoriferoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
