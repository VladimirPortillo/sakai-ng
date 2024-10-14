import { Component } from '@angular/core';
import { Table } from 'primeng/table';

import { Menus } from '../../interfaces/menus';
import { MenusService } from '../../services/menus.service';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent {
  menus: Menus[] = [];
  currentRowNumber:number = 0;

  modalMenuVisible: boolean = false;
  dataMenu: Menus = {
      nombre: null,
      url:null,
      estado: null,
  };
  tipoAccion: number = 1; //1=agregar, 0 = ver, 2=editar, 3 = eliminar, 4 = habilitar
  modalTitle: String = 'Agregar Menu';
  titleButton: String = 'Agregar';

  constructor(
      private menusService: MenusService,
      private srvImprimir: ReportesService,
  ) {}

  ngOnInit(): void {
      this.getMenus();
  }
  
  getMenus() {
      this.menusService.getMenus().subscribe((menus) => {
          this.menus = menus;
      });
  }

  modalMenu(
      menu: any,
      tipoAccion: number,
      modalTitle: string,
      titleButton: string
  ) {
      this.modalMenuVisible = true;
      if (menu == null) {
          this.dataMenu = {
              nombre: null,
              url:null,
              estado: null,
              
          };
      } else {
          this.dataMenu = menu;
      }
      this.tipoAccion = tipoAccion;
      this.modalTitle = modalTitle;
      this.titleButton = titleButton;
  }

  cerrarModal(value: boolean) {
      this.modalMenuVisible = value;
  }
  
  datosGuardadosModal(value: boolean) {
      this.modalMenuVisible = value;
      this.getMenus();
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
