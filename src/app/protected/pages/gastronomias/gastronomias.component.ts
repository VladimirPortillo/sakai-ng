import { Component } from '@angular/core';
import { Table } from 'primeng/table';

import { Gastronomia } from '../../interfaces/gastronomias';
import { GastronomiasService } from '../../services/gastronomias.service';
import { ReportesService } from '../../services/reportes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gastronomias',
  templateUrl: './gastronomias.component.html',
  styleUrls: ['./gastronomias.component.scss']
})
export class GastronomiasComponent {
  gastronomias: Gastronomia[] = [];
  currentRowNumber:number = 0;

  modalGastronomiaVisible: boolean = false;
  dataGastronomia: Gastronomia = {
      nombre: null,
      descripcion: null,
      tipo: null,
      estado: null,
      ids_comunidad: [],
      multimedias: [],
      comunidades: [],
      delete_ids_comunidad: []
  };
  tipoAccion: number = 1; //1=agregar, 0 = ver, 2=editar, 3 = eliminar, 4 = habilitar
  modalTitle: String = 'Agregar Gastronomia';
  titleButton: String = 'Agregar';

  constructor(
      private gastronomiasService: GastronomiasService,
      private srvImprimir: ReportesService,
      private router:Router
  ) {}

  ngOnInit(): void {
      this.getGastronomias();
  }
  
  getGastronomias() {
      this.gastronomiasService.getGastronomias().subscribe((gastronomias) => {
          this.gastronomias = gastronomias;
      });
  }
  agregarGastronomia() {
    console.log("entra agregar");        
    this.router.navigate(['/index/gastronomias/agregar']);
}
editarGastronomia(id_gastronomia:number) {
    console.log("entra editar"); 
    console.log("entra editar", id_gastronomia);       
    this.router.navigate(['/index/gastronomias/editar',id_gastronomia]);
}
verGastronomia(id_gastronomia:number) {
    console.log("entra ver"); 
    console.log("entra ver", id_gastronomia);       
    this.router.navigate(['/index/gastronomias/ver',id_gastronomia]);
}
  modalGastronomia(
      gastronomia: any,
      tipoAccion: number,
      modalTitle: string,
      titleButton: string
  ) {
      this.modalGastronomiaVisible = true;
      if (gastronomia == null) {
          this.dataGastronomia = {
              nombre: null,
              descripcion: null,
              tipo: null,
              estado:null,
              ids_comunidad: [],
              multimedias:[],
              comunidades: [],
              delete_ids_comunidad: []
          };
      } else {
          this.dataGastronomia = gastronomia;
      }
      this.tipoAccion = tipoAccion;
      this.modalTitle = modalTitle;
      this.titleButton = titleButton;
  }

  cerrarModal(value: boolean) {
      this.modalGastronomiaVisible = value;
  }
  
  datosGuardadosModal(value: boolean) {
      this.modalGastronomiaVisible = value;
      this.getGastronomias();
  }
    // buscar por filtro
    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  onImprimir(){
    // const encabezado=["Nombre"];
    // this.rolesService.getRoles().subscribe((roles) => {
    //     this.roles = roles;
    //     //const cuerpo = roles.map(rol => Object.values(rol));
    //     const cuerpo=roles.map(rol => Object.values([rol.nombre]));
    //     console.log(cuerpo);
    //     this.srvImprimir.imprimir(encabezado,cuerpo,"Lista Roles",true);
    // });
}
}
