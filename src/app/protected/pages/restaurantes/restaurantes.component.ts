import { Component } from '@angular/core';
import { Table } from 'primeng/table';

import { Restaurantes } from '../../interfaces/restaurantes';
import { RestaurantesService } from '../../services/restaurantes.service';
import { ComunidadesService } from '../../services/comunidades.service';
import { ReportesService } from '../../services/reportes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss']
})
export class RestaurantesComponent {
  restaurantes: Restaurantes[] = [];
  currentRowNumber:number = 0;

  modalRestauranteVisible: boolean = false;
  dataRestaurante: Restaurantes = {
      nombre: null,
      descripcion: null,
      direccion: null,
      categoria: null,
      telefono: null,
      delivery: null,
      longitud: null,
      latitud: null,
      estado: null,
      id_comunidad: null,
      multimedias:[],
  };
  tipoAccion: number = 1; //1=agregar, 0 = ver, 2=editar, 3 = eliminar, 4 = habilitar
  modalTitle: String = 'Agregar Restaurante';
  titleButton: String = 'Agregar';

  constructor(
      private restaurantesService: RestaurantesService,
      private comunidadesService: ComunidadesService,
      private srvImprimir: ReportesService,
      private router:Router
  ) {}

  ngOnInit(): void {
      this.getRestaurantes();
  }
  agregarRestaurante() {
    console.log("entra agregar");        
    this.router.navigate(['/index/restaurantes/agregar']);
}
editarRestaurante(id_restaurante:number) {
    console.log("entra editar"); 
    console.log("entra editar", id_restaurante);       
    this.router.navigate(['/index/restaurantes/editar',id_restaurante]);
}
verRestaurante(id_restaurante:number) {
    console.log("entra ver"); 
    console.log("entra ver", id_restaurante);       
    this.router.navigate(['/index/restaurantes/ver',id_restaurante]);
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
              delivery: null,
              longitud: null,
              latitud: null,
              estado: null,
              id_comunidad: null,
              multimedias:[],
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
