import { Component } from '@angular/core';
import { Comunidades } from '../../interfaces/comunidades';
import { ComunidadesService } from '../../services/comunidades.service';

@Component({
  selector: 'app-comunidades',
  templateUrl: './comunidades.component.html',
  styleUrls: ['./comunidades.component.scss']
})
export class ComunidadesComponent {
  comunidades:Comunidades[]=[]; 
  constructor(private comunidadesService:ComunidadesService){
  }
  ngOnInit():void{
    this.comunidadesService.getComunidades().subscribe(comunidades=>{
      this.comunidades=comunidades;
    } )
  }
   //agregar rol
   visible_agregar: boolean=false;
   verAgregarComunidad(){
     this.visible_agregar=true;
   }
   comunidad:Comunidades={
     nombre:'',
     descripcion:'',
     superficie:0,
     poblacion:0,
     longitud:0,
     latitud:0,
     estado:1,
     id_usuario:1,
   }
   guardar(){
     console.log(this.comunidad)
     if(this.comunidad.nombre.trim().length===0){
       return;
     }
     this.comunidadesService.agregarComunidad(this.comunidad).subscribe(resp=>{})
     this.visible_agregar=false;
     this.comunidadesService.getComunidades().subscribe(comunidades=>{
      this.comunidades=comunidades;
     })
   }
   cerraragregarComunidad() {
     this.visible_agregar=false;
   }
      //ver usuario
      visible:boolean=false;
      ver_comunidad!:Comunidades;
      verComunidad(id_comunidad:number){
        // console.log(id_rol)
        console.log('ver rol0',this.ver_comunidad)
        this.visible=true;
        console.log("entra");
        this.comunidadesService.verComunidad(id_comunidad).subscribe(comunidades=>{
          this.ver_comunidad=comunidades.data[0];
       })
      }
    
      cerrarVerComunidad() {
        this.visible=false;
        this.ver_comunidad!= undefined
      }
        //Eliminar usuario
  visible_eliminar: boolean=false;
  verEliminarComunidad(id_comunidad:number){
    this.visible_eliminar=true;
    this.comunidadesService.verComunidad(id_comunidad).subscribe(comunidades=>{
      this.ver_comunidad=comunidades.data[0];
    })
  }
  eliminarComunidad(id_comunidad:any){
    console.log(id_comunidad)
    this.comunidadesService.eliminarComunidad(id_comunidad).subscribe(comunidades=>{})
    this.visible_eliminar=false;
    this.comunidadesService.getComunidades().subscribe(comunidades=>{
    this.comunidades=comunidades;
    })
  }
  cerrarElimiarComunidad() {
    this.visible_eliminar=false;
    
  } 
    //Habilitar usuario
    visible_habilitar: boolean=false;
    verHabilitarComunidad(id_comunidad:number){
      this.visible_habilitar=true;
      this.comunidadesService.verComunidad(id_comunidad).subscribe(comunidades=>{
        this.ver_comunidad=comunidades.data[0];
      })
    }
    habilitarComunidad(id_comunidad:any){
      this.comunidadesService.habilitarComunidad(id_comunidad).subscribe()
      this.visible_habilitar=false;
      this.comunidadesService.getComunidades().subscribe(comunidades=>{
      this.comunidades=comunidades;
      })
    }
    cerrarHabilitarComunidad() {
      this.visible_habilitar=false;
      
    }
}
