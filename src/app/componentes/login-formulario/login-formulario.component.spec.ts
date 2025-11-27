import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormularioComponent } from './login-formulario.component';

describe('LoginFormularioComponent', () => {
  let component: LoginFormularioComponent;
  let fixture: ComponentFixture<LoginFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
