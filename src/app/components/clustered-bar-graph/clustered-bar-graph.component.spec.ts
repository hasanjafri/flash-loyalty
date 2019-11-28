import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusteredBarGraphComponent } from './clustered-bar-graph.component';

describe('ClusteredBarGraphComponent', () => {
  let component: ClusteredBarGraphComponent;
  let fixture: ComponentFixture<ClusteredBarGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusteredBarGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusteredBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
