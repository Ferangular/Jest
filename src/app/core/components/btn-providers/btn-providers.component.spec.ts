import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnProvidersComponent } from './btn-providers.component';

describe('BtnProvidersComponent', () => {
  let component: BtnProvidersComponent;
  let fixture: ComponentFixture<BtnProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnProvidersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
