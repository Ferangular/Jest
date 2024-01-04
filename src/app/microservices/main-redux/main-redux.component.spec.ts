import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainReduxComponent } from './main-redux.component';

describe('MainReduxComponent', () => {
  let component: MainReduxComponent;
  let fixture: ComponentFixture<MainReduxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainReduxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainReduxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
