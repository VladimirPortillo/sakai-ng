import { Component } from '@angular/core';
import { Table } from 'primeng/table';

import { Comunidades } from '../../interfaces/comunidades';
import { ComunidadesService } from '../../services/comunidades.service';

@Component({
  selector: 'app-comunidades',
  templateUrl: './comunidades.component.html',
  styleUrls: ['./comunidades.component.scss']
})
export class ComunidadesComponent {
  comunidades: Comunidades[] = [];

  modalComunidadVisible: boolean = false;
  dataComunidad: Comunidades = {
      nombre: null,
      descripcion: null,
      superficie: null,
      poblacion: null,
      longitud: null,
      latitud: null,
      estado: null,                     
      id_usuario: null,
  };
  tipoAccion: number = 1; //1=agregar, 0 = ver, 2=editar, 3 = eliminar, 4 = habilitar
  modalTitle: String = 'Agregar Comunidad';
  titleButton: String = 'Agregar';

  constructor(
      private comunidadesService: ComunidadesService
  ) {}

  ngOnInit(): void {
      this.getComunidades();
  }
  
  getComunidades() {
      this.comunidadesService.getComunidades().subscribe((comunidades) => {
          this.comunidades = comunidades;
      });
  }

  modalComunidad(
      comunidad: any,
      tipoAccion: number,
      modalTitle: string,
      titleButton: string
  ) {
      this.modalComunidadVisible = true;
      if (comunidad == null) {
          this.dataComunidad = {
              nombre: null,
              descripcion: null,
              superficie: null,
              poblacion: null,
              longitud: null,
              latitud: null,
              estado: null,
              id_usuario: null,
          };
      } else {
          this.dataComunidad = comunidad;
      }
      this.tipoAccion = tipoAccion;
      this.modalTitle = modalTitle;
      this.titleButton = titleButton;
  }

  cerrarModal(value: boolean) {
      this.modalComunidadVisible = value;
  }
  
  datosGuardadosModal(value: boolean) {
      this.modalComunidadVisible = value;
      this.getComunidades();
  }
    // buscar por filtro
    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
