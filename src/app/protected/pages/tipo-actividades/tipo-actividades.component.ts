import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { TipoActividades } from '../../interfaces/tipoActividades';
import { tipoActividadesService } from '../../services/tipoActividades.service';

@Component({
  selector: 'app-tipo-actividades',
  templateUrl: './tipo-actividades.component.html',
  styleUrls: ['./tipo-actividades.component.scss']
})
export class TipoActividadesComponent {
  tipoActividades: TipoActividades[] = [];
  currentRowNumber:number = 0;

  modalTipoActividadVisible: boolean = false;
  dataTipoActividad: TipoActividades = {
      nombre: null,
      descripcion: null,
      estado:null,
  };
  tipoAccion: number = 1; //1=agregar, 0 = ver, 2=editar, 3 = eliminar, 4 = habilitar
  modalTitle: String = 'Agregar Tipo Actividad';
  titleButton: String = 'Agregar';
  

  constructor(
      private tipoActividadesService: tipoActividadesService,
  ) {}

  ngOnInit(): void {
      this.getTipoActividades();
      
  }
  
  getTipoActividades() {
      this.tipoActividadesService.getTipoActividades().subscribe((tipoActividades) => {
          this.tipoActividades = tipoActividades;
      });
  }

  modalTipoActividad(
      tipoActividad: any,
      tipoAccion: number,
      modalTitle: string,
      titleButton: string
  ) {
      this.modalTipoActividadVisible = true;
      if (tipoActividad == null) {
          this.dataTipoActividad = {
              nombre: null,
              descripcion: null,
              estado:null
              
          };
      } else {
          this.dataTipoActividad = tipoActividad;
      }
      this.tipoAccion = tipoAccion;
      this.modalTitle = modalTitle;
      this.titleButton = titleButton;
  }

  cerrarModal(value: boolean) {
      this.modalTipoActividadVisible = value;
  }
  
  datosGuardadosModal(value: boolean) {
      this.modalTipoActividadVisible = value;
      this.getTipoActividades();
  }
    // buscar por filtro
    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  } 
}
