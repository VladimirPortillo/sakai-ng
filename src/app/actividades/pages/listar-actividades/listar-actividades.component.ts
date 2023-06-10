import { Component } from '@angular/core';
import { Actividades } from '../../interfaces/actividad';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-listar-actividades',
  templateUrl: './listar-actividades.component.html',
  styleUrls: ['./listar-actividades.component.scss']
})
export class ListarActividadesComponent {
  actividades:Actividades[]=[]; 
  constructor(private actividadesService:ActividadesService){
  }
  ngOnInit():void{
    this.actividadesService.getActividades().subscribe(actividades=>{
      this.actividades=actividades;
    } )
  }
}
