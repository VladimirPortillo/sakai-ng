import { Component } from '@angular/core';
import { ComunidadesService } from '../../services/comunidades.service';
import { tipoActividadesService } from '../../services/tipoActividades.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActividadesService } from '../../services/actividades.service';
import { Actividades } from '../../interfaces/actividades';
import { TipoActividades } from '../../interfaces/tipoActividades';
import { Comunidades } from '../../interfaces/comunidades';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataMaps } from '../../interfaces/maps';
import { environment } from 'src/environments/environment';

const url = environment.urlApi;
const rutaPublic = environment.rutaPublic;

@Component({
  selector: 'app-ver-actividad',
  templateUrl: './ver-actividad.component.html',
  styleUrls: ['./ver-actividad.component.scss']
})
export class VerActividadComponent {
  
  comunidades: Comunidades[] = [];
  comunidad!: Comunidades;
  tipoActividades: TipoActividades[] = [];
  tipoActividad!: TipoActividades;
  datosCoordenada: string = '';
  coordenadas!: DataMaps;
  urlPublic = url + rutaPublic;
  loading:boolean = true;


 actividad!: Actividades;
id_actividad=0;

miFormulario: FormGroup = this.fb.group({
    nombre:       [''],
    descripcion:  [''],
    direccion:    [''],
    fecha_inicio: [''],
    fecha_fin:    [''],
    comunidad:    [''],
    tipoActividad:[''],
    ubicacion:    [''],
});

constructor(
  private comunidadesService: ComunidadesService,
  private tipoActividadesService: tipoActividadesService,
  private fb: FormBuilder,
  private actividadesService: ActividadesService,
  private router:Router,
  private route:ActivatedRoute
) {}

ngOnInit() {
  this.getComunidades();
  // this.getTipoActividades();
}

getComunidades() {
  this.comunidadesService.getComunidades().subscribe((comunidades) => {
      // console.log(roles);
      this.comunidades = comunidades;
      this.getTipoActividades();
  });
  
  
}
getTipoActividades(){
  this.tipoActividadesService.getTipoActividades().subscribe((tipoActividades) => {
    // console.log(roles);
    this.tipoActividades = tipoActividades;
    this.getActividades();
});
}
getActividades(){
  this.route.paramMap.subscribe(params => {
    this.id_actividad = +params.get('id_actividad')!; // Convertir a número
    //console.log('ID Comunidad:', this.id_comunidad);
    this.actividadesService.verActividad(this.id_actividad).subscribe((resp) => {
      console.log('actividad:', resp);
      this.actividad = resp.data;
      this.cargarDatos();
    }); 
  });
}
coordenadasMapa(coordenadas: DataMaps) {
  console.log('retorno datos mapa', coordenadas);
  this.miFormulario.patchValue({ubicacion : JSON.stringify(coordenadas)});
  this.datosCoordenada = 'Longitud: ' + coordenadas.longitud + ', Latitud: ' + coordenadas.latitud;
}
cargarDatos() {
     this.miFormulario.disable();
     this.coordenadas = {
      longitud: this.actividad.longitud,
      latitud: this.actividad.latitud
    }
    
        this.miFormulario.controls['nombre'].setValue(this.actividad.nombre);
        this.miFormulario.controls['descripcion'].setValue(this.actividad.descripcion);
        this.miFormulario.controls['direccion'].setValue(this.actividad.direccion);
        this.miFormulario.controls['fecha_inicio'].setValue(new Date(this.actividad.fecha_inicio + ''));
        this.miFormulario.controls['fecha_fin'].setValue(new Date(this.actividad.fecha_fin + ''));
        this.miFormulario.controls['comunidad'].setValue(this.buscarComunidad());
        this.miFormulario.controls['tipoActividad'].setValue(this.buscarTipoActividad());
        this.miFormulario.controls['ubicacion'].setValue(JSON.stringify(this.coordenadas));
    this.datosCoordenada = 'Longitud: ' + this.actividad.longitud + ', Latitud: ' + this.actividad.latitud;
    this.loading = false;
}
buscarComunidad() {
  return this.comunidades.find((comunidad) => comunidad.id_comunidad == this.actividad.id_comunidad);
}
buscarTipoActividad() {
  return this.tipoActividades.find((tipoActividad) => tipoActividad.id_tipo == this.actividad.id_tipo);
}
volver() {
  this.router.navigate(['/index/actividades']);
}
}
