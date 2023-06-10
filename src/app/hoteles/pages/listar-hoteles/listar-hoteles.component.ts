import { Component } from '@angular/core';
import { Hoteles } from '../../interfaces/hotel';
import { HotelesService } from '../../services/hoteles.service';

@Component({
  selector: 'app-listar-hoteles',
  templateUrl: './listar-hoteles.component.html',
  styleUrls: ['./listar-hoteles.component.scss']
})
export class ListarHotelesComponent {
  hoteles:Hoteles[]=[]; 
  constructor(private hotelesService:HotelesService){
  }
  ngOnInit():void{
    this.hotelesService.getHoteles().subscribe(hoteles=>{
      this.hoteles=hoteles;
    } )
  }
  //agregar rol
  visible_agregar: boolean=false;
  verAgregarHotel(){
    this.visible_agregar=true;
  }
  hotel:Hoteles={
    nombre:'',
    descripcion:'',
    direccion:'',
    categoria:'',
    num_habitaciones:0,
    telefono:0,
    foto:'',
    longitud:0,
    latitud:0,
    estado:1,
    id_comunidad:1,
  }
  guardar(){
    console.log(this.hotel)
    if(this.hotel.nombre.trim().length===0){
      return;
    }
    this.hotelesService.agregarHotel(this.hotel).subscribe(resp=>{})
    this.visible_agregar=false;
    this.hotelesService.getHoteles().subscribe(hoteles=>{
     this.hoteles=hoteles;
    })
  }
  cerraragregarHotel() {
    this.visible_agregar=false;
  }
      //ver usuario
      visible:boolean=false;
      ver_hotel!:Hoteles;
      verHotel(id_hotel:number){
        // console.log(id_rol)
        console.log('ver rol0',this.ver_hotel)
        this.visible=true;
        console.log("entra");
        this.hotelesService.verHotel(id_hotel).subscribe(hoteles=>{
          this.ver_hotel=hoteles.data[0];
       })
      }
    
      cerrarVerHotel() {
        this.visible=false;
        this.ver_hotel!= undefined
      }
          //Eliminar hotel
          visible_eliminar: boolean=false;
          verEliminarHotel(id_hotel:number){
            this.visible_eliminar=true;
            this.hotelesService.verHotel(id_hotel).subscribe(hoteles=>{
              this.ver_hotel=hoteles.data[0];
            })
          }
          eliminarHotel(id_hotel:any){
            this.hotelesService.eliminarHotel(id_hotel).subscribe(hoteles=>{})
            this.visible_eliminar=false;
            this.hotelesService.getHoteles().subscribe(hoteles=>{
            this.hoteles=hoteles;
            })
          }
          cerrarElimiarHotel() {
            this.visible_eliminar=false;
            
          } 
      //Habilitar hotel
      visible_habilitar: boolean=false;
      verHabilitarHotel(id_hotel:number){
        this.visible_habilitar=true;
        this.hotelesService.verHotel(id_hotel).subscribe(hoteles=>{
          this.ver_hotel=hoteles.data[0];
        })
      }
      habilitarHotel(id_hotel:any){
        this.hotelesService.habilitarHotel(id_hotel).subscribe()
        this.visible_habilitar=false;
        this.hotelesService.getHoteles().subscribe(hoteles=>{
        this.hoteles=hoteles;
        })
      }
      cerrarHabilitarHotel() {
        this.visible_habilitar=false;
        
      }
}
