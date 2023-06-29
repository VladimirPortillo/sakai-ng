import { Component } from '@angular/core';
import { Atractivos_turisticos } from '../../interfaces/atractivos';
import { AtractivosService } from '../../services/atractivos.service';

@Component({
  selector: 'app-atractivos',
  templateUrl: './atractivos.component.html',
  styleUrls: ['./atractivos.component.scss']
})
export class AtractivosComponent {
  atractivos:Atractivos_turisticos[]=[]; 
  constructor(private atractivosService:AtractivosService){
  }
  ngOnInit():void{
    this.atractivosService.getAtractivos().subscribe(atractivos=>{
      this.atractivos=atractivos;
    } )
  }
     //agregar rol
     visible_agregar: boolean=false;
     verAgregarAtractivo(){
       this.visible_agregar=true;
     }
     atractivo:Atractivos_turisticos={
       nombre:'',
       descripcion:'',
       direccion:'',
       longitud:0,
       latitud:0,
       estado:1,
       id_comunidad:1,
     }
     guardar(){
       console.log(this.atractivo)
       if(this.atractivo.nombre.trim().length===0){
         return;
       }
       this.atractivosService.agregarAtractivo(this.atractivo).subscribe(resp=>{})
       this.visible_agregar=false;
       this.atractivosService.getAtractivos().subscribe(atractivos=>{
        this.atractivos=atractivos;
       })
     }
     cerraragregarAtractivo() {
       this.visible_agregar=false;
     }
          //ver usuario
          visible:boolean=false;
          ver_atractivo!:Atractivos_turisticos;
          verAtractivo(id_atractivo:number){
            // console.log(id_rol)
            console.log('ver rol0',this.ver_atractivo)
            this.visible=true;
            console.log("entra");
            this.atractivosService.verAtractivo(id_atractivo).subscribe(atractivos=>{
              this.ver_atractivo=atractivos.data[0];
           })
          }
        
          cerrarVerAtractivo() {
            this.visible=false;
            this.ver_atractivo!= undefined
          }
                 //Eliminar usuario
  visible_eliminar: boolean=false;
  verEliminarAtractivo(id_atractivo:number){
    this.visible_eliminar=true;
    this.atractivosService.verAtractivo(id_atractivo).subscribe(atractivos=>{
      this.ver_atractivo=atractivos.data[0];
    })
  }
  eliminarAtractivo(id_atractivo:any){
    console.log(id_atractivo)
    this.atractivosService.eliminarAtractivo(id_atractivo).subscribe(atractivos=>{})
    this.visible_eliminar=false;
    this.atractivosService.getAtractivos().subscribe(atractivos=>{
    this.atractivos=atractivos;
    })
  }
  cerrarElimiarAtractivo() {
    this.visible_eliminar=false;
    
  } 
      //Habilitar usuario
      visible_habilitar: boolean=false;
      verHabilitarAtractivo(id_atractivo:number){
        this.visible_habilitar=true;
        this.atractivosService.verAtractivo(id_atractivo).subscribe(atractivos=>{
          this.ver_atractivo=atractivos.data[0];
        })
      }
      habilitarAtractivo(id_atractivo:any){
        this.atractivosService.habilitarAtractivo(id_atractivo).subscribe()
        this.visible_habilitar=false;
        this.atractivosService.getAtractivos().subscribe(atractivos=>{
        this.atractivos=atractivos;
        })
      }
      cerrarHabilitarAtractivo() {
        this.visible_habilitar=false;
      }
}
