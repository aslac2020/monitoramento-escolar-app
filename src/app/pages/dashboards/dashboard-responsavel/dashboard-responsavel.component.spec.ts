import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardResponsavelComponent } from './dashboard-responsavel.component';

describe('DashboardResponsavelComponent', () => {
  let component: DashboardResponsavelComponent;
  let fixture: ComponentFixture<DashboardResponsavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardResponsavelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
