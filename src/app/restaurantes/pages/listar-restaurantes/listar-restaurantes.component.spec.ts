import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRestaurantesComponent } from './listar-restaurantes.component';

describe('ListarRestaurantesComponent', () => {
  let component: ListarRestaurantesComponent;
  let fixture: ComponentFixture<ListarRestaurantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarRestaurantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarRestaurantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
