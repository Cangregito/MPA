import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucesPage } from './luces.page';

describe('LucesPage', () => {
  let component: LucesPage;
  let fixture: ComponentFixture<LucesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LucesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
