import { Component } from '@angular/core';
import { Table } from 'primeng/table';

import { Atractivos_turisticos } from '../../interfaces/atractivos';
import { AtractivosService } from '../../services/atractivos.service';
import { ComunidadesService } from '../../services/comunidades.service';

@Component({
  selector: 'app-atractivos',
  templateUrl: './atractivos.component.html',
  styleUrls: ['./atractivos.component.scss']
})
export class AtractivosComponent {
  atractivos: Atractivos_turisticos[] = [];
  valRadio: string = '';
  

  modalAtractivoVisible: boolean = false;
  dataAtractivo: Atractivos_turisticos = {
      nombre: null,
      descripcion: null,
      direccion: null,
      longitud: null,
      latitud: null,
      estado: null,
      id_comunidad: null,
  };
  tipoAccion: number = 1; //1=agregar, 0 = ver, 2=editar, 3 = eliminar, 4 = habilitar
  modalTitle: String = 'Agregar Restaurante';
  titleButton: String = 'Agregar';

  constructor(
      private atractivosService: AtractivosService,
      private comunidadesService: ComunidadesService
  ) {}

  ngOnInit(): void {
      this.getAtractivos();
  }
  
  getAtractivos() {
      
            this.atractivosService.getAtractivos().subscribe((atractivos) => {
                this.atractivos = atractivos;
            });
        
  }

  modalAtractivo(
      atractivo: any,
      tipoAccion: number,
      modalTitle: string,
      titleButton: string
  ) {
      this.modalAtractivoVisible = true;
      if (atractivo == null) {
          this.dataAtractivo = {
              nombre: null,
              descripcion: null,
              direccion: null,
              longitud: null,
              latitud: null,
              estado: null,
              id_comunidad: null,
          };
      } else {
          this.dataAtractivo = atractivo;
      }
      this.tipoAccion = tipoAccion;
      this.modalTitle = modalTitle;
      this.titleButton = titleButton;
  }

  cerrarModal(value: boolean) {
      this.modalAtractivoVisible = value;
  }
  
  datosGuardadosModal(value: boolean) {
      this.modalAtractivoVisible = value;
      this.getAtractivos();
  }
    // buscar por filtro
    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  
}
