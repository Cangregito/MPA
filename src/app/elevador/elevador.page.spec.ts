import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElevadorPage } from './elevador.page';

describe('ElevadorPage', () => {
  let component: ElevadorPage;
  let fixture: ComponentFixture<ElevadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ElevadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
