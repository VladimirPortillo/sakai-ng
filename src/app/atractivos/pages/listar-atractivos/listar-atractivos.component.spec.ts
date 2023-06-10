import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAtractivosComponent } from './listar-atractivos.component';

describe('ListarAtractivosComponent', () => {
  let component: ListarAtractivosComponent;
  let fixture: ComponentFixture<ListarAtractivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAtractivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarAtractivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
