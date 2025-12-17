import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoEmailComponent } from './codigo-email.component';

describe('CodigoEmailComponent', () => {
  let component: CodigoEmailComponent;
  let fixture: ComponentFixture<CodigoEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodigoEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
