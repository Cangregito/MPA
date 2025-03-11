import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadosPage } from './estados.page';

describe('EstadosPage', () => {
  let component: EstadosPage;
  let fixture: ComponentFixture<EstadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
