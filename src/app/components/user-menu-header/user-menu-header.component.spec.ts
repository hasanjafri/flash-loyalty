import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuHeaderComponent } from './user-menu-header.component';

describe('UserMenuHeaderComponent', () => {
  let component: UserMenuHeaderComponent;
  let fixture: ComponentFixture<UserMenuHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMenuHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
