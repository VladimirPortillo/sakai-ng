import { Component } from '@angular/core';
import { Restaurantes } from '../../interfaces/restaurantes';
import { RestaurantesService } from '../../services/restaurantes.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss']
})
export class RestaurantesComponent {
  restaurantes:Restaurantes[]=[]; 
  constructor(private restaurantesService:RestaurantesService){
  }
  ngOnInit():void{
    this.restaurantesService.getRestaurantes().subscribe(restaurantes=>{
      this.restaurantes=restaurantes;
    } )
  }
    //agregar rol
    visible_agregar: boolean=false;
    verAgregarRestaurante(){
      this.visible_agregar=true;
    }
    restaurante:Restaurantes={
      nombre:'',
      descripcion:'',
      direccion:'',
      categoria:'',
      telefono:0,
      foto:'',
      longitud:0,
      latitud:0,
      estado:1,
      id_comunidad:1,
    }
    guardar(){
      console.log(this.restaurante)
      if(this.restaurante.nombre.trim().length===0){
        return;
      }
      this.restaurantesService.agregarRestaurante(this.restaurante).subscribe(resp=>{})
      this.visible_agregar=false;
      this.restaurantesService.getRestaurantes().subscribe(restaurantes=>{
       this.restaurantes=restaurantes;
      })
    }
    cerraragregarRestaurante() {
      this.visible_agregar=false;
    }
       //ver restautante
       visible:boolean=false;
       ver_restaurante!:Restaurantes;
       verRestaurante(id_restaurante:number){
         // console.log(id_rol)
         console.log('ver rol0',this.ver_restaurante)
         this.visible=true;
         console.log("entra");
         this.restaurantesService.verRestaurante(id_restaurante).subscribe(restaurantes=>{
           this.ver_restaurante=restaurantes.data[0];
        })
       }
     
       cerrarVerRestaurante() {
         this.visible=false;
         this.ver_restaurante!= undefined
       }
             //Eliminar hotel
             visible_eliminar: boolean=false;
             verEliminarRestaurante(id_restaurante:number){
               this.visible_eliminar=true;
               this.restaurantesService.verRestaurante(id_restaurante).subscribe(restaurantes=>{
                 this.ver_restaurante=restaurantes.data[0];
               })
             }
             eliminarRestaurante(id_restaurante:any){
               this.restaurantesService.eliminarRestaurante(id_restaurante).subscribe(restaurantes=>{})
               this.visible_eliminar=false;
               this.restaurantesService.getRestaurantes().subscribe(restaurantes=>{
               this.restaurantes=restaurantes;
               })
             }
             cerrarElimiarRestaurante() {
               this.visible_eliminar=false;
               
             } 
               //Habilitar hotel
      visible_habilitar: boolean=false;
      verHabilitarRestaurante(id_restaurante:number){
        this.visible_habilitar=true;
        this.restaurantesService.verRestaurante(id_restaurante).subscribe(restaurantes=>{
          this.ver_restaurante=restaurantes.data[0];
        })
      }
      habilitarRestaurante(id_restaurante:any){
        this.restaurantesService.habilitarRestaurante(id_restaurante).subscribe()
        this.visible_habilitar=false;
        this.restaurantesService.getRestaurantes().subscribe(restaurantes=>{
        this.restaurantes=restaurantes;
        })
      }
      cerrarHabilitarRestaurante() {
        this.visible_habilitar=false;
        
      }
}
