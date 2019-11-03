import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuBodyComponent } from './user-menu-body.component';

describe('UserMenuBodyComponent', () => {
  let component: UserMenuBodyComponent;
  let fixture: ComponentFixture<UserMenuBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMenuBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
