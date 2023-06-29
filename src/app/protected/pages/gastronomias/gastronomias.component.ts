import { Component } from '@angular/core';
import { Gastronomia } from '../../interfaces/gastronomias';
import { GastronomiasService } from '../../services/gastronomias.service';

@Component({
  selector: 'app-gastronomias',
  templateUrl: './gastronomias.component.html',
  styleUrls: ['./gastronomias.component.scss']
})
export class GastronomiasComponent {
  gastronomias:Gastronomia[]=[];
 
  constructor(private gastronomiasService:GastronomiasService ){
  }
  ngOnInit():void{
    this.gastronomiasService.getGastronomias().subscribe(gastronomias=>{
      this.gastronomias=gastronomias;
    } )
  }
  //agregar gastronomia
  visible_agregar: boolean = false;
  verAgregarGastronomia() {
      this.visible_agregar = true;
  }
  gastronomia: Gastronomia = {
      nombre: '',
      descripcion:'',
      tipo:'',
      estado: 1,
  };
  guardar() {
      console.log(this.gastronomia);
      if (this.gastronomia.nombre.trim().length === 0) {
          return;
      }
      this.gastronomiasService.agregarGastronomia(this.gastronomia).subscribe((resp) => {
          console.log('Respuesat', resp);
      });
      this.visible_agregar = false;
      this.gastronomiasService.getGastronomias().subscribe(gastronomias => {
          this.gastronomias = gastronomias;
      });
  }
  cerraragregarGastronomia() {
      this.visible_agregar = false;
  }
    //ver gastronomia
    visible:boolean=false;
    ver_gastronomia!:Gastronomia;
    verGastronomia(id_gastronomia:number){
      // console.log(id_rol)
      console.log('ver rol0',this.ver_gastronomia)
      this.visible=true;
      console.log("entra");
      this.gastronomiasService.verGastronomia(id_gastronomia).subscribe(gastronomias=>{
        this.ver_gastronomia=gastronomias.data[0];
     })
    }
  
    cerrarVerGastronomia() {
      this.visible=false;
      this.ver_gastronomia != undefined
    } 
         //Eliminar gastronomia
  visible_eliminar: boolean=false;
  verEliminarGastronomia(id_gastronomia:number){
    this.visible_eliminar=true;
    this.gastronomiasService.verGastronomia(id_gastronomia).subscribe(gastronomias=>{
      this.ver_gastronomia=gastronomias.data[0];
    })
  }
  eliminarGastronomia(id_gastronomia:any){
    
    this.gastronomiasService.eliminarGastronomia(id_gastronomia).subscribe(gastronomias=>{})
    this.visible_eliminar=false;
    this.gastronomiasService.getGastronomias().subscribe(gastronomias=>{
    this.gastronomias=gastronomias;
    })
  }
  cerrarElimiarGastronomia() {
    this.visible_eliminar=false;
    
  }
   //Habilitar gastronomia
   visible_habilitar: boolean=false;
   verHabilitarGastronomia(id_gastronomia:number){
     this.visible_habilitar=true;
     this.gastronomiasService.verGastronomia(id_gastronomia).subscribe(gastronomias=>{
       this.ver_gastronomia=gastronomias.data[0];
     })
   }
   habilitarGastronomia(id_gastronomia:any){
     this.gastronomiasService.habilitarGastronomia(id_gastronomia).subscribe()
     this.visible_habilitar=false;
     this.gastronomiasService.getGastronomias().subscribe(gastronomias=>{
     this.gastronomias=gastronomias;
     })
   }
   cerrarHabilitarGastronomia() {
     this.visible_habilitar=false;
     
   }
}
