import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarComunidadesComponent } from './listar-comunidades.component';

describe('ListarComunidadesComponent', () => {
  let component: ListarComunidadesComponent;
  let fixture: ComponentFixture<ListarComunidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarComunidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarComunidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
