import { Component } from '@angular/core';
import { Menus } from '../../interfaces/menus';
import { MenusService } from '../../services/menus.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent {
  menus:Menus[]=[]; 
  constructor(private menusService:MenusService){
  }
 
    //agregar rol
    visible_agregar: boolean=false;
    verAgregarMenu(){
      this.visible_agregar=true;
    }
    menu:Menus={
      nombre:'',
      url:'',
      estado:1,
    }
    guardar(){
      console.log(this.menu)
      if(this.menu.nombre.trim().length===0){
        return;
      }
      this.menusService.agregarMenu(this.menu).subscribe(resp=>{})
      this.visible_agregar=false;
      this.menusService.getMenus().subscribe(menus=>{
        this.menus=menus;
      })
    }
    cerraragregarMenu() {
      this.visible_agregar=false;
    }

    ngOnInit():void{
      this.menusService.getMenus().subscribe(menus=>{
        this.menus=menus;
      } )
    } 
    //ver menu
    visible:boolean=false;
    ver_menu!:Menus;
    verMenu(id_menu:number){
      // console.log(id_rol)
      console.log('ver rol0',this.ver_menu)
      this.visible=true;
      console.log("entra");
      this.menusService.verMenu(id_menu).subscribe(menus=>{
        this.ver_menu=menus.data[0];
     })
    }
  
    cerrarVerMenu() {
      this.visible=false;
      this.ver_menu != undefined
    } 
     //Eliminar menu
  visible_eliminar: boolean=false;
  verEliminarMenu(id_menu:number){
    this.visible_eliminar=true;
    this.menusService.verMenu(id_menu).subscribe(menus=>{
      this.ver_menu=menus.data[0];
    })
  }
  eliminarMenu(id_menu:any){
    console.log(id_menu)
    this.menusService.eliminarMenu(id_menu).subscribe(menus=>{})
    this.visible_eliminar=false;
    this.menusService.getMenus().subscribe(menus=>{
    this.menus=menus;
    })
  }
  cerrarElimiarMenu() {
    this.visible_eliminar=false;
    
  }
  //Habilitar rol
  visible_habilitar: boolean=false;
  verHabilitarMenu(id_menu:number){
    this.visible_habilitar=true;
    this.menusService.verMenu(id_menu).subscribe(menus=>{
      this.ver_menu=menus.data[0];
    })
  }
  habilitarMenu(id_menu:any){
    this.menusService.habilitarMenu(id_menu).subscribe()
    this.visible_habilitar=false;
    this.menusService.getMenus().subscribe(menus=>{
    this.menus=menus;
    })
  }
  cerrarHabilitarMenu() {
    this.visible_habilitar=false;
    
  }
   //Editar menu
   visible_editar: boolean=false;
   verEditarMenu(id_menu:number){
     this.visible_editar=true;
     this.menusService.verMenu(id_menu).subscribe(menus=>{
       this.ver_menu=menus.data[0];
     })
   }
   editarMenu(id_menu:any){
     if(this.menu.nombre.trim().length===0){
       return;
     }
     this.menusService.editarMenu(id_menu,this.menu).subscribe(resp=>{})
     this.visible_editar=false;
     this.menusService.getMenus().subscribe(menus=>{
     this.menus=menus;
     })
   }
   cerrarEditarMenu() {
     this.visible_editar=false;
     
   }
}
