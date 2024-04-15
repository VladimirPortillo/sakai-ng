import { Component } from '@angular/core';
import { Table } from 'primeng/table';

import { Restaurantes } from '../../interfaces/restaurantes';
import { RestaurantesService } from '../../services/restaurantes.service';
import { ComunidadesService } from '../../services/comunidades.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss']
})
export class RestaurantesComponent {
  restaurantes: Restaurantes[] = [];

  modalRestauranteVisible: boolean = false;
  dataRestaurante: Restaurantes = {
      nombre: null,
      descripcion: null,
      direccion: null,
      categoria: null,
      telefono: null,
      foto: null,
      longitud: null,
      latitud: null,
      estado: null,
      id_comunidad: null,
  };
  tipoAccion: number = 1; //1=agregar, 0 = ver, 2=editar, 3 = eliminar, 4 = habilitar
  modalTitle: String = 'Agregar Restaurante';
  titleButton: String = 'Agregar';

  constructor(
      private restaurantesService: RestaurantesService,
      private comunidadesService: ComunidadesService
  ) {}

  ngOnInit(): void {
      this.getRestaurantes();
  }
  
  getRestaurantes() {
      this.restaurantesService.getRestaurantes().subscribe((restaurantes) => {
          this.restaurantes = restaurantes;
      });
  }

  modalRestaurante(
      restaurante: any,
      tipoAccion: number,
      modalTitle: string,
      titleButton: string
  ) {
      this.modalRestauranteVisible = true;
      if (restaurante == null) {
          this.dataRestaurante = {
              nombre: null,
              descripcion: null,
              direccion: null,
              categoria: null,
              telefono: null,
              foto: null,
              longitud: null,
              latitud: null,
              estado: null,
              id_comunidad: null,
          };
      } else {
          this.dataRestaurante = restaurante;
      }
      this.tipoAccion = tipoAccion;
      this.modalTitle = modalTitle;
      this.titleButton = titleButton;
  }

  cerrarModal(value: boolean) {
      this.modalRestauranteVisible = value;
  }
  
  datosGuardadosModal(value: boolean) {
      this.modalRestauranteVisible = value;
      this.getRestaurantes();
  }
    // buscar por filtro
    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
