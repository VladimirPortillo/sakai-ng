import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../services/layout.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) {}
     //ver Usuario
    visible:boolean=false;
    position: string='';
    //  ver_menu!:Menus;
     verUsuarioLogueado(position: string){
       // console.log(id_rol)
    //    console.log('ver rol0',this.ver_menu)
       this.visible=true;
       this.position=position;
    //    console.log("entra");
    //    this.menusService.verMenu(id_menu).subscribe(menus=>{
        //  this.ver_menu=menus.data[0];
    //   })
     }
   
     cerrarVerUsuarioLogueado() {
       this.visible=false;
    //    this.ver_menu != undefined
     } 
}
