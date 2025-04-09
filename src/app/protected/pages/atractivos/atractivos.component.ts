import { Component } from '@angular/core';
import { Table } from 'primeng/table';

import { Atractivos_turisticos } from '../../interfaces/atractivos';
import { AtractivosService } from '../../services/atractivos.service';
import { ComunidadesService } from '../../services/comunidades.service';
import { ReportesService } from '../../services/reportes.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-atractivos',
  templateUrl: './atractivos.component.html',
  styleUrls: ['./atractivos.component.scss']
})
export class AtractivosComponent {
  atractivos: Atractivos_turisticos[] = [];
  currentRowNumber:number = 0;
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
      multimedias: []
  };
  tipoAccion: number = 1; //1=agregar, 0 = ver, 2=editar, 3 = eliminar, 4 = habilitar
  modalTitle: String = 'Agregar Restaurante';
  titleButton: String = 'Agregar';

  constructor(
      private atractivosService: AtractivosService,
      private comunidadesService: ComunidadesService,
      private srvImprimir: ReportesService,
      private router: Router
  ) {}

  ngOnInit(): void {
      this.getAtractivos();
  }
  
  getAtractivos() {
      
            this.atractivosService.getAtractivos().subscribe((atractivos) => {
                this.atractivos = atractivos;
            });
        
  }
  agregarAtractivo() {
    // console.log("entra agregar");        
    this.router.navigate(['/index/atractivos/agregar']);
}
editarAtractivo(id_atractivo:number) {
    console.log("entra editar", id_atractivo);       
    this.router.navigate(['/index/atractivos/editar',id_atractivo]);
}
verAtractivo(id_atractivo:number) {
    console.log("entra ver", id_atractivo);       
    this.router.navigate(['/index/atractivos/ver',id_atractivo]);
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
              multimedias: []
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
      //para hacer reportes
      onImprimir(){
        let numdatos=0;
        const encabezado=["N°","Nombre","descripción"];
        this.atractivosService.getAtractivos().subscribe((atractivos) => {
            this.atractivos = atractivos;
            const cuerpo= Object(this.atractivos).map(
                (obj:any)=>{        
                    const datos=[
                        numdatos+=1,    
                        obj.nombre,
                        obj.descripcion
                    ]
                    return datos;
                }
            )
            console.log(cuerpo);
            this.srvImprimir.imprimir(encabezado,cuerpo,"Lista Atractivos",true);
        });

    }
  
}
