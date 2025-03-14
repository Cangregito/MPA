import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuertasPage } from './puertas.page';

describe('PuertasPage', () => {
  let component: PuertasPage;
  let fixture: ComponentFixture<PuertasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PuertasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
